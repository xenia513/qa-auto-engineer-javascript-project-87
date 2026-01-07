const path = require('path');

module.exports = {
  'sonar.projectKey': 'your-project-key',
  'sonar.sources': 'src',
  'sonar.tests': 'src/__tests__',
  'sonar.test.inclusions': '**/*.test.js',
  'sonar.javascript.lcov.reportPaths': 'coverage/lcov.info',
  'sonar.sourceEncoding': 'UTF-8',
};
