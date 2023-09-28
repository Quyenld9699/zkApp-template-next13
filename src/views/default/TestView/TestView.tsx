import { useState } from 'react';
import { Box, Button, Divider, Typography } from '@mui/material';
import useAddContract from 'src/contracts/useAddContract';
import { useZkClientContext } from 'src/contexts/zkclient-context/zkclient-context';
import { useWalletContext } from 'src/contexts/wallet-context/wallet-context';

export default function TestView() {
    const { zkClient } = useZkClientContext();
    const { minaChain } = useWalletContext();
    const { contract, fetchAccountContract, isLoading } = useAddContract();
    const [num, setNum] = useState<string>('...');
    const [loadingAddOne, setLoadingAddOne] = useState<boolean>(false);
    async function getNumber() {
        if (contract) {
            setNum('Loading...');
            try {
                await fetchAccountContract();
                setNum(contract.num.get().toString());
            } catch (err) {
                setNum((err as Error).message);
            }
        }
    }

    async function addToNum() {
        setLoadingAddOne(true);
        try {
            if (zkClient) {
                const { Mina, fetchAccount } = zkClient;
                if (minaChain.userPublickey) {
                    const sender = minaChain.userPublickey;
                    if (contract) {
                        await fetchAccount({ publicKey: sender });
                        const tx = await Mina.transaction(sender, () => {
                            contract.addOne();
                        });
                        await tx.prove();
                        const transactionJSON = tx.toJSON();
                        console.log(transactionJSON);
                        let transactionFee = 0.1;
                        const { hash } = await (window as any).mina.sendTransaction({
                            transaction: transactionJSON,
                            feePayer: {
                                fee: transactionFee,
                                memo: '',
                            },
                        });

                        const transactionLink = `https://berkeley.minaexplorer.com/transaction/${hash}`;
                        console.log(transactionLink);
                    }
                }
            }
        } catch (err) {
            console.log(err);
        }
        setLoadingAddOne(false);
    }

    return (
        <div>
            {isLoading ? (
                <>
                    <div>Loading Add contract</div>
                </>
            ) : (
                <Box mt={3}>
                    <Divider />
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Button variant="contained" onClick={getNumber} sx={{ mr: 3 }}>
                            Get Num
                        </Button>
                        <Typography>{num}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 3 }}>
                        <Button variant="contained" onClick={addToNum} sx={{ mr: 3 }} disabled={loadingAddOne}>
                            Add one
                        </Button>
                        <Typography>{loadingAddOne ? 'Loading...' : '...'}</Typography>
                    </Box>
                </Box>
            )}
        </div>
    );
}
