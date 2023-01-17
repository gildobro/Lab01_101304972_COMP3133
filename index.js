const csv = require('csv-parser');
const fs = require('fs');

const input_countries = 'input_countries.csv';
const canada = 'canada.txt';
const usa = 'usa.txt';


// Delete canada.txt and usa.txt if already exist
fs.unlink(canada, (err) => {
    if (err) throw err;

});

fs.unlink(usa, (err) => {
    if (err) throw err;
})




// create a write stream for the output file
const writeStreamCanada = fs.createWriteStream(canada);
// create a read stream for the input file
fs.createReadStream(input_countries)
    .pipe(csv())
    .on('data', (row) => {
        // if row name is Canada
        if(row['country'] === 'Canada'){
            //write filtered data to the canada.txt file
            writeStreamCanada.write(`${row['country']},${row['year']},${row['population']}\n`)
        }
    })
    .on('end', () => {
        console.log(`Data filtered and written to ${canada}`);
        writeStreamCanada.end();
    });


// create a write stream for the output file
const writeStreamUs = fs.createWriteStream(usa);
// create a read stream for the input file
fs.createReadStream(input_countries)
    .pipe(csv())
    .on('data', (row) => {
        // if row name is United States
        if(row['country'] === 'United States'){
            //write filtered data to the usa.txt file
            writeStreamUs.write(`${row['country']},${row['year']},${row['population']}\n`)
        }
    })
    .on('end', () => {
        console.log(`Data filtered and written to ${usa}`);
        writeStreamUs.end();
    });



fs.createReadStream('canada.txt')
    .on('data', (row) => {
        console.log(row.toString());
    })
    .on('end', () => {
        console.log('canada.txt file successfully read');
    })
 

fs.createReadStream(usa)
    .pipe(csv())
    .on('data', (row) => {
        console.log(row.toString());
    })
    .on('end', () => {
        console.log('usa.txt file successfully read');
    })
