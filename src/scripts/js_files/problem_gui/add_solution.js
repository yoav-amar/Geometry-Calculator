import React from 'react'

class AddSolution extends React.Component {
    constructor(props) {
        super(props)
    }
    create_new_solution(event) {
        alert(event.target)
        file = event.target.new_solution
        event.preventDefault()
    }
    render() {
        return (
            <form onSubmit={this.create_new_solution.bind(this)} method={"post"}>
                <label>העלה פתרון:
                    <input type="file" id="new_solution" name="new_solution" accept='.png,.jpeg,.jpg' />
                </label>
                <input type={"submit"} value={"אשר"} />
            </form>
        )
    }
}

export default AddSolution
