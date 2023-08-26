import BigNumberJS from 'bignumber.js';
import { ReactNode } from 'react';
import { MinaWindow } from './libs/MinaWindow';

declare global {
    interface Window extends MinaWindow {}
    namespace NodeJS {
        interface ProcessEnv {}
    }
}

export type AnchorElType = null | Element | ((_element: Element) => Element);

export interface FormatNumberOptions {
    /**
     * Number of digits after the decimal point. Must be in the range 0 - 20, inclusive.
     */
    fractionDigits?: number;
    /**
     * A fallback react tree to show when a number is invalid.
     * @default `---`
     */
    fallback?: ReactNode;
    /**
     * The string used to separate number.
     */
    delimiter?: string;
    /**
     * Allow zero after decimal point.
     * @default false
     */
    padZero?: boolean;
    /**
     * A string that will be appended to the beginning of the returned result.
     */
    prefix?: string;
    /**
     * A string that will be appended to the ending of the returned result.
     */
    suffix?: string;
    /**
     * return 0 if number < 0
     */
    onlyPositive?: boolean;
}

export interface ReducerAction<T, P> {
    type: T;
    payload: P;
}

export type BigNumberish = BigNumberJS.Value;

export interface BaseContextProps {
    children: ReactNode;
}
