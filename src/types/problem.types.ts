export type Difficulty = 'EASY' | 'MEDIUM' | 'HARD';

export default interface ProblemInterface {
  title: string;
  description: string;
  difficulty: Difficulty;
  answer: string;
  input: string;
  points: number;
  bannerUrl?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
  resolved?: number;
  submissions?: number;
  archived?: boolean; 
  fixed?: boolean; 
}
