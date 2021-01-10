interface HttpServiceApi<T> {
  post(path: string, body: object): Promise<T>
  put(path: string, body: object): Promise<T>
  get(path: string): Promise<T>
}

class HttpService<T> implements HttpServiceApi<T> {
  constructor(private host: string) {}

  async post(path: string, body: object): Promise<T> {
    const url = `${this.host}/${path}`
    const options = {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    }
    const response = await fetch(url, options)
    const message = 'Error - Network response was not ok'
    if (!response.ok) throw new Error(message)
    return response.json() as Promise<T>
  }

  async put(path: string, body: object): Promise<T> {
    const url = `${this.host}/${path}`
    const options = {
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    }
    const response = await fetch(url, options)
    const message = 'Error - Network response was not ok'
    if (!response.ok) throw new Error(message)
    return response.json() as Promise<T>
  }

  async get(path: string): Promise<T> {
    const url = `${this.host}/${path}`
    const options = { method: 'get' }
    const response = await fetch(url, options)
    const message = 'Error - Network response was not ok'
    if (!response.ok) throw new Error(message)
    return response.json() as Promise<T>
  }
}

export { HttpService, HttpServiceApi }
