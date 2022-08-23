export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  addItemFirst(element) {
    this._container.prepend(element);
  }

  addItem(element) {
    this._container.append(element);
  }

  clear() {
    this._container.innerHTML = '';
  }

  renderItems() {
    this.clear();
    this._renderedItems.forEach(item => {
      this._renderer(item);
    });
  }

  setItems(items) {
    this._renderedItems = items;
  }
  
}