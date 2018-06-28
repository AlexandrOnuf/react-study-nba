import * as React from 'react';
// import { Link } from 'react-router-dom';

import axios from 'axios';

import { Button } from '../../../components';
import { DB_HOST_URL } from '../../../config';
import { VideosListProps, VideosListState } from '../../../interfaces';
import VideosListTemplate from './videos-list-templates';
import './videos-list.css';


export default class VideosList extends React.Component<VideosListProps> {

  public readonly state: VideosListState = {
    amount: this.props.amount ? this.props.amount : 5, 
    end: this.calcAmountOfNews(),
    start: this.props.start ? this.props.start : 0,
    teams: [],
    videos: []
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

    axios.get(`${DB_HOST_URL}/videos?_start=${start}&_end=${end}`)
      .then( response => {
        if (response.data) {
          this.setState({
            videos: [...this.state.videos, ...response.data]
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

  public renderButton = (): JSX.Element => {
    return this.props.loadmore ? 
      <Button type='loadmore'
        loadMore={() => this.loadMore()}
        cta='Load more Videos'
      />
      : 
      <Button type='LinkTo' cta='More Videos' linkTo='/videos' />
  }

  public renderTitle = (): JSX.Element | null => {
    return this.props.title ? 
      <h3><strong>NBA</strong> Videos</h3>
    : null
  }

  public renderVideos = () => {
    let template: JSX.Element[] | JSX.Element = [];
    
    switch (this.props.type) {
      case('card'):
        template = <VideosListTemplate 
                        data={this.state.videos}
                        teams={this.state.teams}
                    />
        break;
    }
    return template
    
  }

  public render() {
    return (
      <div className='videoList_wrapper'>
        {this.renderTitle()}
        {this.renderVideos()}
        {this.renderButton()}
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
