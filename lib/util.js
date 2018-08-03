const path = require('path');
const fs = require('fs-extra');

const LOADS = {};

/**
 * Loads the files in the specified directory
 *
 * @param {*} directory
 * @param {string} [rootDir=path.resolve(__dirname, '..')]
 * @returns
 */
const load = (directory, rootDir = path.resolve(__dirname, '..')) => {
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

module.exports = {
  load,
};
