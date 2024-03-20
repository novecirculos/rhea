import { join } from 'path';
import { PropertyType, Schema } from '../types';
import { read, write } from 'fs-jetpack';

export const runInstall = async (
  schema: Schema,
  name: string,
  parentName: string,
) => {
  const installList = schema.install;
  if (!installList) return;
  installList.map((installItem) => {
    const { dependencies, targets } = installItem;
    // load each target file
    const modifiedFiles = targets.map((targetPathString) => {
      const targetPath = join(
        __dirname,
        '../../../../../',
        targetPathString
          .replace('PARENT-KEBAB', parentName)
          .replace('NAME', name),
      );
      const target: { devDependencies: string[]; dependencies: string[] } =
        read(targetPath, 'json');
      const parsedDepsArray = Object.keys(dependencies).map((key) => {
        const object: { [x: string]: PropertyType } = {};
        const parsedKey = key;
        object[
          parsedKey.replace('PARENT-KEBAB', parentName).replace('NAME', name)
        ] = dependencies[key];
        return object;
      });
      const parsedDeps = Object.assign({}, ...parsedDepsArray);
      target.dependencies = { ...target.dependencies, ...parsedDeps };
      write(targetPath, target);
      return targetPath;
    });
    // eslint-disable-next-line no-console
    console.log(modifiedFiles);
  });
};
