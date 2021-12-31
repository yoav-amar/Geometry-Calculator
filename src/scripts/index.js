import React from 'react';
import ReactDOM from 'react-dom';

import MainMenu from 'js_files/main_menu/main_menu';

let domContainers = document.querySelectorAll('.main_menu')
domContainers.forEach(domContainer => ReactDOM.render(<MainMenu/>, domContainer))