import React from "react";
import "css_files/calculator_gui/popup_window/popup_window.css"


class PopupWindow extends React.Component {
  constructor(props) {
      super(props)

      this.show = this.show.bind(this)
      this.saveProblem = this.saveProblem.bind(this)

      this.problem = {}
  }

  show(problem, gangId) {
      this.problem = problem
      this.gangId = gangId

      this.props.popupWindowPlane.style.display = "block"
  }

  saveProblem(){
//      this.problem.title = this.input.value

      $.ajax({
          type: 'POST',
          contentType: 'application/json',
          url: '/calculator/save',
          data : JSON.stringify({problem: this.problem, problem_name: this.input.value, gang_code: this.gangId}),
          success : (data) => {
              alert(data)
          },
          error: function (jqXHR) {
            if (jqXHR.status == 400) {
                alert(jqXHR.responseText)

            }
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