export default class Body {
    render(el, before){
        let main = document.createElement('main');
        let p = document.createElement('p');
        p.innerText = "Momento Body"

        main.appendChild(p);
        el.instertBefore(main, before);
    }

    clear(){
        
    }
}