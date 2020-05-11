// const fs = require('fs');
// const path = require('path');

// function readAndWrite(fileToRead, fileToWrite, callback) {
//   fs.exists(fileToRead, exists => {
//     if (exists) {
//       console.log(`Reading from ${fileToRead}`);
//       fs.readFile(fileToRead, (err, content) => {
//         if (err) {
//           callback(err);
//         } else {
//           fs.exists(path.dirname(fileToWrite), exists => {
//             if (!exists) {
//               fs.mkdir(path.dirname(fileToWrite), err => {
//                 if (err) {
//                   callback(err);
//                 } else {
//                   fs.writeFile(fileToWrite, content, err => {
//                     if (err) {
//                       callback(err);
//                     } else {
//                       callback(null, fileToWrite, true);
//                     }
//                   });
//                 }
//               });
//             } else {
//               fs.writeFile(fileToWrite, content, err => {
//                 if (err) {
//                   callback(err);
//                 } else {
//                   callback(null, fileToWrite, true);
//                 }
//               });
//             }
//           })
//         }
//       });
//     } else {
//       callback(null, fileToRead, false);
//     }
//   });
// }

// const fileToRead = process.argv[2];
// const fileToWrite = process.argv[3];

// readAndWrite(fileToRead, fileToWrite, (err, filename, copied) => {
//   if (err) {
//     console.log(err);
//   } else if (copied) {
//     console.log(`Completed the copying of "${filename}"`);
//   } else {
//     console.log(`"${filename}" doesn't exist`);
//   }
// });

// ///////////Plain js
// const fs = require('fs');
// const path = require('path');

// function writeFile(file, content, cb) {
//   fs.writeFile(file, content, (error) => {
//     if (error) {
//       return cb(error);
//     }

//     cb(null, file, true);
//   });
// }

// function readAndWrite(fileToRead, fileToWrite, callback) {
//   fs.exists(fileToRead, exists => {
//     if (!exists) {
//       return callback(null, fileToRead, false);
//     }

//     console.log(`Reading from ${fileToRead}`);
//     fs.readFile(fileToRead, (err, content) => {
//       if (err) {
//         return callback(err);
//       }

//       fs.exists(path.dirname(fileToWrite), (exists) => {
//         if (!exists) {
//           return fs.mkdir(path.dirname(fileToWrite), (err) => {
//             if (err) {
//               return callback(err);
//             }

//             writeFile(fileToWrite, content, callback);
//           });
//         }

//         writeFile(fileToWrite, content, callback);
//       })
//     });
//   });
// }

// const fileToRead = process.argv[2];
// const fileToWrite = process.argv[3];

// readAndWrite(fileToRead, fileToWrite, (err, filename, copied) => {
//   if (err) {
//     return console.log(err);
//   }

//   return copied
//     ? console.log(`Completed the copying of "${filename}"`)
//     : console.log(`"${filename}" doesn't exist`);
// });

// /////////////Promises
// const fs = require('fs');
// const path = require('path');

// function writeFile(resolve, reject, fileToWrite, content) {
//   fs.writeFile(fileToWrite, content, err => {
//     if (err) {
//       reject(err);
//     }

//     resolve(fileToWrite);
//   });
// }

// function readAndWrite(fileToRead, fileToWrite) {
//   return new Promise((resolve, reject) => {
//     fs.exists(fileToRead, (exists) => {
//       exists
//         ? resolve([fileToRead, fileToWrite])
//         : reject(`"${fileToRead}" doesn't exist`);
//     });
//   });
// }

// function readingFile(fileToRead, fileToWrite) {
//   console.log(`Reading from ${fileToRead}`);

//   return new Promise((resolve, reject) => {
//     fs.readFile(fileToRead, (err, content) => {
//       if (err) {
//         reject(err);
//       }

//       resolve([fileToWrite, content]);
//     });
//   });
// }

// function writingFile(fileToWrite, content) {
//   return new Promise((resolve, reject) => {
//     fs.exists(path.dirname(fileToWrite), (exists) => {
//       if (!exists) {
//         fs.mkdir(path.dirname(fileToWrite), (err) => {
//           if (err) {
//             reject(err);
//           }

//           writeFile(resolve, reject, fileToWrite, content);
//         });
//       }

//       writeFile(resolve, reject, fileToWrite, content);
//     });
//   });
// }

// const fileToRead = process.argv[2];
// const fileToWrite = process.argv[3];

// readAndWrite(fileToRead, fileToWrite)
//   .then(([fileToRead, fileToWrite]) => readingFile(fileToRead, fileToWrite))
//   .then(([fileToWrite, content]) => writingFile(fileToWrite, content))
//   .then((filename) => console.log(`Completed the copying of "${filename}"`))
//   .catch((err) => console.log(err));

// ///////////Async/Await
// const fs = require('fs');
// const path = require('path');

// async function writeFile(fileToWrite, content) {
//   fs.writeFile(fileToWrite, content, (err) => {
//     if (err) {
//       throw err;
//     }
//   });

//   return fileToWrite;
// }

// async function readAndWrite(fileToRead, fileToWrite) {
//   fs.exists(fileToRead, (exists) => {
//     try {
//       if (!exists) {
//         throw `"${fileToRead}" doesn't exist`;
//       }
//     } catch (err) {
//       console.log(err);
//       return;
//     }
//   });

//   return [fileToRead, fileToWrite];
// }

// async function readingFile(fileToRead, fileToWrite) {
//   let readingContent;

//   console.log(`Reading from ${fileToRead}`);
//   await fs.readFile(fileToRead, (err, content) => {
//     if (err) {
//       throw err;
//     }

//     readingContent = content;
//   });

//   return [fileToWrite, readingContent]
// }

// async function writingFile(fileToWrite, content) {
//   await fs.exists(path.dirname(fileToWrite), (exists) => {
//     if (!exists) {
//       fs.mkdir(path.dirname(fileToWrite), (err) => {
//         if (err) {
//           throw err;
//         }

//         writeFile(fileToWrite, content);
//       });
//     } else {
//       writeFile(fileToWrite, content);
//     }
//   });

//   return fileToWrite;
// }

// const fileToRead = process.argv[2];
// const fileToWrite = process.argv[3];

// readAndWrite(fileToRead, fileToWrite)
//   .then(([fileToRead, fileToWrite]) => readingFile(fileToRead, fileToWrite))
//   .then(([fileToWrite, content]) => writingFile(fileToWrite, content))
//   .then((filename) => console.log(`Completed the copying of "${filename}"`))
//   .catch((err) => console.log(err));

// ///////////Read and write streams
// const fs = require('fs');

// const fileToRead = process.argv[2];
// const fileToWrite = process.argv[3];
// const readStream = fs.createReadStream(fileToRead);
// const writeStream = fs.createWriteStream(fileToWrite);

// readStream.pipe(writeStream);

// readStream.on('error', (err) => console.log(err));
// writeStream.on('error', (err) => console.log(err));

// readStream.on('data', () => console.log(`Reading from ${fileToRead}`));
// writeStream.on('finish', () => console.log(`Completed the copying of "${fileToWrite}"`));