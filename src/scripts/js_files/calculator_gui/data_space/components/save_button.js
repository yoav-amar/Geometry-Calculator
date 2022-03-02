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

      $.ajax({
          type: 'POST',
          contentType: 'application/json',
          url: '/calculator/save',
          data : JSON.stringify({problem: problem}),
          success : (data) => {
              alert(data)
          },
          error : (data) => {
              alert('Got An Error Sending To Server Please Try Again')
          }
      });
  }

  render() {
    return(
        <div className="save">
            <button className="submit" onClick={this.onClick}> שמור שאלה </button>
        </div>
    )
  }
}

export default SaveButton