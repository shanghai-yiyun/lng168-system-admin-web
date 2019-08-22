import $$ from "cmn-utils/lib";

export async function viewReport(payload) {
    return $$.post('/adminEnterprise/getGasReport', payload);
}