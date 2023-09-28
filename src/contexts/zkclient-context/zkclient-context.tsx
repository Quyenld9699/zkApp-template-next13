import { createContext, useContext, useState, useEffect } from 'react';
import { BaseContextProps } from 'src/global.config';
import * as ZkClient from 'o1js';

export type TZkClient = typeof ZkClient;
interface IDataContextReturn {
    zkClient: TZkClient | null;
    isLoadingZkClient: boolean;
}
const TheContext = createContext<IDataContextReturn>({} as IDataContextReturn);

export default function ZkClientProvider({ children }: BaseContextProps) {
    const [data, setData] = useState<IDataContextReturn>({ isLoadingZkClient: true, zkClient: null });

    async function loadZkClient() {
        const _zkClient = await import('o1js');
        setData({ isLoadingZkClient: false, zkClient: _zkClient });
    }

    useEffect(() => {
        loadZkClient();
    }, []);
    return <TheContext.Provider value={{ ...data }}>{children}</TheContext.Provider>;
}

export const useZkClientContext = () => useContext(TheContext);
