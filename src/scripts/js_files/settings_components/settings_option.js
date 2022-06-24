import React from 'react'

class SettingsOption extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <button className="settings_option" onClick={this.props.onClick}>
                {this.props.text}
            </button>
        )
    }
}
export default SettingsOption