import { Model } from '../models/Model'

type EventHandlers = {
  [key: string]: () => void
}

type Region = {
  type: Function
  selector: string
  element: Element | null
}

abstract class View<T, K extends Model<T>> {
  protected regions: Region[] = []
  public constructor(protected parent: Element, protected model: K) {
    this.bindModel()
  }
  public render = () => {
    const template = document.createElement('template')
    template.innerHTML = this.getTemplate()
    this.bindEvents(template.content)
    this.setUpRegions()
    this.bindRegions(template.content)
    this.renderRegions()
    this.parent.innerHTML = ''
    this.parent.append(template.content)
  }
  public get on() {
    return this.model.on
  }
  protected setUpRegions = () => {}
  protected getTemplate = () => ''
  protected getEventHandlers = (): EventHandlers => ({})
  protected renderRegions = () => {
    const renderRegion = (region: Region) => {
      const { type, element } = region
      const instance = Reflect.construct(type, [element, this.model])
      instance.render()
    }
    this.regions.forEach(renderRegion)
  }
  private bindModel = () => this.model.on('change', this.render)
  private bindEvents(fragment: DocumentFragment) {
    const eventHandlers = this.getEventHandlers()
    for (let key in eventHandlers) {
      const [eventName, selector] = key.split(':')
      const eventHandler = eventHandlers[key]
      const elementList = fragment.querySelectorAll(selector)
      elementList.forEach((element) =>
        element.addEventListener(eventName, eventHandler)
      )
    }
  }
  private bindRegions = (fragment: DocumentFragment) => {
    const setElement = (region: Region) =>
      (region.element = fragment.querySelector(region.selector))
    this.regions.forEach(setElement)
  }
}

export { View, EventHandlers, Region }
