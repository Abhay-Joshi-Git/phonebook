const featureRootPath = 'phone-book';
// { name: string;  phoneNumbers: number[] }
let phoneBookRecords = [];
const _ = require("lodash");

const notValidRecordErrorMessage = 'request phone number is not of valid structure';

function getRecordByName(name) {
    return _.find(phoneBookRecords, { name });
}

function isNumberPresentInRecords(phoneNumber) {
    return _.find(phoneBookRecords, (item) =>  item.phoneNumbers.includes(phoneNumber) );
}

function getRecordByNumbers(numbers) {
    return _.find(phoneBookRecords, (item) =>  {
        const commonNumbers = _.intersection(item.phoneNumbers, numbers);
        return commonNumbers && commonNumbers.length
    })
}

function isRecordValid(item) {
    return item && !!item.name && (item.phoneNumbers && Array.isArray(item.phoneNumbers));
}

function editRecord(name, item) {
    const index = phoneBookRecords.findIndex((item) => item.name === name);
    if (index > -1) {
        phoneBookRecords = [
            phoneBookRecords.slice(0, index),
            item,
            phoneBookRecords.slice(index + 1, phoneBookRecords.length)
        ]
    }
}

function addRecord(item) {
    phoneBookRecords = [
        ...phoneBookRecords,
        item
    ];
}

function removeRecord(name) {
    phoneBookRecords = _.reject(phoneBookRecords, (item) => item.name === name);
}

module.exports = (app) => {
    app.get(`/${featureRootPath}`, (req, res) => {
        res.send(phoneBookRecords);
    });

    app.put(`/${featureRootPath}/:name`, (req, res) => {
        const name = req.params.name;
        console.log(' in ....', name, phoneBookRecords);
        const item = getRecordByName(name);
        if (item) {
            if (!isRecordValid(req.body)) {
                res.status(400).send(notValidRecordErrorMessage);
                return;
            }
            editRecord(name, req.body);
            res.send("ok");
        } else {
            res.status(400).send("record not found");
        }
    });

    app.delete(`/${featureRootPath}/:name`, (req, res) => {
        const name = req.params.name;
        var item = getRecordByName(name);
        if (item) {
            removeRecord(name);
            res.send(item);
        } else {
            res.status(400).send("record not found");
        }
    });

    app.post(`/${featureRootPath}`, (req, res) => {
        const newItem = {
            name: req.body.name,
            phoneNumbers: req.body.phoneNumbers
        };
        console.log('post -- ', newItem);
        if (!getRecordByNumbers(newItem.phoneNumbers)) {
            if (!isRecordValid(newItem)) {
                res.status(400).send(notValidRecordErrorMessage);
                return;
            }
            addRecord(newItem);
            res.send(newItem);
        } else {
            res.status(400).send("record already exists");
        }
    });

}
