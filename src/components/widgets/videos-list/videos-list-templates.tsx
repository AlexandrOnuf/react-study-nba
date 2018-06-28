import * as React from 'react';
import { Link } from 'react-router-dom';
import './videos-list.css';

import { CardInfo } from '../../../components';
import { Team, Video } from '../../../interfaces';

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
            }}> 
            <div/> {/* div used for make sizes for video and display play icon over video */}
          </div>
          <div className='right'>
            <CardInfo teams={this.props.teams} 
              team_id={item.id} date={item.date}
            />
            <h2>{item.title}</h2>
          </div>
        </div>
      </Link>
    ))
  }
  
};

export default VideosListTemplate;
