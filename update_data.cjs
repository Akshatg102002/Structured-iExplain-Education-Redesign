const fs = require('fs');
let data = fs.readFileSync('data.ts', 'utf8');
const startIdx = data.indexOf('export const MBBS_ABROAD_DETAILED = {');
const endIdx = data.indexOf('export const EXAMS_DETAILED = {');

if (startIdx !== -1 && endIdx !== -1) {
  const newData = data.substring(0, startIdx) + "export { MBBS_ABROAD_DETAILED } from './mbbs_data.ts';\n\n" + data.substring(endIdx);
  fs.writeFileSync('data.ts', newData);
  console.log('Successfully updated data.ts');
} else {
  console.log('Could not find start or end index');
}
