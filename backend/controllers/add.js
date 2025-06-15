import { promises as fs } from 'fs';
import path from 'path';

export async function addRepo(filePath) {

  const repoPath = path.resolve(process.cwd(), ".git");
  const stagingPath = path.resolve(process.cwd(), '.git', 'staging');

  try {
    await fs.mkdir(stagingPath, { recursive: true });
    const fileName =path.basename(filePath);
    await fs.copyFile(filePath, path.join(stagingPath, fileName));
    console.log(` File "${fileName}" added to staging.`);
  } catch (err) {
    console.error(" Error adding file:", err.message);
  }
}
