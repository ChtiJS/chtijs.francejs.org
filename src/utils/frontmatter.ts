import { join as pathJoin } from "path";
import { readFile, readdir } from "fs";
import { promisify } from "util";
import fm from "front-matter";
import type { FrontMatterResult } from "front-matter";

export async function readPaths(
  dirPath: string
): Promise<string[]> {
  return await promisify(readdir)(dirPath);
}

export async function readEntry<T>(
  filePath: string
): Promise<FrontMatterResult<T>> {
  const content = await promisify(readFile)(filePath, "utf-8");

  return fm(content);
}

export async function readEntries<T>(
  dirPath: string
): Promise<FrontMatterResult<T>[]> {
  const files = await readPaths(dirPath);

  return await Promise.all(
    files.map((file) => readEntry<T>(pathJoin(dirPath, file)))
  );
}
