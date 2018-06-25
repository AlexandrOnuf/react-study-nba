import * as React from 'react';
import './layout.css';

import { Footer, Header } from '../../components';
import { LayoutState } from '../../interfaces';


class Layout extends React.Component<{}, LayoutState> {
  
  public readonly state = {
    showNav: false
  }

  public toggleSideNav = (action: boolean) => {
    this.setState({
      showNav: action
    });
  }

  public render() {
    return (
      <div>
        <Header
          showNav={this.state.showNav}
          onHideNav={() => this.toggleSideNav(false)}
          onOpenNav={() => this.toggleSideNav(true)}
        />
        {this.props.children}
        <Footer />
      </div>
    )
  }
}

export default Layout;