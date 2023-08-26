'use client';
import { createContext, ReactNode, useContext, useState } from 'react';
import { BaseContextProps } from 'src/global.config';
import useNotifier from 'src/hooks/useNotifier';
import { Breakpoint } from '@mui/material';

type TOptions = {
    maxWidth: Breakpoint;
};
interface ModalContextInterface {
    open: boolean;
    title: ReactNode;
    content: ReactNode;
    closeModal: () => void;
    openModal: (title: ReactNode, content: ReactNode, op?: TOptions) => void;
    options: TOptions;
}

const ModalContext = createContext({} as ModalContextInterface);

export function ModalProvider({ children }: BaseContextProps) {
    const { address } = { address: '' };
    const [open, setOpen] = useState<boolean>(false);
    const [title, setTitle] = useState<ReactNode>('');
    const [content, setContent] = useState<ReactNode>(<></>);
    const { notifyError } = useNotifier();
    const [options, setOptions] = useState<TOptions>({ maxWidth: 'xsm' });

    const closeModal = () => {
        setOptions((prev) => {
            return { ...prev, maxWidth: 'xsm' };
        });
        setOpen(false);
    };
    const openModal = (title: ReactNode, content: ReactNode, op?: TOptions) => {
        if (!address) {
            notifyError('You have not connected your wallet yet!');
        } else {
            setTitle(title);
            setContent(content);
            setOptions((prev) => {
                return { ...prev, ...op };
            });

            setOpen(true);
        }
    };

    return <ModalContext.Provider value={{ open, title, content, closeModal, openModal, options }}>{children}</ModalContext.Provider>;
}

export const useModalContext = () => useContext(ModalContext);
