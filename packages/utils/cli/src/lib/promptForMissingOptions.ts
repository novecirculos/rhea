import inquirer, { Question } from 'inquirer';
import { PropertyType, Schema } from '../types';
import { getRequiredOptions } from './getRequiredOptions';
import { mapSchemaTypeToInquirer } from './mapSchemaTypeToInquirer';

export const promptForMissingOptions = async (
  options: { [x: string]: PropertyType },
  schema: Schema,
) => {
  const questions: Question[] = [];

  const required = getRequiredOptions(schema);

  for (let i = 0; i < required.length; i++) {
    if (!options[required[i]]) {
      const requiredProperty = schema.properties[required[i]];
      questions.push({
        ...requiredProperty,
        type: mapSchemaTypeToInquirer(requiredProperty.type),
        message: requiredProperty.description,
        name: required[i],
      });
    }
  }

  const answers = await inquirer.prompt(questions);

  return {
    ...options,
    ...answers,
  };
};
