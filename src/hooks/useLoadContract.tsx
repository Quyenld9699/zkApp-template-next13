import { SmartContract, PublicKey } from 'o1js';
import { useState, useEffect } from 'react';
import { useZkClientContext } from 'src/contexts/zkclient-context/zkclient-context';

type Props = {
    importContract: () => Promise<any>;
    contractPublicKeyBase58: string;
    nameContract: string;
};
export default function useLoadContract<T>({ contractPublicKeyBase58, importContract, nameContract }: Props) {
    const { zkClient } = useZkClientContext();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [contract, setContract] = useState<T | null>(null);
    const [publicKey, setPublicKey] = useState<PublicKey | null>(null);

    async function loadContract() {
        if (zkClient) {
            setIsLoading(true);
            console.log(`loading contract ${nameContract}...`);

            const { PublicKey } = zkClient;
            const { [nameContract]: T } = await importContract();
            await T.compile();
            const contractPubKey = PublicKey.fromBase58(contractPublicKeyBase58);
            const _contract = new T(contractPubKey);
            setContract(_contract as T);
            setPublicKey(contractPubKey);

            console.log(`load contract ${nameContract} done.`);
            setIsLoading(false);
        }
    }

    async function fetchAccountContract() {
        if (zkClient) {
            const { fetchAccount } = zkClient;
            if (publicKey) {
                return await fetchAccount({ publicKey: publicKey });
            } else {
                console.error(`Contract ${nameContract}: null publicKey`);
                throw Error(`Contract ${nameContract}: null publicKey`);
            }
        } else {
            console.error(`Client not ready`);
            throw Error(`Client not ready!`);
        }
    }

    useEffect(() => {
        loadContract();
    }, [zkClient]);

    return {
        loadContract,
        isLoading,
        contract,
        publicKey,
        fetchAccountContract,
    };
}
