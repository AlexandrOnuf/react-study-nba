interface Stats {
  wins: number;
  defeats: number;
}

export default interface Team {
  id: number;
  name: string;
  city: string;
  logo: string | URL;
  poll: boolean;
  count: number;
  descriptions: string;
  stats: Stats[];
  teamId: number | string;
}