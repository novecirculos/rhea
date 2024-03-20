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
        return await findSchema(this.name);
    })();
  }
}
