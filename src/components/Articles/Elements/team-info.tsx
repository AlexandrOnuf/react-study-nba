import * as React from 'react';
import {Team} from '../../../interfaces';
import '../articles.css';


const TeamInfo = (props: {team: Team}) => {
  
  return (
    <div className='articleTeamHeader'> 
      <div className='left' style={{
        background: `url(/images/teams/${props.team.logo})`
      }} />
      <div className='right'>
        <div>
          <span>{props.team.city} {props.team.name}</span>
        </div>
        <div>
          <strong>
            W{props.team.stats[0].wins}-L{props.team.stats[0].defeats}
          </strong>
        </div>
      </div>
    </div>
  )
}

export default TeamInfo;
