import React from "react";
import Nav from "./Nav.jsx";
import BugTile from "./BugTile.jsx";
import Modals from "./Modals.jsx";
import Form from "./Form.jsx";
import exampleData from "../example-data/exampleData";

import "../styles/App.scss";

const allbugs = "";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      filter: "None",
      bugs: exampleData,
      buglist: [],
      modalisOpen: false,
      bugNum: 0
    };
    this.filterHandler = this.filterHandler.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    fetch("http://localhost:3000/bug")
      .then(response => response.json())
      .then(results => {
        this.setState({
          bugs: results,
          buglist: results
        });
      });
  }

  filterHandler(filter) {
    this.setState({ filter }, () => {
      if (this.state.filter === "None") {
        this.setState({ buglist: this.state.bugs });
      } else {
        var filteredBugs = this.state.bugs.filter(bug => {
          if (bug.threatLevel === filter) {
            return true;
          }
        });
        this.setState({ buglist: filteredBugs });
      }
    });
  }

  toggleModal() {
    this.setState({
      modalisOpen: !this.state.modalisOpen
    });
  }

  handleSubmit(formdata) {
    this.setState({ bugNum: this.state.bugNum + 1 });
    fetch("http://localhost:3000/bug", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        bugName: this.state.bugNum,
        bugDescription: formdata.Description,
        reportedBy: formdata.Reporter,
        createdDate: Date.now(),
        assignedTo: formdata.AssignedTeamMember,
        threatLevel: formdata.ThreatLevel
      })
    }).then(() =>
      fetch("http://localhost:3000/bug")
        .then(response => response.json())
        .then(results => {
          this.setState({
            bugs: results,
            buglist: results
          });
        })
    );
  }

  render() {
    return (
      <div>
        <div className="modalbutton">
          <button onClick={this.toggleModal}>Add a Bug</button>
        </div>
        {this.state.modalisOpen && (
          <Modals>
            <Form
              toggleModal={this.toggleModal}
              handleSubmit={this.handleSubmit}
            ></Form>
          </Modals>
        )}
        <div>
          <table>
            <Nav filterHandler={this.filterHandler} />
            {this.state.buglist.map(bug => (
              <BugTile
                bugName={bug.bugName}
                bugDescription={bug.bugDescription}
                reportedBy={bug.reportedBy}
                createdDate={bug.createdDate}
                assignedTo={bug.assignedTo}
                threatLevel={bug.threatLevel}
                key={bug.bugName}
              />
            ))}
          </table>
        </div>
      </div>
    );
  }
}

export default App;
