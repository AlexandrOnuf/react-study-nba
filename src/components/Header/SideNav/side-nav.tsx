import * as React from 'react';
import SideNav from 'react-simple-sidenav';

import SideNavItems from './side-nav-items';

import { HeaderProps } from 'interfaces';  // tslint:disable-line

const SideNavigation = (props: HeaderProps) => {
  return (
    <div>
      <SideNav
        showNav={props.showNav}
        onHideNav={props.onHideNav}
        navStyle={{
          background: '#242424',
          maxWidth: '220px'
        }}
      >
        <SideNavItems />
      </SideNav>
    </div>
  )
}


export default SideNavigation;