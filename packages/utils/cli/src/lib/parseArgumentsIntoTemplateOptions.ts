import arg from 'arg';
import { Schema } from '../types';
import { parseSchemaPropertySpecAndNames } from './parseSchemaPropertySpecAndNames';

export const parseArgumentsIntoTemplateOptions = (
  rawArgs: string[],
  schema: Schema,
) => {
  const { spec, propertyNames } = parseSchemaPropertySpecAndNames(schema);
  const args = arg(spec, {
    argv: rawArgs.slice(2),
    permissive: true,
  });

  const options = Object.assign(
    {},
    ...propertyNames.map((name) => {
      const obj: { [x: string]: string | number | undefined } = {};
      obj[name] = args['--' + name];
      return obj;
    }),
  );
  /**
   * {
   *  "name": nameArgs
   * }
   */

  return options;
};
