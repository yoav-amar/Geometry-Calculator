import React from 'react';
import 'css_files/calculator_gui/draw_space/geometry_canvas.css'

class GeometryCanvas extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
        <svg className="geometry_grid">
            <circle cx="60" cy="60" r="5"/>
            <line x1="100" y1="100" x2="200" y2="200" stroke="black" strokeWidth="3px"/>
            <line x1="200" y1="100" x2="300" y2="200" stroke="black" strokeWidth="3px" strokeDasharray="4"/>
        </svg>
    )
  }
}

export default GeometryCanvas;