import { createContext, useContext, useState, useEffect } from 'react';
import { BaseContextProps } from 'src/global.config';
import * as Snakyjs from 'snarkyjs';

export type TSnarkyjs = typeof Snakyjs;
interface IDataContextReturn {
    snarkyjs: TSnarkyjs | null;
    isLoadingZkClient: boolean;
}
const TheContext = createContext<IDataContextReturn>({} as IDataContextReturn);

export default function ZkClientProvider({ children }: BaseContextProps) {
    const [data, setData] = useState<IDataContextReturn>({ isLoadingZkClient: true, snarkyjs: null });

    async function loadZkClient() {
        console.log('load zkclient...');
        const _snakyjs = await import('snarkyjs');
        setData({ isLoadingZkClient: false, snarkyjs: _snakyjs });
        console.log('Load zkclient done!');
    }

    useEffect(() => {
        loadZkClient();
    }, []);
    return <TheContext.Provider value={{ ...data }}>{children}</TheContext.Provider>;
}

export const useZkClientContext = () => useContext(TheContext);
