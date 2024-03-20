export interface SampleInterface {
  prefix: string;
  suffix: string;
}

export interface SampleGenderInterface {
  Male: Record<number, SampleInterface>;
  Female: Record<number, SampleInterface>;
}
