const fs = require('fs');
let data = fs.readFileSync('data.ts', 'utf8');

// The STUDY_ABROAD_DETAILED object starts at line 321 and ends around line 371
// We need to replace it with an import statement.

const startIdx = data.indexOf('export const STUDY_ABROAD_DETAILED = {');
const endIdx = data.indexOf('export const EXAMS_DETAILED = {');

if (startIdx !== -1 && endIdx !== -1) {
  const newData = data.substring(0, startIdx) + "export { STUDY_ABROAD_DETAILED } from './studyAbroad_Data.ts';\n\n" + data.substring(endIdx);
  fs.writeFileSync('data.ts', newData);
  console.log('Successfully updated data.ts');
} else {
  console.log('Could not find start or end index');
}
