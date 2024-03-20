import { Options } from '../types';
import { Template } from './Template';
import { parseArgumentsIntoTemplateOptions } from './parseArgumentsIntoTemplateOptions';
import { promptForMissingOptions } from './promptForMissingOptions';

export const getTemplateOptionsWithArgs = async (
  template: Template,
  args: string[],
  opts?: Options,
) => {
  const templateSchema = await template.schema;
  // const templateRoot = join(__dirname,"../templates", template)
  let templateOptions = parseArgumentsIntoTemplateOptions(args, templateSchema);
  templateOptions = await promptForMissingOptions(
    { ...templateOptions, ...opts },
    templateSchema,
  );
  return templateOptions;
};
