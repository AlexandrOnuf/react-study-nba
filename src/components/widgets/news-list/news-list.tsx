import * as React from 'react';
import { Link } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import axios from 'axios';
/* tslint:disable */
import { Button, CardInfo } from '../../../components';
import { DB_HOST_URL } from '../../../config';
import { NewsListProps, NewsListState } from '../../../interfaces';
import './news-list.css';
/* tslint:enable */

export default class NewsList extends React.Component<NewsListProps, {}> {

  public readonly state: NewsListState = {
    amount: this.props.amount ? this.props.amount : 5, 
    end: this.calcAmountOfNews(),
    items: [],
    start: this.props.start ? this.props.start : 0,
    teams: []
  }

  public componentWillMount() {
    this.request(this.state.start, this.state.end);
  }

  public request(start: number, end: number) {
    if (this.state.teams.length < 1) {
      axios.get(`${DB_HOST_URL}/teams`)
        .then( response => {
          this.setState({
            teams: response.data
          });
        })
    }

    axios.get(`${DB_HOST_URL}/articles?_start=${start}&_end=${end}`)
      .then( response => {
        if (response.data) {
          this.setState({
            end,
            items: [...this.state.items, ...response.data],
            start
          });
        }
      })
  }

  public loadMore() {
    const newEnd = this.state.end + this.state.amount;
    this.request(this.state.end, newEnd)
  }

  public renderNews = () => {
    let template:  JSX.Element[] | JSX.Element = (<div>&nbsp;</div>);
    
    switch (this.props.type) {
      case('card'):
        template = this.state.items.map( (item, i) => (
          <CSSTransition
            classNames={{
               enter: 'newsList_wrapper',
               enterActive: 'newsList_wrapper_enter'
            }}
            timeout={500}
            key={i}
          >
            <div>
              <div className='newslist_item'>
                <Link to={`/articles/${item.id}`} >
                  <CardInfo teams={this.state.teams} 
                    team_id={item.team} date={item.date}
                  />
                  <h2>{item.title}</h2>
                </Link>
              </div>
            </div>
          </CSSTransition>
        ));
        break;
      default:
        template = (<div>&nbsp;</div>);
    }
    return (
      template
    )
  }

  public render() {
    return (
      <div>
        <TransitionGroup
          component='div'
          className='list'
        >
          {this.renderNews()}
        </TransitionGroup>
        <Button
          type='loadmore'
          loadMore={()=>this.loadMore()}
          cta='Load more news'
         />
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
