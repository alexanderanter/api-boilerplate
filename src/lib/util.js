import path from 'path';
import fs from 'fs-extra';

const LOADS = {};
export const load = (directory, rootDir = path.resolve(__dirname, '..')) => {
  directory = path.resolve(rootDir, directory);
  if (LOADS[directory]) {
    return LOADS[directory];
  }
  const obj = {};
  if (fs.existsSync(directory)) {
    const files = fs.readdirSync(directory);
    files.forEach(item => {
      if (path.extname(item) === '.js') {
        // eslint-disable-next-line
        obj[path.basename(item, '.js')] = require(path.resolve(
          directory,
          item,
        ));
      }
    });
  }
  LOADS[directory] = obj;
  return obj;
};

// Just to shut up the lint prefer default
// eslint-disable-next-line
export const test = name => console.log(name);
