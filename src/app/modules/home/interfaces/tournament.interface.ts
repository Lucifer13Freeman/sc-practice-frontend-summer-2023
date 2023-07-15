export interface ITournament {
  sportType: string;
  date: Date;
  tourType: string;
  players: {
    city: string;
    school: string;
  };
  playersQuantity: number;
}
