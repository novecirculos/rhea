import * as ejs from 'ejs';
import { Options } from '../types';
import { Template } from '../lib/Template';
import { pascalCase, camelCase, kebabCase, snakeCase } from '../utils/strings';
import { join } from 'path';
import { dir, exists, find, read, write } from 'fs-jetpack';
import { runInstall } from './runInstall';
import { appendExportToIndex } from './appendExportToIndex';

export const generateFromTemplate = async (
  template: Template,
  options: Options,
) => {
  if (!options.name) throw new Error('No Name');
  // permutations of the name
  const pascalCaseName = pascalCase(options.name.toString());
  const kebabCaseName = kebabCase(options.name.toString());
  const snakeCaseName = snakeCase(options.name.toString());

  const camelCaseName = camelCase(options.name.toString());
  const pascalCaseParent = pascalCase(options.parent?.toString() as string);
  const kebabCaseParent = kebabCase(options.parent?.toString() as string);
  const snakeCaseParent = snakeCase(options.parent?.toString() as string);

  // passed into the template
  const props = {
    camelCaseName,
    kebabCaseName,
    pascalCaseName,
    pascalCaseParent,
    kebabCaseParent,
    snakeCaseName,
    snakeCaseParent,
    ...options,
  };

  const schema = await template.schema;
  // where are we copying from?
  const templateDir = join(__dirname, '../../../../../', schema.path);
  //  join(__dirname, '../../../../', schema.path);

  // find the files
  const files = find(templateDir);
  const packageDir = join(
    __dirname,
    '../../../../../',
    schema.outputPath
      .replace('PARENT-KEBAB', kebabCaseParent)
      .replace('PARENT', pascalCaseParent)
      .replace('NAME', kebabCaseName),
  );

  const destinationDir = schema.spread
    ? packageDir
    : join(packageDir, kebabCaseName);

  if (exists(destinationDir) && !schema.spread) {
    return;
  }

  // loop through the files
  const newFiles = files.map(async (templateFilename: string) => {
    // get the filename and replace `NAME` with the actual name
    // remove schema.path from path
    let filename = ('./' + templateFilename)
      .replace(schema.path, '')
      .replace('NAME', pascalCaseName);

    // strip the .ejs
    if (filename.endsWith('.ejs')) filename = filename.slice(0, -4);

    // read template file
    let templateContents = read(templateFilename);

    // render ejs
    if (templateFilename.endsWith('.ejs')) {
      templateContents = ejs.render(templateContents ?? '', {
        props: { ...props, filename },
      });
    }

    // where are we copying to?

    const destinationPath = join(destinationDir, filename);

    // ensure destination folder exists
    dir(destinationDir);
    // console.log(
    //   destinationPath,
    //   templateContents ? `\n${templateContents?.slice(0, 45)}...` : ''
    // );
    // write to the destination file
    if (filename.endsWith('index.ts')) {
      // if the file is index.ts, we need to merge the exports
      const existingContents = read(destinationPath);
      templateContents = existingContents
        ? existingContents + '\n' + templateContents
        : templateContents;
    }
    write(destinationPath, templateContents ?? '');
    await runInstall(schema, kebabCaseName, kebabCaseParent);
   
    if(template.name) {
      await appendExportToIndex(kebabCaseName, kebabCaseParent);
    }

    return destinationPath;
  });

  return newFiles;
};
