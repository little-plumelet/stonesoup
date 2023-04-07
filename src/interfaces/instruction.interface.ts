export interface IStep {
  number: number;
  step: string;
}

export interface Iinstrctions {
  name: string;
  steps: IStep[];
}
