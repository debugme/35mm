import { Collection } from '../models/Collection'

abstract class CollectionView<T, K> {
  constructor(private parent: Element, private collection: Collection<T, K>) {}
  abstract renderItem: (parent: Element, model: T) => void
  render = () => {
    this.parent.innerHTML = ''
    const template = document.createElement('template')
    this.collection.models.forEach((model) => {
      const itemParent = document.createElement('div')
      this.renderItem(itemParent, model)
      template.content.append(itemParent)
    })
    this.parent.append(template.content)
  }
}

export { CollectionView }
