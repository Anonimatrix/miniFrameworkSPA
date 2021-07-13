import Component from "../../SPA/Component.js";

export default class Lol extends Component {
  createTemplate() {
    let template = `
        <div>
            <a class="section__link" :href="/#body">Volver a body</a>
            <div>
                <p>Texto de experimentacion</p>
            </div>
        </div>
    `;
    return template;
  }

  constructor(rootElement, position) {
    const section = document.createElement("section");
    section.setAttribute("id", "section");
    super(rootElement, section, position);
  }
}
