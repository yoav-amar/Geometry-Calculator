import React from 'react'
import 'css_files/calculator_gui/data_space/components/save_button.css'

class SaveButton extends React.Component {
  constructor(props) {
      super(props)
      this.onClick = this.onClick.bind(this)
  }

  onClick(e){
      let data = this.props.dataSpace.getSaveInfo()
      let drawing = this.props.geometryCanvas.getSaveInfo()

      let problem = {data: data, drawing: drawing}

      this.props.popupWindow.show(problem)
  }

  render() {
    return(
        <div className="save">
            <button className="submit" onClick={this.onClick}>
             {this.props.gangId === ''? 'שמור שאלה' : 'שמור בגיאומטריקה'} </button>
        </div>
    )
  }
}

export default SaveButton