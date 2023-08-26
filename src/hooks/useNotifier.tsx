import { OptionsObject, useSnackbar } from 'notistack';

type SnackbarOptions = OptionsObject | undefined;

export const ERR_TOP_CENTER: SnackbarOptions = {
    variant: 'error',
    anchorOrigin: { vertical: 'top', horizontal: 'center' },
};

export const WARNING_TOP_CENTER: SnackbarOptions = {
    variant: 'warning',
    anchorOrigin: { vertical: 'top', horizontal: 'center' },
};

export const INFO_TOP_CENTER: SnackbarOptions = {
    variant: 'info',
    anchorOrigin: { vertical: 'top', horizontal: 'center' },
};

export const SUCCESS_TOP_CENTER: SnackbarOptions = {
    variant: 'success',
    anchorOrigin: { vertical: 'top', horizontal: 'center' },
};

export const SUCCESS_BOTTOM_CENTER: SnackbarOptions = {
    variant: 'success',
    anchorOrigin: { vertical: 'bottom', horizontal: 'center' },
};

export const SUCCESS_BOTTOM_RIGHT: SnackbarOptions = {
    variant: 'success',
    anchorOrigin: { vertical: 'bottom', horizontal: 'right' },
};

export default function useNotifier() {
    const { enqueueSnackbar } = useSnackbar();

    const notifyError = (msg: string, options?: OptionsObject | undefined) => {
        enqueueSnackbar(msg, { ...ERR_TOP_CENTER, ...options });
    };

    const notifySuccess = (msg: string, options?: OptionsObject | undefined) => {
        enqueueSnackbar(msg, { ...SUCCESS_TOP_CENTER, ...options });
    };

    const notifyInfo = (msg: string, options?: OptionsObject | undefined) => {
        enqueueSnackbar(msg, { ...INFO_TOP_CENTER, ...options });
    };

    const notifyWarn = (msg: string, options?: OptionsObject | undefined) => {
        enqueueSnackbar(msg, { ...WARNING_TOP_CENTER, ...options });
    };

    return {
        notifyError,
        notifyInfo,
        notifySuccess,
        notifyWarn,
    };
}
