// Import vendors
import "./vendor/bootstrap";

// Import application sass styles
import "../styles/sass/style.scss";

// Import application css styles
import "../styles/css/style.css";

import { navigation } from "./navigation";

const element = document.createElement('div')
element.className = 'navbar-light header'
element.innerText = 'nihao'

const sm = document.createElement('div')
sm.className = 'dropdown-item sm-menu'

sm.innerHTML = '<a class="dropdown-item" href="#">service one</a>\
  <a class="dropdown-item" href="#">service two</a>\
  <a class="dropdown-item" href="#">service three</a>'

document.body.appendChild(element)
element.appendChild(sm)

$(document).ready(function() {
  navigation();
});