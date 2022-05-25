import React from 'react'

class Gang extends React.Component {
    constructor(props) {
        super(props)
    }
    open_gang(){
        alert("open the gang")
    }
    render() {
        return (
            <button className="gang" onClick={this.open_gang}>
                {"hey"}
            </button>
        )
    }
}

export default Gang