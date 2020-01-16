import React from "react";

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      AssignedTeamMember: "",
      ThreatLevel: "",
      Description: "",
      Reporter: ""
    };
    this.cancelCourse = this.cancelCourse.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const value = event.target.value;
    const name = event.target.name;
    this.setState({
      [name]: value
    });
  }
  cancelCourse() {
    this.setState({
      AssignedTeamMember: "",
      ThreatLevel: "",
      Description: "",
      Reporter: ""
    });
  }

  render() {
    const {
      AssignedTeamMember,
      ThreatLevel,
      Description,
      Reporter
    } = this.state;
    return (
      <div>
        <form
          className="theform"
          onSubmit={e => {
            e.preventDefault();
            this.props.handleSubmit(this.state);
            this.cancelCourse();
            this.props.toggleModal();
          }}
        >
          <label>
            Assigned Team Member:
            <input
              name="AssignedTeamMember"
              type="text"
              value={AssignedTeamMember}
              onChange={this.handleInputChange}
            />
          </label>
          <label>
            Threat Level:
            <input
              name="ThreatLevel"
              type="text"
              value={ThreatLevel}
              onChange={this.handleInputChange}
            />
          </label>
          <label>
            Description:
            <input
              name="Description"
              type="text"
              value={Description}
              onChange={this.handleInputChange}
            />
          </label>
          <label>
            Reporter:
            <input
              name="Reporter"
              type="text"
              value={Reporter}
              onChange={this.handleInputChange}
            />
          </label>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default Form;