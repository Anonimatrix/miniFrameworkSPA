export default class Header {

    constructor(position){
        this.position = position;
    }

    render(el, before){
        const header = document.createElement('header');
        const  ul = document.createElement('ul');
        for(let i = 0; i < 4; i++){
            const li = document.createElement('li');
            const a = document.createElement('a');
            li.appendChild(a);
            ul.appendChild(li);
        }
        header.appendChild(ul);

        el.insertBefore(header, before);
    }

    clear(){
        
    }
}