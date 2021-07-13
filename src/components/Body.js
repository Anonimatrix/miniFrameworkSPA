import Component from "../../SPA/Component.js";

export default class Body extends Component{

    template = `
            <p>Parrafo super genial</p>
        `;

    constructor(rootElement, position){
        super(rootElement, document.createElement('main'), position);
    }
}