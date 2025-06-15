import { promises as fs } from 'fs'; // ✅ Replaces require('fs').promises
import path from 'path';             // ✅ Replaces require('path')

export async function initRepo() {
  const repoPath = path.resolve(process.cwd(), '.git');
  const commitsPath = path.join(repoPath, 'commits');

  try {
    await fs.mkdir(repoPath, { recursive: true });
    await fs.mkdir(commitsPath, { recursive: true });

    await fs.writeFile(
      path.join(repoPath, "config.json"),
      JSON.stringify({ bucket: process.env.S3_BUCKET || "default-bucket" })
    );

    console.log("Repository initialized successfully.");
  } catch (err) {
    console.error("Error initializing repository:", err);
  }
}
