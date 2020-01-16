import React from "react";

class Modals extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="modal">
        <h2>Submit Your Bug</h2>
        <div className="modal">{this.props.children}</div>
        <div className="footer"></div>
      </div>
    );
  }
}

export default Modals;