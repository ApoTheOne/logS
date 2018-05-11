const fs = require('fs');
const eol = require('os').EOL;
const errorIdentifier = ': Error: ';
var logData = '';

const readStream = fs.createReadStream(
    `C:\\Users\\username\\Desktop\\logs\\Log-2018-05-02.txt`,
    'utf8'
);

readStream
    .on('data', dataChunk => {
        logData += dataChunk;
    })
    .on('end', () => {
        formatData(logData);
    })
    .on('error', error => {
        console.log(error);
    });

function processFile(logData) {
    const arrayByEOLs = logData.split('/r/n');
    var arrayOfLogs;
    var startOfLog = 0;
    var endOfLog = 0;
    for (i = 0; i < arrayByEOLs.length; i++) {
        const indexOfError = arrayfromEOLs[i].indexOf(errorIdentifier);
        if (indexOfError && !startOfLog) {
            startOfLog = i;
            endOfLog = 0;
        } else if (indexOfError && startOfLog) {
            endOfLog = i;
            addLogToArray(startOfLog, endOfLog);
        }
    }
}

function addLogToArray(startOfLog, endOfLog) {
    for (j = startOfLog; j < endOfLog; j++) {}
}

function formatData(logData) {
    const logs = [];
    const arrayByEOLs = logData.split(eol);
    var startIndex = 0;
    var endIndex = 0;
    var logString = '';
    var logTime = '';
    arrayByEOLs.reduce(function(
        previousVal,
        currentVal,
        currentIndex,
        arrayByEOLs
    ) {
        const errorIdentifierIndex = currentVal.indexOf(errorIdentifier);
        if (errorIdentifierIndex > 0) {
            if (startIndex !== 0) {
                logs.push({ time: logTime, error: logString });
                logString = currentVal;
                startIndex = currentIndex;
                endIndex = 0;
            } else if (startIndex === 0) {
                logTime = currentVal.substring(0, errorIdentifierIndex);
                logString =
                    logString +
                    eol +
                    currentVal.substring(errorIdentifierIndex + 2);
                startIndex = currentIndex;
            }
        } else {
            logString = logString + eol + currentVal;
        }
    },
    []);
}

function processData(logData) {
    var logs = [];
    const arrayByEOLs = logData.split(eol);
    var startIndex = 0;
    var endIndex = 0;
    var log = '';
    var logString = '';
    arrayByEOLs.reduce(function(
        previousVal,
        currentVal,
        currentIndex,
        arrayByEOLs
    ) {
        if (currentVal.indexOf(errorIdentifier) > 0) {
            if (startIndex !== 0) {
                logs.push(logString);
                logString = currentVal;
                startIndex = currentIndex;
                endIndex = 0;
            } else if (startIndex === 0) {
                logString = logString + eol + currentVal;
                startIndex = currentIndex;
            }
        } else {
            logString = logString + eol + currentVal;
        }
    },
    []);
}
