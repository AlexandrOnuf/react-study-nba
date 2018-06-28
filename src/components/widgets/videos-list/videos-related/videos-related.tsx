import { Video, Team } from 'interfaces'; // tslint:disable-line
import * as React from 'react';
import '../videos-list.css';

interface Props {
  teams: Team[];
  related: Video[];
}

const VideosRelated = (props: Props) => {
  window.console.log(props)
    return (
    // <div className='videoListItem_wrapper'>
    //   <div className='left' style={{
    //       background: `url(/images/videos/${item.image})`
    //     }} />
    //   <div className='right'>
    //     <CardInfo teams={this.props.teams} 
    //       team_id={item.id} date={item.date}
    //     />
    //     <h2>{item.title}</h2>
    //   </div>
    // </div>
    <div>
      related
    </div>
  );
}

export default VideosRelated;
