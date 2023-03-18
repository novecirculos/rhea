import arg from 'arg'

const addCmd = require('@lerna/add/command')
const bootstrapCmd = require('@lerna/bootstrap/command')
const changedCmd = require('@lerna/changed/command')
const cleanCmd = require('@lerna/clean/command')
const cli = require('@lerna/cli')
const createCmd = require('@lerna/create/command')
const diffCmd = require('@lerna/diff/command')
const execCmd = require('@lerna/exec/command')
const importCmd = require('@lerna/import/command')
const infoCmd = require('@lerna/info/command')
const initCmd = require('@lerna/init/command')
const linkCmd = require('@lerna/link/command')
const listCmd = require('@lerna/list/command')
const publishCmd = require('@lerna/publish/command')
const runCmd = require('@lerna/run/command')
const versionCmd = require('@lerna/version/command')

const pkg = require('../package.json')

export const main = async (argv: string[]) => {
  console.log('init')
  const context = {
    lernaVersion: pkg.dependencies['lerna'],
  }
  const args = arg(
    {
      '--dev-client': String,
      '--parallel': Boolean,
    },
    {
      argv,
      permissive: true,
    }
  )
  const devClient = args['--dev-client']

  const actionArg = devClient ? `dev-client-${devClient}` : argv[0]

  const scopeArg = '--scope=@novecirculos/' + (argv[1] ?? '*')

  const parallelArg = args['--parallel'] ? '--parallel' : null

  const modifiedArgv = [
    'run',
    actionArg,
    scopeArg,
    '--stream',
    ...(parallelArg ? [parallelArg] : []),
  ]

  const cliInstance = cli()
    .command(addCmd)
    .command(bootstrapCmd)
    .command(changedCmd)
    .command(cleanCmd)
    .command(createCmd)
    .command(diffCmd)
    .command(execCmd)
    .command(importCmd)
    .command(infoCmd)
    .command(initCmd)
    .command(linkCmd)
    .command(listCmd)
    .command(publishCmd)
    .command(runCmd)
    .command(versionCmd)

  return cliInstance.parse(modifiedArgv, context)
}
