import React from 'react'
import 'css_files/calculator_gui/data_space/components/data_label.css'
import DeleteButtonImg from "./images/delete_button.png";

class DataLabel extends React.Component {
  constructor(props) {
      super(props)

      this.state = {
          isHoverDelete: false
      }

      this.dataObj = JSON.parse(this.props.dataStr)
  }

  render() {
    return(
        <div className="data_label" id={this.props.id} style={this.dataObj.isNeedProof?
            {backgroundColor:"#d29d9d"}: {backgroundColor:"#b4d4e5"}}>
            <label className="data_label">{this.dataObj.representation}</label>
            { !this.props.isPresentMode ?
                <button className="delete_data" draggable={false}
                             onClick={e => this.props.onDelete()}
                             onMouseEnter={e => this.setState({isHoverDelete: true})}
                             onMouseLeave={e => this.setState({isHoverDelete: false})}>
                    <img className="img_delete_data" src={DeleteButtonImg} alt="כפתור-מחיקה"
                         style={this.state.isHoverDelete?{opacity: "1"}: {opacity: "0.7"}}/>
                </button>
            : []
            }
        </div>
    )
  }
}

export default DataLabel