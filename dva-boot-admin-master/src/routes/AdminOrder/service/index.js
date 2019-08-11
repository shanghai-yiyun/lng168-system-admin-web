import $$ from "cmn-utils/lib";

export async function viewContract(payload) {
    return $$.post('/business/order/viewContract', payload);
}