'use client';
import { Box, Typography } from '@mui/material';
import { useWalletContext } from 'src/contexts/wallet-context/wallet-context';
import { useZkClientContext } from 'src/contexts/zkclient-context/zkclient-context';
import useLoadContract from 'src/hooks/useLoadContract';

export default function Home() {
    const { isLoadingZkClient } = useZkClientContext();
    const { minaChain } = useWalletContext();
    const {} = useLoadContract();
    if (isLoadingZkClient) {
        return (
            <Box sx={{ minHeight: '100svh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Typography>Loading zkclient...!</Typography>
            </Box>
        );
    }
    return (
        <Box>
            <Typography variant="h1">Hello zkApp</Typography>
            {minaChain.isConnecting ? (
                <Typography>Connecting to Mina...</Typography>
            ) : (
                <>
                    <Typography>Address: {minaChain?.userAddress}</Typography>
                </>
            )}
        </Box>
    );
}
