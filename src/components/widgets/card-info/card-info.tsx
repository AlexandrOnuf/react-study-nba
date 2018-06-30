import moment from 'moment';
import * as React from 'react';
import * as FontAwesome from 'react-fontawesome';
import './card-info.css';

import { CardInfoProps, Team } from 'interfaces';  // tslint:disable-line

const CardInfo = (props: CardInfoProps) => {

  const teamName = (teams: Team[], teamID: number): string | undefined => {
    const data: Team | undefined = teams.find((item) => {
      return item.teamId === teamID
    });
    if (data) {
      return data.name
    }
  };
  
  const formatDate = (): string => {
    return moment(props.date).format(' MM-DD-YYYY')
  };

  return (
    <div className='cardNfo'>
      <span className='teamName'>
        {teamName(props.teams, props.team_id)}
      </span>
      <span className='date'>
        <FontAwesome name='clock' />
        {formatDate()}
      </span>
    </div>
  )
}
 
export default CardInfo;
