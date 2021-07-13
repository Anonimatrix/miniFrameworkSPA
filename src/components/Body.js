import Component from "../../SPA/Component.js";

export default class Body extends Component {
  input = "Input reactivo";

  createTemplate() {
    let template = `
        <p>${this.input}</p>
        <input type="text" :model="input" value="${this.input}" />
    `;
    return template;
  }

  constructor(rootElement, position) {
    const main = document.createElement("main");
    main.setAttribute("id", "body");
    super(rootElement, main, position);
  }
}
