import { readdir } from 'fs-extra';
import { Options } from '../types';
import { join } from 'path';
import { Template } from './Template';
import inquirer from 'inquirer';

export const findDefaultTemplate: (
  options: Options,
) => Promise<Template> = async (options: Options) => {
  const result = String(options.template);
  const templates = await readdir(join(__dirname, '../../templates'));

  if (result && templates.includes(result)) {
    return new Template(result);
  }

  return await inquirer
    .prompt({
      type: 'list',
      name: 'template',
      message: 'Please select an existing template',
      choices: templates,
    })
    .then((a) => new Template(a.template));
};
