import React from 'react';

const Nav = (props) => (
  <thead>
    <tr>
      <th>Bug #</th>
      <th>Description</th>
      <th>Reported By</th>
      <th>Creation Date</th>
      <th>Assigned To</th>
      <th>
        <label>Threat Level &nbsp;</label>
        <select id="myList" onChange={(e) => props.filterHandler( e.target.value)}>
          <option value="None"></option>
          <option value="Low-Priority">Low-Priority</option>
          <option value="Important">Important</option>
          <option value="Critical">Critical</option>
        </select>
      </th>
    </tr>
  </thead>
);

export default Nav;
