class SettingsOption extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <button className="settings_option">
                {this.props.text}
            </button>
        )
    }
}


class SettingsMenu extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="settings">
                <h1> הגדרות</h1>
                <settings_option text="עדכן שם משתמש"/>
                <settings_option text='עדכן דוא"ל'/>
                <settings_option text="שתף תרגילים אוטומטית"/>
                <settings_option text="מחיקת משתמש 😟"/>

            </div>
        )
    }
}

const domContainers = document.querySelectorAll('.settings')
domContainers.forEach(domContainer => ReactDOM.render(<SettingsMenu/>, domContainer))


// class SetProperty extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             property_name: '',
//             new_property_val: ''
//         }
//     }
// }

// class AutomateShare extends SetProperty {
//     constructor(props) {
//         super(props);
//     }
//
//     render() {
//         return (<>
//             <input type="checkbox"/>
//             <label>automate share your problems</label>
//         </>);
//     }
// }
//
// class DeleteAccount extends SetProperty{
//     constructor(props) {
//         super();
//     }
// }

