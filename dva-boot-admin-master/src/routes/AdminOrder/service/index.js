import $$ from "cmn-utils/lib";

export async function viewContract(payload) {
    return $$.post('/article-gate/business/order/viewContract', payload);
}