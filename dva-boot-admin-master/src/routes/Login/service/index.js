import $$ from 'cmn-utils';
export async function login(payload) {
  return $$.post('/admin/user/login', payload);
}
