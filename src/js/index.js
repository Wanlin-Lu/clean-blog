// Import vendors
import "./vendor/bootstrap";

// Import application sass styles
import "../styles/sass/style.scss";

// Import application css styles
import "../styles/css/style.css";

import { cleanBlog } from "./clean-blog";

$(document).ready(function() {
  cleanBlog();
});