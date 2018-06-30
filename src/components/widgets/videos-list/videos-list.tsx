import * as React from 'react';

/* tslint:disable */
import { Button } from 'components';
import { VideosListProps, VideosListState, Team, Video } from 'interfaces';
import VideosListTemplate from './videos-list-templates';
import { firebase, firebaseLooper, firebaseTeams, firebaseVideos } from 'firebase-config';
import './videos-list.css';
/* tslint:enable */


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
      firebaseTeams.once('value')
        .then((snapshot: firebase.database.DataSnapshot) => {
          const teams: Team[] = firebaseLooper(snapshot);
          this.setState({
            teams
          });
        })
        .catch((e) => {
          window.console.log(e);
        })
    }

    firebaseVideos.orderByChild('id').startAt(start).endAt(end).once('value')
      .then((snapshot: firebase.database.DataSnapshot) => {
        const videos: Video[] = firebaseLooper(snapshot);
        if (videos) {
          this.setState({
            end ,start,
            videos: [...this.state.videos, ...videos]
          });
        }
      })
      .catch((e) => {
        window.console.log(e);
      })
  }

  public loadMore() {
    const newEnd = this.state.end + this.state.amount;
    this.request(this.state.end + 1, newEnd) // +1 потому что поле id в базе данных начинаются с 0
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
