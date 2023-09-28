import { PublicKey, fetchAccount } from 'o1js';

export interface IDataChainConnected {
    name?: string;
    isConnecting: boolean;
    userAddress: string | null; // ?: publicKeyBase58
    userPublickey: PublicKey | null; // ?: = PublicKey.fromBase58(publicKeyBase58)
    accountExists: boolean;
    connectWallet: () => Promise<void>;
}
