import { useState } from 'react';
import { Box, Button, Divider, Typography } from '@mui/material';
import useAddContract from 'src/contracts/useAddContract';

export default function TestView() {
    const { contract, fetchAccountContract, isLoading } = useAddContract();
    const [num, setNum] = useState<string>('...');

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
                </Box>
            )}
        </div>
    );
}
