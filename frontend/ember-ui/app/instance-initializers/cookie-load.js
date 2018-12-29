export function initialize(appInstance) {
  const cookies = appInstance.lookup('service:cookies');
  const user = appInstance.lookup('service:user');
  user.set('user', cookies.get('auth') ? cookies.get('auth') : null);
}

export default {
  initialize
};
