const csv = require('csv-parser');
const fs = require('fs');
let total = 0;
fs.createReadStream('studentRegistration.csv')
  .pipe(csv())
  .on('data', (row) => {
      if (row.id === '1234') {
          total += Number(row.credit);
      }
  })
  .on('end', () => {
    console.log(`Total credit hours: ${total}`);
  });