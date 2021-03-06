import * as React from 'react';

import { ArticleHeaderProps, Team } from 'interfaces'; // tslint:disable-line

import PostData from '../../Elements/post-data';
import TeamInfo from '../../Elements/team-info';


const Header = (props: ArticleHeaderProps) => {

  const renderTeamInfo = (team: Team | null) => {
    return team ? (
      <TeamInfo team={team}/>
    ) : null
  };

  const renderPostData = (date: string | Date, author: string) => (
    <PostData data={{date, author}} />
  )
  
  return (
    <div> 
      {renderTeamInfo(props.teamData)}
      {renderPostData(props.date, props.author)}
    </div>
  )
}

export default Header;
