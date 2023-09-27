'use client';
import { useState } from 'react';
import { IDataChainConnected } from '../types';
import useNotifier from 'src/hooks/useNotifier';
import { sleep } from 'src/utils';
import { useZkClientContext } from 'src/contexts/zkclient-context/zkclient-context';

// const Berkeley = Mina.Network('https://proxy.berkeley.minaexplorer.com/graphql');

export default function useConnectMinaChain(): IDataChainConnected {
    const { zkClient, isLoadingZkClient } = useZkClientContext();
    const [isConnecting, setIsConnecting] = useState<boolean>(false);
    const notifier = useNotifier();
    const [data, setData] = useState<Pick<IDataChainConnected, 'accountExists' | 'userAddress' | 'userPublickey' | 'name'>>({
        accountExists: false,
        userAddress: null,
        userPublickey: null,
        name: 'Mina',
    });

    async function connectWallet() {
        setIsConnecting(true);

        try {
            if (isLoadingZkClient) return;

            if (zkClient == null) return;

            const { Mina, PublicKey, fetchAccount } = zkClient;
            const Berkeley = Mina.Network('https://proxy.berkeley.minaexplorer.com/graphql');
            Mina.setActiveInstance(Berkeley);
            await sleep(1000);

            const mina = await window!.mina;
            if (mina === null || mina === undefined) {
                throw Error('You must install Auro Wallet to continue');
            }

            const accounts = await mina.requestAccounts();
            const _userWallet = accounts[0];
            const _userPublicKey = PublicKey.fromBase58(_userWallet);
            console.log('getWalletAccount using key', _userPublicKey.toBase58(), _userPublicKey);

            const res = await fetchAccount({
                publicKey: _userPublicKey,
            });

            const _accountExists = res.error == null;
            console.log('getWalletAccount accountExists=', _accountExists);

            setData((prev) => {
                return {
                    ...prev,
                    accountExists: _accountExists,
                    userAddress: _userWallet,
                    userPublickey: _userPublicKey,
                };
            });
        } catch (err) {
            notifier.notifyError((err as Error).message);
            console.error(err);
        }
        setIsConnecting(false);
    }

    return {
        ...data,
        isConnecting,
        connectWallet,
    };
}
