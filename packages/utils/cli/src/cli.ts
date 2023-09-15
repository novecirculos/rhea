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
const { execSync } = require('child_process')

const pkg = require('../package.json')

export const main = async (argv: string[]) => {
  const context = {
    lernaVersion: pkg.dependencies['lerna'],
  }
  const args = arg(
    {
      '--dev-client': String,
      '--parallel': Boolean,
      '--app': String,
      '--package': String,
    },
    {
      argv,
      permissive: true,
    }
  )
  const devClient = args['--dev-client']

  if (argv[0] === 'build:app') {
    const appName = args['--app']
    if (!appName) {
      console.error('The --app argument is required for the build:app command')
      process.exit(1)
    }
    const command = `bunx turbo run build --filter={apps/${appName}}`
    execSync(command, { stdio: 'inherit' })
    return
  }

  if (argv[0] === 'build:package') {
    const packageName = args['--package']
    if (!packageName) {
      console.error(
        'The --package argument is required for the build:package command'
      )
      process.exit(1)
    }
    const command = `bunx turbo run build --filter={packages/${packageName}}`
    execSync(command, { stdio: 'inherit' })
    return
  }

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
