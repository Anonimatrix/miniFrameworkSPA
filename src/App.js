import Main from '../SPA/Main.js';
import Router from '../SPA/Router.js';
import Header from './components/Header.js';
import paths from './routes.js';

export default class App extends Main{
    constructor(el){
        super();
        this.el = el;
        this.header = new Header(this.el, 0);
        this.router = new Router(this.el, 1, paths);
    }
    renderAll(){
        this.header.render(this.header.template);
        this.router.render();
    }
    suscribeAll(){
        this.header.suscribe(this);
    }
}