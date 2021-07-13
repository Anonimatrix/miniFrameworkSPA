export default class Component {
  constructor(rootElement, componentElement, position) {
    this.rootElement = rootElement;
    this.componentElement = componentElement;
    this.position = position;
    this.observers = [];
  }

  suscribe(observer) {
    this.observers.push(observer);
  }

  notifyToObservers(uri) {
    this.observers.forEach((o) => {
      o.notify({ type: "link", beforeUri: uri });
    });
  }

  createLinks() {
    const aRegex = new RegExp(/<a.*?>.*<\/a>/g);
    const aRoute = new RegExp(/:href="(.*?)"/);
    let links = this.template.match(aRegex);
    for (const i in links) {
      let hash = links[i].match(aRoute);
      if (hash && hash[1]) {
        let a = this.componentElement.getElementsByTagName("a")[i];
        a.onclick = () => {
          const uri = location.hash;
          history.pushState({}, hash[1].substr(1), hash[1]);
          this.notifyToObservers(uri);
        };
      }
    }
  }

  render(template) {
      this.componentElement.innerHTML = template;
      this.rootElement.insertBefore(this.componentElement, this.rootElement.children[this.position]);
      this.createLinks();
  }

  clear() {
    this.rootElement.removeChild(this.rootElement.children[this.position]);
  }
}
