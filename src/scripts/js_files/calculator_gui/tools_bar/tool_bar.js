import React from 'react';
import ToolBarOption from './components/tool_bar_option';
import DrawDotOption from "./components/draw_dot_option";

import EdgeImg from './components/images/edge.png';
import BrokenEdgeImg from './components/images/broken_edge.png';
import NameVertexImg from './components/images/name_vertex.png';
import CircleImg from './components/images/circle.png';
import EraserImg from './components/images/eraser.png';

class ToolBar extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
        <div style={{display:"flex", width:"100%", height:"100%"}}>
            <DrawDotOption/>
            <ToolBarOption
                imageSrc={NameVertexImg}
                imageAlt="תמונה-סמן-קודקוד"
                optionText="סמן קודקוד"
                onClick={e=> alert('hi')}/>
            <ToolBarOption
                imageSrc={EdgeImg}
                imageAlt="תמונה-קטע"
                optionText="קטע"/>
            <ToolBarOption
                imageSrc={BrokenEdgeImg}
                imageAlt="תמונה-קטע-מקווקו"
                optionText="קטע מקווקו"/>
            <ToolBarOption
                imageSrc={CircleImg}
                imageAlt="תמונה-מעגל"
                optionText="מעגל"/>
            <ToolBarOption
                imageSrc={EraserImg}
                imageAlt="תמונה-מחק"
                optionText="מחק"/>
        </div>
    )
  }
}

export default ToolBar;
