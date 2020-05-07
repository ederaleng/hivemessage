import axios from "axios";

export class Ajax {
  constructor(endpointUrl = "") {
    this.endpointUrl = endpointUrl;
  }
  get(url, headers = {}) {
    return this.__manual({
      method: "GET",
      url: `${this.endpointUrl}${url}`,
      headers
    });
  }
  post(url, data, headers) {
    return this.__manual({
      method: "POST",
      url: `${this.endpointUrl}${url}`,
      headers,
      data
    });
  }
  patch(url, data, headers) {
    return this.__manual({
      method: "PATCH",
      url: `${this.endpointUrl}${url}`,
      headers,
      data
    });
  }
  put(url, data, headers) {
    return this.__manual({
      method: "PUT",
      url: `${this.endpointUrl}${url}`,
      headers,
      data
    });
  }
  delete(url, headers) {
    return this.__manual({
      method: "DELETE",
      url: `${this.endpointUrl}${url}`,
      headers
    });
  }

  /**
   * Basic request
   * @param {Object} req {
      method: 'get',
      headers: {}
      url: '/channels',
      data: {}
    }
   */
  __manual(req) {
    return axios(req).then(dt => {
      return dt;
    });
  }
}
