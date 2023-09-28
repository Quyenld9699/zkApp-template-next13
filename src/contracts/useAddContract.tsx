import useLoadContract from 'src/hooks/useLoadContract';
import type { Add } from 'testing_adding_number/src/Add';

export default function useAddContract() {
    async function loadContract() {
        return await import('testing_adding_number/build/src/Add');
    }

    return useLoadContract<Add>({
        importContract: loadContract,
        contractPublicKeyBase58: 'B62qrhWzYXdEHzH1xaHoNG3BP2Gr4hs4RGDo7gpyDMWTUYeiiUPErQb',
        nameContract: 'Add',
    });
}
