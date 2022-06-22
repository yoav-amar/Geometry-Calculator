import React from 'react'
import 'css_files/calculator_gui/data_space/components/submit_button.css'

class SubmitButton extends React.Component {
  constructor(props) {
      super(props)
      this.onClick = this.onClick.bind(this)

  }

  onClick(e){
      let data = this.props.dataSpace.getDataRepresentation()
      let drawing = this.props.geometryCanvas.getDrawing()
      let drawingSaveInfo = this.props.geometryCanvas.getSaveInfo()

      let problem = {data: data, drawing: drawing}
      $.ajax({
          type: 'POST',
          contentType: 'application/json',
          url: '/calculator/solve',
          data : JSON.stringify({problem: problem}),
          success : (data) => {
              let solution = data.solution
              if(solution.length == 0){
                    alert("no solution found")
              } else {
                    $("#main_body").load('/solution',
                     {solution: JSON.stringify({solution:solution}),
                      drawing: JSON.stringify({drawing:drawingSaveInfo})})
              }
          },
          error : (data) => {
              alert('Got An Error Sending To Server Please Try Again')
          }
      });
  }

  render() {
    return(
        <div className="submit">
            <button className="submit" onClick={this.onClick}> פתור ע"י טענה נימוק </button>
        </div>
    )
  }
}

export default SubmitButton