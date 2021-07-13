import Component from "../../SPA/Component.js";

export default class Body extends Component {
  input = "Input reactivo";
  textoReactivo = "nada que mostrar aca";

  click(){
    this.textoReactivo = "Te engañe";
  }

  click2(){
    console.log('lol');
  }

  createTemplate() {
    let template = `
        <p>${this.input}</p>
        <input type="text" :model="input" value="${this.input}" />
        <button :onClick="click">No le des click jeje</button>
        <button :onClick="click2">Lolardo games</button>
        <p>${this.textoReactivo}</p>
    `;
    return template;
  }

  constructor(rootElement, position) {
    const main = document.createElement("main");
    main.setAttribute("id", "body");
    super(rootElement, main, position);
  }
}
