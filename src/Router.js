export default class Router {
    constructor(position, paths){
        this.position = position;
        this.paths = paths;
    }

    clear(el){
        if(this.paths[location.pathname]){
            this.paths[location.pathname].clear(el);
        }
    }

    render(el, before){
        if(this.paths[location.pathname]){
            this.paths[location.pathname].render(el, before);
        }
    }
}