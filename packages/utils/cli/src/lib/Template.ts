import { findSchema } from './findSchema';

export class Template {
  constructor(name: string) {
    this.name = name;
  }

  name: string;

  options: {
    [x: string]: string;
  } = {};

  get schema() {
    return (async () => {
      try {
        return await findSchema(this.name);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (e) {
        throw new Error('Could not find schema.json');
      }
    })();
  }
}
