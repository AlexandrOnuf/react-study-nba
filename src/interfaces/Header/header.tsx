import { firebase } from 'firebase-config'; // tslint:disable-line
// import { RouteComponentProps } from 'react-router-dom';

export interface HeaderProps { // extends Partial<RouteComponentProps<any>>
  showNav: boolean;
  onHideNav: () => void;
  onOpenNav: () => void;
  user: firebase.User | null;
}