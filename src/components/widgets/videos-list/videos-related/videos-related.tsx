import { Video, Team } from 'interfaces'; // tslint:disable-line
import * as React from 'react';
import VideosListTemplate from '../videos-list-templates'; // tslint:disable-line
import '../videos-list.css';

interface Props {
  teams: Team[];
  related: Video[];
}

const VideosRelated = (props: Props) => {
    return (
    <div className='relatedWrapper'>
      <VideosListTemplate 
        data={props.related}
        teams={props.teams}
      />
    </div>
  );
}

export default VideosRelated;
