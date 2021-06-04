//TO RUN THIS FILE AND WRITE DATA TO THE NEW FILE:
//pull up your terminal in VS Code and type node roundup.js
//this should run the code and create a new file called 'resultFile.csv'.

const csv = require('csv-parser');
//we added this csv-writer to be able to write the data to a file
const createCsvWriter = require('csv-writer').createObjectCsvWriter; 
//we added the fs to work with the file system 
const fs = require('fs');

//this block of code formats the csv file we're creating
const csvWriter = createCsvWriter({ 
  //this is what the file will be named 
  path: 'resultFile.csv',
  //the code below defines the headers of the csv file, meaning the first row of the file that names the values below it
  /*  Like this:
  ----------------------------
  id,firstName,lastName,    <-------- these are the headers
  1234,Shanna,Ginos         <-------- this is the student data
  ----------------------------
  */
  header: [
    {id: 'id', title: 'id'},
    {id: 'firstName', title: 'firstName'},
    {id: 'lastName', title: 'lastName'},
    {id: 'credit', title: 'Total Credit'},
    {id: 'tuition', title: 'tuition'},
  ]
});

//we defined these variables so we can use them to write to the csv file
let id, firstName, lastName, credit, tuition;

fs.createReadStream('studentRegistration.csv')
  .pipe(csv())
  .on('data', (row) => {
      if (row.id === '1234') {
        //this is setting the variables we declared above to the values found in the studentRegistration.csv file
          id = row.id;
          firstName = row.firstName;
          lastName = row.lastName;
          credit += Number(row.credit);

      }
  })
  .on('end', () => {
    //this is some logic I was working on to determine the status of the student (part time/full time). it's not being used anywhere yet.
    let status;
    if (credit >= 12) {
      status = 'Full Time';
    } else if (credit < 12) {
      status = 'Part Time';
    }
    //this is the actual information that will be written to the new file. it has to be in a data structure (we put it in an object) because that's how the csvWriter works.
    let report = {
      //we grabbed an id from the studentRegistration.csv so that the first and last name and credit would populate with the corresponding id
      id: 1234,
      //here we're using the variables we declared on lines 28-31 to fill the values in this object
      firstName: firstName,
      lastName: lastName,
      //for some reason the credit variable isn't working, so it's listing as NaN in the new file. I'll try to fix that later.
      credit: credit,
      //this number is just a random number, the tuition hasn't actually been calculated yet
      tuition: 350
    };
    //we had to put the object 'report' (declared on line 44) in square brackets inside of this function. I'm not clear as to why, that's just how this function needs its parameters put in
    csvWriter.writeRecords([report]).then(() => {
      console.log('..DONE');
    });
    console.log(`Complete`);
  });