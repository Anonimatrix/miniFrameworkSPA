export default class Component {
  constructor(rootElement, componentElement, position) {
    this.rootElement = rootElement;
    this.componentElement = componentElement;
    this.position = position;
    this.observers = [];
  }

  suscribe(observer) {
    if (!this.observers.includes(observer)) this.observers.push(observer);
  }

  notifyToObservers(data) {
    this.observers.forEach((o) => {
      o.notify(data);
    });
  }

  clearTemplate(template){
    const inputModel = new RegExp(/(<input.*?) :model="(.*?)"(.*?\/?>)/gi);
    const eventRegexG = new RegExp(/(<([\w]+).*?) :on([\w]+)?=\".*?\"(.*?>)/gi);
    const aRegex = new RegExp(/(<a.*?) :href="(.*?)"(.*?>)/gi);
    let newTemplate = template.replace(inputModel, '$1' + '$3');
    newTemplate = newTemplate.replace(eventRegexG, '$1' + '$4');
    newTemplate = newTemplate.replace(aRegex, '$1' + '$3');
    return newTemplate;
  }

  handleEvent(template) {
    //Global regex to detect all events attributes
    const eventRegexG = new RegExp(/<([\w]+).*?:on([\w]+?)=\"(.*?)\".*?>/gi);
    //Regex to destructuring in groups tags
    const eventRegex = new RegExp(/<([\w]+).*?:on([\w]+?)=\"(.*?)\".*?>/i);
    let tags = template.match(eventRegexG);
    let matchesProcessed = [];
    for (let i in tags) {
      if (!matchesProcessed.includes(tags[i])) {
        let groupTag = tags[i].match(eventRegex);
        let typeTag = groupTag[1];
        let tagsTypeTag = template.match(new RegExp(`<${typeTag}.*?>`, "g"));
        for (let i in tagsTypeTag) {
          if (eventRegex.test(tagsTypeTag[i])) {
            let element = document.getElementsByTagName(typeTag)[i];
            let groupTag = tagsTypeTag[i].match(eventRegex);
            let event = groupTag[2].toLowerCase();
            let func = groupTag[3];
            if (element && this[func] && typeof element["on" + event] != "undefined") {
              element["on" + event] = () => {
                this[func]();
                this.notifyToObservers({ render: this });
              };
            }else{
              console.warn(tagsTypeTag[i] + " Elemento inexistente, evento inexistente o funcion inexistente en", this);
            }
          }
          matchesProcessed.push(tagsTypeTag[i]);
        }
      }
    }
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
          this.notifyToObservers({ render: this });
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
          this.notifyToObservers({ beforeUri: uri });
        };
      }
    }
  }

  render(template) {
    let cleanTemplate = this.clearTemplate(template);
    this.componentElement.innerHTML = cleanTemplate;
    this.rootElement.insertBefore(
      this.componentElement,
      this.rootElement.children[this.position]
    );
    this.createLinks(template);
    this.createInputs(template);
    this.handleEvent(template);
  }

  clear() {
    this.rootElement.removeChild(this.rootElement.children[this.position]);
  }
}
