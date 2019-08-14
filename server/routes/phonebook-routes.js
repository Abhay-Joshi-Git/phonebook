const featureRootPath = 'phone-book';
let phoneBookRecords = [];
const _ = require("lodash");
const uuidv4 = require('uuid/v4');

function getRecordById(id) {
    return _.find(phoneBookRecords, { id })
}

function getRecordByNumber(phoneNumber) {
    return _.find(phoneBookRecords, { phoneNumber })
}

function editRecord(id, item) {
    var record = getRecordById(id);
    if (record) {
        _.assign(record, { ...item, id });
    }
}

function addRecord(item) {
    phoneBookRecords = [
        ...phoneBookRecords,
        item
    ]
}

function getNewId() {
    return uuidv4();
}

function removeRecord(id) {
    phoneBookRecords = _.reject(phoneBookRecords, (item) => item.id === id);
}

module.exports = (app) => {
    app.get(`/${featureRootPath}`, (req, res) => {
        res.send(phoneBookRecords);
    });

    app.put(`/${featureRootPath}/:id`, (req, res) => {
        const id = req.params.id;
        console.log(' in ....', id, phoneBookRecords);
        const item = getRecordById(id);
        if (item) {
            editRecord(id, req.body);
            res.send("ok");
        } else {
            res.status(400).send("record not found");
        }
    });

    app.delete(`/${featureRootPath}/:id`, (req, res) => {
        const id = req.params.id;
        var item = getRecordById(id);
        if (item) {
            removeRecord(id);
            res.send(item);
        } else {
            res.status(400).send("record not found");
        }
    });

    app.post(`/${featureRootPath}`, (req, res) => {
        let newItem = {
            name: req.body.name,
            phoneNumber: req.body.phoneNumber
        };
        console.log('post -- ', req.body);
        if (!getRecordByNumber(newItem.name)) {
            newItem = {
                ...newItem,
                id: getNewId()
            };
            addRecord(newItem);
            res.send(newItem);
        } else {
            res.status(400).send("record already exists");
        }
    });

}
