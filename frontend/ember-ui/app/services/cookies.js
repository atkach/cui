import Service from '@ember/service';

export default Service.extend({

  set(name, value, expires = new Date(new Date().getTime() + 600 * 1000), path = '/') {
    document.cookie = `${name}=${JSON.stringify(value)}; path=${path}; expires=${expires.toUTCString()}`;
  },

  get(name) {
    const matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([$?*|{}^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches && matches[1] ? JSON.parse(matches[1]) : null;
  },

  remove(name) {
    document.cookie = `${name}=; path=/; expires=-1`;
  }

});
