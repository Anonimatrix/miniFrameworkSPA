export default class Router {
    constructor(rootElement, position, paths){
        this.rootElement = rootElement;
        this.position = position;
        this.paths = paths;
    }

    clear(beforeUri){
        if(this.paths[beforeUri]){
            const Component = this.paths[beforeUri]
            new Component(this.rootElement, this.position).clear();
        }
    }

    render(){
        if(this.paths[location.hash]){
            const Component = this.paths[location.hash]
            const Object = new Component(this.rootElement, this.position);
            Object.render(Object.template);
            Object.suscribe(this);
        }
    }

    notify(options){
        if(options.type === "link"){
            this.clear(options.beforeUri);
            this.render();
        }
    }
}