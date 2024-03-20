import arg from 'arg';

export const parseArgumentsIntoOptions = (rawArgs: string[]) => {
  const args = arg(
    {
      '--template': String,
      // Aliases
      '--generate': '--template',
      '-g': '--template',
    },
    {
      argv: rawArgs,
      permissive: true,
    },
  );

  return {
    template: args['--template'] ?? args._[0],
  };
};
