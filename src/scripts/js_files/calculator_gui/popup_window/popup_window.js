import React from "react";
import "css_files/calculator_gui/popup_window/popup_window.css"


class PopupWindow extends React.Component {
  constructor(props) {
      super(props)

      this.show = this.show.bind(this)
      this.saveProblem = this.saveProblem.bind(this)

      this.problem = {}
  }

  show(problem) {
      this.problem = problem

      this.props.popupWindowPlane.style.display = "block"
  }

  saveProblem(){
      this.problem.title = this.input.value
      alert(this.problem.title)

      $.ajax({
          type: 'POST',
          contentType: 'application/json',
          url: '/calculator/save',
          data : JSON.stringify({problem: this.problem}),
          success : (data) => {
              alert(data)
          },
          error : (data) => {
              alert('Got An Error Sending To Server Please Try Again')
          }
      });

      this.props.popupWindowPlane.style.display = "none"
  }

  render() {
    return(
        <div className="popup">
            <button className="popup" onClick={this.saveProblem}>שמור שאלה</button>
            <input className="popup" ref={(ref) => this.input = ref}/>
            <label className="popup" style={{direction: "rtl"}}>כותרת לשאלה:</label>
        </div>
    )
  }
}

export default PopupWindow