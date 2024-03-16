import { readJson } from 'fs-extra';
import { join } from 'path';

export const findSchema = async (template: string) => {
  const path: string = join(
    __dirname,
    '../../templates',
    template,
    'schema.json',
  );
  const schema = await readJson(path);
  return schema;
};
