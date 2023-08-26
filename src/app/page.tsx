'use client';
import { Box, Typography } from '@mui/material';
import { useWalletContext } from 'src/contexts/wallet-context/wallet-context';

export default function Home() {
    const { minaChain } = useWalletContext();
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
