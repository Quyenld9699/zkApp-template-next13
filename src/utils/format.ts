import { FormatNumberOptions } from 'src/global.config';
import { isNumeric } from '.';
import { format as fd } from 'date-fns';

/**
 *
 * @param address The input address
 * @param first The number of characters will be taken from begin of the address. This value cannot be negative
 * @param last The number of characters will be taken from last of the address. This value cannot be negative
 * @returns
 */
export function formatAddress(address: string, first = 6, last = 4): string {
    if (first < 0 || last <= 0) {
        throw new Error('Invalid parameter(s)');
    }
    return address.slice(0, first) + '...' + address.slice(-last);
}

/**
 * Format a number
 * @param {*} number - The number needs to format
 * @param {FormatNumberOptions} options - Includes options to customize the results returned
 * @returns A string representing a number in formatted, `option.fallback` will be returned if `number` is invalid
 */
export function formatNumber(number: any, options?: FormatNumberOptions): string | FormatNumberOptions['fallback'] {
    const { fallback = '0.00', fractionDigits, delimiter, padZero, prefix, suffix, onlyPositive } = options ?? {};

    if (!isNumeric(number)) {
        return fallback;
    }

    let num: number | string = parseFloat(number);
    if (onlyPositive && num < 0) {
        num = 0;
    }
    if (isNumeric(fractionDigits)) {
        num = num.toFixed(fractionDigits);
    }
    if (!padZero) {
        num = Number(num); // remove last zeros
    }
    return (prefix ?? '') + numberWithCommas(num, delimiter) + (suffix ?? '');
}

/**
 * Compact large number
 * @param {*} n The number
 * @param {Number} fractionDigits Number of digits after the decimal point
 */
export function compactNumber(n: number | string, fractionDigits = 1) {
    if (!isNumeric(n)) {
        throw new Error('Must provide a correct number');
    }
    const suffixes = ['', 'K', 'M', 'B', 'T'];
    const suffixNum = Math.floor((('' + parseInt('' + n)).length - 1) / 3);

    let shortValue = (Number(n) / Math.pow(1000, suffixNum)).toPrecision(fractionDigits + 1);

    if (Number(shortValue) % 1 !== 0) {
        shortValue = Number(shortValue).toFixed(fractionDigits);
    }

    return Number(shortValue).toLocaleString() + suffixes[suffixNum];
}

export function numberWithCommas(x: number | string, delimiter = ','): string {
    if (!isNumeric(x)) {
        throw new Error('Must provide a correct number');
    }
    const [naturalPart, decimalPart] = x.toString().split('.');
    let out = naturalPart.replace(/\B(?=(\d{3})+(?!\d))/g, delimiter);
    if (decimalPart) {
        out += '.' + decimalPart;
    }
    return out;
}

/**
 * Decimal adjustment of a number.
 *
 * @param {String}  type  The type of adjustment.
 * @param {Number}  value The number.
 * @param {Integer} exp   The exponent (the 10 logarithm of the adjustment base).
 * @returns {Number} The adjusted value.
 */
export function decimalAdjust(type: 'ceil' | 'round' | 'floor', value: any, exp?: any): any {
    // If the exp is undefined or zero...
    if (typeof exp === 'undefined' || +exp === 0) {
        return Math[type](value);
    }
    value = +value;
    exp = +exp;
    // If the value is not a number or the exp is not an integer...
    if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
        return NaN;
    }
    // If the value is negative...
    if (value < 0) {
        return -decimalAdjust(type, -value, exp);
    }
    // Shift
    value = value.toString().split('e');
    value = Math[type](+(value[0] + 'e' + (value[1] ? +value[1] - exp : -exp)));
    // Shift back
    value = value.toString().split('e');
    return +(value[0] + 'e' + (value[1] ? +value[1] + exp : exp));
}

export const formatDate = {
    MMM_dd_h_mm_a: (date: Date) => {
        return fd(date, 'MMM dd, h:mm a');
    },
    MMM_dd_YYYY_h_mm_a: (date: Date) => {
        return fd(date, 'MMM dd yyyy, h:mm a');
    },
    MMMM_dd_YYY: (date: Date) => {
        return fd(date, 'MMMM dd, YYY');
    },
};
