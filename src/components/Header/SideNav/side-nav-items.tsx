import * as React from 'react';
import { Link } from 'react-router-dom';
import './side-nav.css';

import * as FontAwasome from 'react-fontawesome';


interface ListItemData {
  classes: string;
  icon: string;
  link: string;
  text: string;
}


const SideNavigationItems = () => {

  const items: ListItemData[] = [
    {
      classes: 'option',
      icon: 'home',
      link: '/',
      text: 'Home'
    },
    {
      classes: 'option',
      icon: 'file-alt',
      link: '/news',
      text: 'News'
    },
    {
      classes: 'option',
      icon: 'play',
      link: '/videos',
      text: 'Videos'
    },
    {
      classes: 'option',
      icon: 'sign-in-alt',
      link: '/sign-in',
      text: 'Sign in'
    },
    {
      classes: 'option',
      icon: 'sign-out-alt',
      link: '/sigh-out',
      text: 'SIgn out'
    }
  ]

  const showItems = () => {
    return items.map((item, i) => {
      return (
        <div key={i}>
          <div className={item.classes}>
            <Link to={item.link}>
                <FontAwasome name={item.icon} /> {item.text}
            </Link>
          </div>
        </div>
      )
    })
  }
  
  return (
    <div>
      {showItems()}
    </div>
  )
}

export default SideNavigationItems;