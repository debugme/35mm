type Callback = () => void

type EventMap = {
  [key: string]: Callback[]
}

interface EventsApi {
  on: (eventName: string, callback: Callback) => void
  trigger: (eventName: string) => void
}

class Events implements EventsApi {
  private events: EventMap = {}

  on = (eventName: string, callback: Callback): void => {
    this.events[eventName] = this.events[eventName] || []
    this.events[eventName].push(callback)
  }

  trigger = (eventName: string): void => {
    const list = this.events[eventName] || []
    list.forEach((callback) => callback())
  }
}

export { EventsApi, Events }
