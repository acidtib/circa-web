import http from "../http-common";

class ApiService {
  getAll(page = 1) {
    return http.get("/posts", { params: { page: page } })
  }
  
  get(id) {
    return http.get(`/posts/${id}`)
  }
}

export default new ApiService()