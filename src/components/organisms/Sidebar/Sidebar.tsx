import React, { Component } from 'react';

import './Sidebar.scss';

class Sidebar extends Component<{}, {}> {
  render() {
    return (
      <aside className="sidebar">
        <nav className="nav">{this.props.children}</nav>
      </aside>
    );
  }
}

export default Sidebar;
