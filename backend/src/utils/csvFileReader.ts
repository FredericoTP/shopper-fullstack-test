import * as fs from 'fs';
import csvParser from 'csv-parser';

function csvFilereader(file: File) {
  const data = [];

  fs.createReadStream(file).pipe(csvParser());
}
