import * as React from 'react';

import { ArticleHeaderProps, Team } from 'interfaces';  // tslint:disable-line

import TeamInfo from '../../Elements/team-info';


const Header = (props: ArticleHeaderProps) => {

  const renderTeamInfo = (team: Team | null) => {
    return team ? (
      <TeamInfo team={team}/>
    ) : null
  };
  
  return (
    <div> 
      {renderTeamInfo(props.teamData)}
    </div>
  )
}

export default Header;
