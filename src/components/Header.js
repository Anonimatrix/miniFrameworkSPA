import Component from "../../SPA/Component.js";

export default class Header extends Component {
  createTemplate() {
    let template = `
            <nav>
                <ul class="header__links-container">
                    <li class="header__link-container"><a class="header__link" :href="/#body">Body</a></li>
                    <li class="header__link-container"><a class="header__link" :href="/#lol">Lol</a></li>
                </ul>
            </nav>
        `;
    return template;
  }

  constructor(rootElement, position) {
    super(rootElement, document.createElement("header"), position);
  }
}
