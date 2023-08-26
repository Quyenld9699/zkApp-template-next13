'use client';

import { Clear } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { SnackbarProvider, SnackbarKey } from 'notistack';
import React from 'react';
import { ThemeCustomProvider } from './theme-context';
import { ModalProvider } from './modal-context/modal-context';
import { WalletProvider } from './wallet-context/wallet-context';
import ZkClientProvider from './zkclient-context/zkclient-context';

const notistackRef = React.createRef<SnackbarProvider>();
const onClickDismiss = (key: SnackbarKey) => () => {
    notistackRef?.current?.closeSnackbar(key);
};

export default function AppProviders({ children }: { children: React.ReactNode }) {
    return (
        <ThemeCustomProvider>
            <SnackbarProvider
                maxSnack={3}
                ref={notistackRef}
                preventDuplicate
                action={(key) => (
                    <IconButton size="small" color="inherit" onClick={onClickDismiss(key)}>
                        <Clear style={{ cursor: 'pointer' }} />
                    </IconButton>
                )}
            >
                <ZkClientProvider>
                    <WalletProvider>
                        <ModalProvider>{children}</ModalProvider>
                    </WalletProvider>
                </ZkClientProvider>
            </SnackbarProvider>
        </ThemeCustomProvider>
    );
}
