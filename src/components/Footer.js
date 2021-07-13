export default class Footer {

    constructor(position){
        this.position = position;
    }

    render(el, before){
        let footer = document.createElement('footer');
        let p = document.createElement('p');

        footer.appendChild(p);
        el.instertBefore(footer, before);
    }

    clear(){
        
    }
}