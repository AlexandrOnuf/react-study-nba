import * as React from 'react';
import { Link } from 'react-router-dom';
import './videos-list.css';

import { CardInfo } from 'components'; // tslint:disable-line
import { Team, Video } from 'interfaces'; // tslint:disable-line

interface Props {
  data: Video[]; 
  teams: Team[];
}

class VideosListTemplate extends React.PureComponent<Props> {
  public render() {
    return this.props.data.map( (item, i) => (
      <Link to={`/videos/${item.id}`} key={i}>
        <div className='videoListItem_wrapper'>
          <div className='left' style={{
              background: `url(/images/videos/${item.image})`
            }}> <div/> 
          </div>
          <div className='right'>
            <CardInfo teams={this.props.teams} 
              team_id={item.team!} date={item.date}
            />
            <h2>{item.title}</h2>
          </div>
        </div>
      </Link>
    ))
  }
  
};

export default VideosListTemplate;
