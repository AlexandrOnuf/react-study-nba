import * as React from 'react';
import * as FontAwesome from 'react-fontawesome';
import './card-info.css';

import { CardInfoProps, Team } from 'interfaces';  // tslint:disable-line

const CardInfo = (props: CardInfoProps) => {

  const teamName = (teams: Team[], teamID: number): string | undefined => {
    const data: Team | undefined = teams.find((item) => {
      return item.id === teamID
    });
    if (data) {
      return data.name
    }
  };

  return (
    <div className='cardNfo'>
      <span className='teamName'>
        {teamName(props.teams, props.team_id)}
      </span>
      <span className='date'>
        <FontAwesome name='clock' />
        {props.date}
      </span>
    </div>
  )
}
 
export default CardInfo;
