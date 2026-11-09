import fs from "fs";
import path from "path";

const dataDir = path.join(process.cwd(), "data");

function ensureDirectoryExistence(filePath: string) {
  const dirname = path.dirname(filePath);
  if (!fs.existsSync(dirname)) {
    fs.mkdirSync(dirname, { recursive: true });
  }
}

export function readData<T>(fileName: string, fallback: T): T {
  try {
    const filePath = path.join(dataDir, fileName);
    if (!fs.existsSync(filePath)) {
      ensureDirectoryExistence(filePath);
      fs.writeFileSync(filePath, JSON.stringify(fallback, null, 2), "utf-8");
      return fallback;
    }
    const content = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(content) as T;
  } catch (error) {
    console.error(`Error reading ${fileName}:`, error);
    return fallback;
  }
}

export function writeData<T>(fileName: string, data: T): void {
  try {
    const filePath = path.join(dataDir, fileName);
    ensureDirectoryExistence(filePath);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
  } catch (error) {
    console.error(`Error writing ${fileName}:`, error);
  }
}
