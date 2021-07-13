export default class Component {
  constructor(rootElement, componentElement, position) {
    this.rootElement = rootElement;
    this.componentElement = componentElement;
    this.position = position;
    this.observers = [];
  }

  suscribe(observer) {
    if(!this.observers.includes(observer)) this.observers.push(observer);
  }

  notifyToObservers(data) {
    this.observers.forEach((o) => {
      o.notify(data);
    });
  }

  createInputs(template) {
    const inputRegex = new RegExp(/<input.*?\/?>/g);
    const inputModel = new RegExp(/:model="(.*?)"/);
    let inputs = template.match(inputRegex);
    for (const i in inputs) {
      let hash = inputs[i].match(inputModel);
      if (hash && hash[1]) {
        let input = this.componentElement.getElementsByTagName("input")[i];
        input.onchange = () => {
          this[hash[1]] = input.value;
          input.setAttribute('id', i);
          this.notifyToObservers({render: this, focus: i});
        };
      }
    }
  }

  createLinks(template) {
    const aRegex = new RegExp(/<a.*?>.*<\/a>/g);
    const aRoute = new RegExp(/:href="(.*?)"/);
    let links = template.match(aRegex);
    for (const i in links) {
      let hash = links[i].match(aRoute);
      if (hash && hash[1]) {
        let a = this.componentElement.getElementsByTagName("a")[i];
        a.onclick = () => {
          const uri = location.hash;
          history.pushState({}, hash[1].substr(1), hash[1]);
          this.notifyToObservers({beforeUri: uri});
        };
      }
    }
  }

  render(template) {
      this.componentElement.innerHTML = template;
      this.rootElement.insertBefore(this.componentElement, this.rootElement.children[this.position]);
      this.createLinks(template);
      this.createInputs(template);
  }

  clear() {
    this.rootElement.removeChild(this.rootElement.children[this.position]);
  }
}
