import { Team } from '../../interfaces';

export default interface CardInfoProps {
  teams: Team[];
  team_id: number; 
  date?: Date | string;
}