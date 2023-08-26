'use client';
import { createContext, useContext, useEffect } from 'react';
import { BaseContextProps } from 'src/global.config';
import useConnectMinaChain from './useConnectMinaChain/useConnectMinaChain';
import { IDataChainConnected } from './types';
import { useZkClientContext } from '../zkclient-context/zkclient-context';

interface IDataContextReturn {
    minaChain: IDataChainConnected;
}

const TheContext = createContext({} as IDataContextReturn);

export function WalletProvider({ children }: BaseContextProps) {
    const { isLoadingZkClient } = useZkClientContext();
    const minaChain = useConnectMinaChain();

    useEffect(() => {
        if (!isLoadingZkClient) {
            minaChain.connectWallet();
        }
    }, [isLoadingZkClient]);

    return <TheContext.Provider value={{ minaChain }}>{children}</TheContext.Provider>;
}

export const useWalletContext = () => useContext(TheContext);
