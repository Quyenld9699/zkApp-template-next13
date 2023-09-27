import { useState, useEffect } from 'react';
import { useZkClientContext } from 'src/contexts/zkclient-context/zkclient-context';
import { Add as TAdd } from 'testing_adding_number';

export default function useLoadContract() {
    const { zkClient, isLoadingZkClient } = useZkClientContext();

    const [contract, setContract] = useState<TAdd | null>(null);

    async function loadContract() {
        if (zkClient) {
            const { PublicKey } = zkClient;
            const { Add } = await import('testing_adding_number/build/src/Add');
            await Add.compile();
            const zkappPublicKey = PublicKey.fromBase58('B62qp9tTMyxHHPq67j5SrhdqDRafbsGRneNLecYmuU7d94U3SPsnPA3');

            const _contract = new Add(zkappPublicKey);
            await zkClient.fetchAccount({ publicKey: zkappPublicKey });
            const num = await _contract.num.get();
            console.log('num', num);
        }
    }

    useEffect(() => {
        if (!isLoadingZkClient) {
            loadContract();
        }
    }, [zkClient, isLoadingZkClient]);

    return {
        loadContract,
    };
}
