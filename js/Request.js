class Requests {
  constructor(url) {
    this.url = url;
  }

  delete(id, token) {
    return this.fetchMethod("delete", "", id, null, token);
  }

  put(endpoint, data, id, token) {
    return this.fetchMethod("put", "", id, data, token);
  }

  get(endpoint, token) {
    return this.fetchMethod("get", endpoint, "", null, token);
  }

  post(data, endpoint, token) {
    return this.fetchMethod("post", endpoint, "", data, token);
  }

  fetchMethod(method, endpoint, id, data = null, token = "") {
    return fetch(this.url + endpoint + "/" + id, {
      method: method,
      body: data,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
export default Requests;
