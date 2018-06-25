import * as React from 'react';
import { Link } from 'react-router-dom';
// import { CSSTransition, TransitionGroup } from 'react-transition-group';

import axios from 'axios';

import { DB_HOST_URL } from '../../../config';
import { NewsListProps, NewsListState } from '../../../interfaces';
import './news-list.css';


export default class NewsList extends React.Component<NewsListProps, {}> {

  public readonly state: NewsListState = {
    amount: this.props.amount ? this.props.amount : 5, 
    end: this.calcAmountOfNews(),
    items: [],
    start: this.props.start ? this.props.start : 0,
  }

  public componentWillMount() {
    this.request(this.state.start, this.state.end);
  }

  public request(start: number, end: number) {
    axios.get(`${DB_HOST_URL}/articles?_start=${start}&_end=${end}`)
      .then( response => {
        if (response.data) {
          this.setState({
            items: [...this.state.items, ...response.data]
          });
        }
      })
  }

  public loadMore() {
    const newEnd = this.state.end + this.state.amount;
    this.request(this.state.end, newEnd)
    this.setState({
      end: newEnd,
      start: this.state.end
    });
  }

  public renderNews = () => {
    let template:  JSX.Element[] | null = null;
    
    switch (this.props.type) {
      case('card'):
        template = this.state.items.map( (item, i) => (
          <div key={i}>
            <div className='newslist_item'>
              <Link to={`/articles/${item.id}`} ><h2>{item.title}</h2></Link>
            </div>
          </div>
        ));
        break;
      default:
        template = null;
    }
    return (
      template
    )
  }

  public render() {
    return (
      <div>
        {this.renderNews()}
        <div onClick={() => this.loadMore()}>
          LOAD MORE
        </div>
      </div>
    )
  }

  private calcAmountOfNews() {
    if (this.props.start && this.props.amount) { 
        return this.props.start + this.props.amount
    } else if (this.props.start === undefined && this.props.amount !== undefined) {
      return this.props.amount
    } else if (this.props.start !== undefined && this.props.amount === undefined) {
      return this.props.start + 5
    }
    return 5; // функция написана так из-за неадекватной прихоти `typescript`
  }   
}
