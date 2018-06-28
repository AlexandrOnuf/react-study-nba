import * as React from 'react';
import { Link } from 'react-router-dom';
import './buttons.css';

import { ButtonProps } from 'interfaces';  // tslint:disable-line

const Button = (props: ButtonProps) => {
  let template: JSX.Element = (<div>&nbsp;</div>);

  switch(props.type) {
    case('loadmore'):
      template = (
        <div className='blue_btn'
          onClick={props.loadMore}
        >
          {props.cta}
        </div>
      );
      break;
    case('LinkTo'):
      template = (
        <Link className='blue_btn' to={props.linkTo ? props.linkTo : '/'}>
          {props.cta}
        </Link>
    )
  }

  return (
    template
  )
}

export default Button;
