export default {
  getItem: function(key) {
    return localStorage.getItem(`hm_${key}`);
  },
  setItem: function(key, value) {
    return localStorage.setItem(`hm_${key}`, value);
  },
  removeItem: function(key) {
    return localStorage.removeItem(`hm_${key}`);
  }
}