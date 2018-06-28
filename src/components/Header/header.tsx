import * as React from 'react';
import { Link } from 'react-router-dom';
import './header.css';

import { SideNavigation } from 'components';  // tslint:disable-line
import { HeaderProps } from 'interfaces';  // tslint:disable-line

import * as FontAwasome from 'react-fontawesome';


const Header = (props: HeaderProps) => {

  const navBars = () => (
    <div className='bars'>
      <FontAwasome name='bars'
        onClick={props.onOpenNav}
        style={{
          color: '#dfdfdf',
          cursor: 'pointer',
          padding: '10px'
        }}
      />
    </div>
  )

  const logo = () => (
    <Link to='/' className='logo'>
      <img alt='nba logo' src='/images/nba_logo.png' />
    </Link>
  )

  return (
    <header className='header'>
      <SideNavigation {...props}/>
      <div className='headerOpt'>
        {navBars()}
        {logo()}
      </div>
    </header>
  )
}


export default Header;