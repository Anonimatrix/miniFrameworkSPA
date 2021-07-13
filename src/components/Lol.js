import Component from "../../SPA/Component.js";

export default class Lol extends Component{

    template = `
            <div>
                <a :href="/#body">Volver a body</a>
                <div>
                    <p>Texto de experimentacion</p>
                </div>
            </div>
        `;

    constructor(rootElement, position){
        super(rootElement, document.createElement('section'), position);
    }
}