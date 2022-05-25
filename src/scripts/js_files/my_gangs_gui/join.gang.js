import React from 'react'
import ReactDOM from 'react-dom'

class NewGang extends React.Component {
    constructor(props) {
        super(props)
    }
    add_new_gang(){
    alert("add new gang")
    }
    render() {
        return (
            <button className="new_gang" onClick={this.add_new_gang}>
                {"הוסף גיאו-מטריקה חדשה"}
            </button>
        )
    }
}

export default NewGang