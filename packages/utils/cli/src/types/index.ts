export type PropertyType = object | string | number | void;

export type PropertyTypeString = 'string' | 'number';

export interface Schema {
  id: string;
  path: string;
  outputPath: string;
  properties: {
    [x: string]: {
      type: PropertyTypeString;
      description?: string;
    };
  };
  install?: {
    dependencies: { [x: string]: PropertyType };
    targets: string[];
  }[];
  required?: string[];
  dependsOn: string[];
  [x: string]: PropertyType;
}
export interface Options {
  [x: string]: PropertyType | undefined;
}
