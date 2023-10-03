import { execSync } from 'child_process'

export const main = async (argv: string[]) => {
  if (argv[0] === 'build') {
    const appName = argv[1]

    if (!appName) {
      console.error('No app was provided')
      process.exit(1)
    }

    const command = `bunx turbo run build --filter={apps/${appName}}`
    execSync(command, { stdio: 'inherit' })
    return
  }

  if (argv[0] === 'dev') {
    const appName = argv[1]
    if (!appName) {
      console.error('No app was provided')
      process.exit(1)
    }
    const command = `bunx turbo run dev --filter={apps/${appName}}`
    execSync(command, { stdio: 'inherit' })
    return
  }

  console.error(`Unknown command: ${argv[0]}`)
}
