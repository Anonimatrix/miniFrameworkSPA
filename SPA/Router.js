export default class Router {
  constructor(rootElement, position, paths) {
    this.rootElement = rootElement;
    this.position = position;
    this.paths = paths;
  }

  clear(beforeUri) {
    if (this.paths[beforeUri]) {
      const Component = this.paths[beforeUri];
      new Component(this.rootElement, this.position).clear();
    }
  }

  render(object) {
    if (object) {
      object.render(object.createTemplate());
      object.suscribe(this);
    } else if (this.paths[location.hash]) {
      const Component = this.paths[location.hash];
      const Object = new Component(this.rootElement, this.position);
      Object.render(Object.createTemplate());
      Object.suscribe(this);
    }
  }

  notify(data) {
    if (data.beforeUri) {
      this.clear(data.beforeUri);
      this.render();
    }
    if (data.render) {
      this.clear(location.hash);
      this.render(data.render);
    }
  }
}
