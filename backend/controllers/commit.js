import { promises as fs } from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

export async function commitRepo(argv) {
  const message = argv.message || "No commit message";

  const repoPath = path.resolve(process.cwd(), '.git');
  const stagingPath = path.join(repoPath, 'staging');
  const commitsPath = path.join(repoPath, 'commits');

  try {
    const stagedFiles = await fs.readdir(stagingPath);
    if (stagedFiles.length === 0) {
      console.log(" No files to commit.");
      return;
    }

    const commitId = uuidv4();
    const commitDir = path.join(commitsPath, commitId);
    await fs.mkdir(commitDir, { recursive: true });

   
    for (const file of stagedFiles) {
      await fs.copyFile(
        path.join(stagingPath, file),
        path.join(commitDir, file)
      );
    }


    await fs.writeFile(
      path.join(commitDir, 'commit.json'),
      JSON.stringify({ message, date: new Date().toISOString() }, null, 2)
    );

    console.log(` Commit ${commitId} created with message: "${message}"`);
  } catch (err) {
    console.error(" Commit failed:", err.message);
  }
}
