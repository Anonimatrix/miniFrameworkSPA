import Component from "../../SPA/Component.js";

export default class Header extends Component{

    template = `
        <nav>
            <ul>
                <li><a style="cursor: pointer;" :href="/#body">Body</a></li>
                <li><a style="cursor: pointer" :href="/#lol">Lol</a></li>
            </ul>
        </nav>
    `;

    constructor(rootElement, position){
        super(rootElement, document.createElement('header'), position);
    }
}