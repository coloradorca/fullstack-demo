import React from 'react';
import Nav from './Nav.jsx';
import BugTile from './BugTile.jsx';
import exampleData from '../example-data/exampleData';

import '../styles/App.scss';

const allbugs ='';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      filter: 'None',
      bugs: exampleData,
      buglist: []
    };
    this.filterHandler = this.filterHandler.bind(this);
  }

  componentDidMount() {
    fetch('http://localhost:3000/bug')
      .then(response => response.json())
      .then( (results) =>{
            this.setState({
              bugs: results,
              buglist: results
            })
      })
  }

  filterHandler(filter) {
    this.setState({ filter }, () => {
      if(this.state.filter === "None"){
        this.setState({ buglist: this.state.bugs})
      } else {
        var filteredBugs = this.state.bugs.filter((bug) => {
          if (bug.threatLevel === filter){
            return true;
          }
        })
        this.setState({ buglist: filteredBugs })
      }
    });
  }

  render() {
    return (
      <table>
        <Nav
          filterHandler={this.filterHandler}
        />
        {this.state.buglist.map((bug) => (
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
    );
  }
}

export default App;
