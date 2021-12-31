import React from 'react';
import ToolBarOption from './tool_bar_option';

import VertexImg from './images/vertex.png';

class DrawDotOption extends React.Component {
  constructor(props) {
    super(props)
    this.canvas = document.querySelector('#geometry_sheet');
  }

  render() {
    return(
        <ToolBarOption
                imageSrc={VertexImg}
                imageAlt="תמונה-קודקוד"
                optionText="קודקוד"/>
    )
  }
}

export default DrawDotOption;