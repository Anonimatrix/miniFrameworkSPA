import Router from './Router';
import Header from './components/Header';
import Footer from './components/Footer';
import Body from './components/Body';

const paths = {
    '/body': Body
}

const header = new Header(0);
const router = new Router(1, paths);
const footer = new Footer(2);

export default class App {
    constructor(el){
        this.el = el;
    }

    renderAll(){
        header.render(this.el, this.el.children[header.position]);
        router.render(this.el, this.el.children[router.position]);
        footer.render(this.el, this.el.children[footer.position]);
    }
}