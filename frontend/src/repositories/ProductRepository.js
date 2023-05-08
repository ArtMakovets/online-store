import Axios from './Clients/AxiosClient'
const resource = '/products';

export default {
  getAll() {
    const controller = new AbortController()
    const request = Axios.get(`${resource}`, { signal: controller.signal })
    return {request, cancel: () => controller.abort()};
  },
  getProduct(id) {
    return Axios.get(`${resource}/${id}`);
  },
  create(payload) {
    return Axios.post(`${resource}`, payload);
  },
  update(payload, id) {
    return Axios.put(`${resource}/${id}`, payload);
  },
  delete(id) {
    return Axios.delete(`${resource}/${id}`)
  },
}
