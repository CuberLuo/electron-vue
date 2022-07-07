// 封装fetch方法
export class HttpRequest {
  // baseURL = 'http://localhost:3000'
  baseURL = 'http://1.15.134.164:3000'

  async get(api) {
    const response = await fetch(this.baseURL + api, {
      method: 'GET'
    })
    const responseData = await response.json()
    return responseData
  }

  async post(api, data) {
    const response = await fetch(this.baseURL + api, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    const responseData = await response.json()
    return responseData
  }
}
