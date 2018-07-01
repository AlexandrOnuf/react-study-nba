import * as React from 'react';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import './side-nav.css';

import { firebase } from 'firebase-config'; // tslint:disable-line
import { HeaderProps } from 'interfaces'; // tslint:disable-line
import * as FontAwasome from 'react-fontawesome';


interface ListItemData {
  classes: string;
  icon: string;
  link: string;
  login: boolean | string;
  text: string;
}


const SideNavigationItems = (props: RouteComponentProps<{}> & HeaderProps) => {

  const items: ListItemData[] = [
    {
      classes: 'option',
      icon: 'home',
      link: '/',
      login: '',
      text: 'Home',
    },
    {
      classes: 'option',
      icon: 'file-alt',
      link: '/news',
      login: '',
      text: 'News'
    },
    {
      classes: 'option',
      icon: 'play',
      link: '/videos',
      login: '',
      text: 'Videos'
    },
    {
      classes: 'option',
      icon: 'sign-in-alt',
      link: '/dashboard',
      login: false,
      text: 'Dashboard'
    },
    {
      classes: 'option',
      icon: 'sign-in-alt',
      link: '/sign-in',
      login: true,
      text: 'Sign in'
    },
    {
      classes: 'option',
      icon: 'sign-out-alt',
      link: '/sign-out',
      login: false,
      text: 'SIgn out'
    }
  ];

  const element = (item: ListItemData, i: number): JSX.Element => (
    <div key={i}>
      <div className={item.classes}>
        <Link to={item.link}>
            <FontAwasome name={item.icon} /> {item.text}
        </Link>
      </div>
    </div>
  );

  const restricted = (item: ListItemData, i: number): JSX.Element => {
    let template = <div key={i} />;

    if (props.user === null && item.login) {
      template = element(item, i);
    }
    if (props.user !== null && !item.login) {
      item.link === '/sign-out' ? 
        template = (
          <div key={i}
              className={item.classes}
              onClick={() => {
                firebase.auth().signOut()
                  .then(() => {
                    props.history!.push('/'); 
                  })
              }}
          >
            <FontAwasome name={item.icon} /> {item.text}
          </div>
        )
      :
        template = element(item, i);
    }

    return template;
  }

  const showItems = (): JSX.Element[] => {
    return items.map((item, i) => {
      return item.login !== '' ?
        restricted(item, i)
      :
        element(item, i)
    })
  }
  
  return (
    <div>
      {showItems()}
    </div>
  )
}

export default withRouter(SideNavigationItems);