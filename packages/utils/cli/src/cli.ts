import { generateFromTemplate } from './core/generateFromTemplate';
import { Template } from './lib/Template';
import { findDefaultTemplate } from './lib/findDefaultTemplate';
import { getTemplateOptionsWithArgs } from './lib/getTemplateOptionsWithArgs';
import { parseArgumentsIntoOptions } from './lib/parseArgumentsIntoOptions';
import { Options, Schema } from './types';

export const cli = async (args: string[]) => {
  const options: Options = parseArgumentsIntoOptions(args);
  const template: Template = await findDefaultTemplate(options);

  let templateOptions: Options = await getTemplateOptionsWithArgs(
    template,
    args,
  );

  await generateFromTemplate(template, templateOptions);

  const templateSchema: Schema = await template.schema;
  const deps = templateSchema.dependsOn;
  if (deps) {
    for (let i = 0; i < deps.length; i++) {
      const template = new Template(deps[i]);
      templateOptions = await getTemplateOptionsWithArgs(
        template,
        args,
        templateOptions,
      );
      await generateFromTemplate(template, templateOptions);
    }
  }

  // Run yarn, run eslint
  const { exec } = await import('shelljs');
  await exec('yarn');
  await exec('yarn lint --fix');
};
