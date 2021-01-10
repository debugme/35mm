interface AttributesApi<T> {
  get: <K extends keyof T>(key: K) => T[K]
  set: (update: T) => void
  getAll: () => T
}

class Attributes<T> implements AttributesApi<T> {
  constructor(private data: T) {}

  get = <K extends keyof T>(key: K): T[K] => {
    return this.data[key]
  }

  set = (update: T): void => {
    this.data = { ...this.data, ...update }
  }

  getAll = (): T => {
    return this.data
  }
}

export { AttributesApi, Attributes }
