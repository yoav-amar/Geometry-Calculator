import React from 'react';
import ToolBarOption from './components/tool_bar_option';

import VertexImg from './components/images/vertex.png';
import EdgeImg from './components/images/edge.png';
import BrokenEdgeImg from './components/images/broken_edge.png';
import ConnEdgesImg from './components/images/conn_edges.png';
import NameVertexImg from './components/images/name_vertex.png';
import CircleImg from './components/images/circle.png';
import ClearImg from './components/images/clear.png';
import EraserImg from './components/images/eraser.png';

class ToolBar extends React.Component {
  constructor(props) {
      super(props)
      this.painterNotifier = function(status) { };
  }

  render() {
    return(
        <div style={{display:"flex", width:"100%", height:"100%"}}>
             <ToolBarOption
                imageSrc={VertexImg}
                imageAlt="תמונה-קודקוד"
                optionText="קודקוד"
                onClick={e=> this.painterNotifier("dot")}/>

            <ToolBarOption
                imageSrc={NameVertexImg}
                imageAlt="תמונה-סמן-קודקוד"
                optionText="סמן קודקוד"
                onClick={e=> this.painterNotifier("name_dot")}/>

            <ToolBarOption
                imageSrc={ConnEdgesImg}
                imageAlt="תמונה-קטע רציף"
                optionText="קטע רציף"
                onClick={e=> this.painterNotifier("conn_edges")}/>

            <ToolBarOption
                imageSrc={EdgeImg}
                imageAlt="תמונה-קטע"
                optionText="קטע"
                onClick={e=> this.painterNotifier("edge")}/>

            <ToolBarOption
                imageSrc={BrokenEdgeImg}
                imageAlt="תמונה-קטע-מקווקו"
                optionText="קטע מקווקו"
                onClick={e=> this.painterNotifier("broken_edge")}/>

            <ToolBarOption
                imageSrc={CircleImg}
                imageAlt="תמונה-מעגל"
                optionText="מעגל"
                onClick={e=> this.painterNotifier("circle")}/>

            <ToolBarOption
                imageSrc={EraserImg}
                imageAlt="תמונה-מחק"
                optionText="מחק"
                onClick={e=> this.painterNotifier("eraser")}/>

            <ToolBarOption
                imageSrc={ClearImg}
                imageAlt="תמונה-נקה דף"
                optionText="נקה דף"
                onClick={e=> this.painterNotifier("clear")}/>
        </div>
    )
  }
}

export default ToolBar;
