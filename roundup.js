const csv = require('csv-parser');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;  
const fs = require('fs');

let tuitionData;

const csvWriter = createCsvWriter({  
  path: 'resultFile.csv',
  header: [
    {id: 'id', title: 'id'},
    {id: 'firstName', title: 'firstName'},
    {id: 'lastName', title: 'lastName'},
    {id: 'credit', title: 'Total Credit'},
    {id: 'tuition', title: 'tuition'},
  ]
});

let id, firstName, lastName, credit, tuition;

fs.createReadStream('studentRegistration.csv')
  .pipe(csv())
  .on('data', (row) => {
      if (row.id === '1234') {
          id = row.id;
          firstName = row.firstName;
          lastName = row.lastName;
          credit += Number(row.credit);

      }
  })
  .on('end', () => {
    let status;
    if (credit >= 12) {
      status = 'Full Time';
    } else if (credit < 12) {
      status = 'Part Time';
    }
    let report = {
      id: 1234,
      firstName: firstName,
      lastName: lastName,
      credit: Number(credit),
      tuition: 350
    };
    csvWriter.writeRecords([report]).then(() => {
      console.log('..DONE');
    });
    console.log(`Complete`);
  });