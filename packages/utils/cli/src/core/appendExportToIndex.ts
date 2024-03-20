import { promises as fs } from 'fs';
import { join } from 'path';
import { kebabCase } from '../utils/strings';

/**
 * Appends an export statement to the index.ts file in the specified parent folder.
 * @param name The original name to be converted to kebab-case and added to the export.
 * @param parentFolder The parent folder under dashboard/app where the index.ts file is located.
 */
export async function appendExportToIndex(name: string, parentFolder: string): Promise<void> {
  const kebabCaseName = kebabCase(name);
  const exportStatement = `export * from './${kebabCaseName}';\n`;

  const indexPath = join(__dirname, '../../../../../apps/dashboard/app/server/chains', parentFolder, 'index.ts');

  try {
    // Read the current content of the index.ts file
    let content = await fs.readFile(indexPath, { encoding: 'utf8' });

    // Append the new export statement
    content += exportStatement;

    // Write the updated content back to the index.ts file
    await fs.writeFile(indexPath, content, { encoding: 'utf8' });

    console.log(`Updated ${indexPath} with ${exportStatement}`);
  } catch (error) {
    console.error(`Failed to update ${indexPath}:`, error);
  }
}