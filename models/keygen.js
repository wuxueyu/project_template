'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var KeygenSchema = new Schema({
    date: Number,
    seid: Number
});

Number.prototype.shift = function(bit) {
    return parseInt(this * (2 << bit));
};

function getSec() {
    return Date.parse(new Date()) / 1000 - 1420041600;
}

function getYmd() {
    return (new Date()).toISOString().slice(2, 10).replace(/-/g, '');
}

module.exports.extid = 17;

module.exports.issuePromise = function() {
    return mongoose.model('Keygen', KeygenSchema).findOneAndUpdate({ date: getYmd() }, { $inc: { seid: 1 } }, { new: true, upsert: true }).then(function(doc) {

        return getSec().shift(23) + exports.extid.shift(15) + parseInt(doc.seid % 65535);
    });
};


module.exports.issuePromiseBatch = function(num) {
    if (isNaN(num)) num = 1;
    return mongoose.model('Keygen', KeygenSchema).findOneAndUpdate({ date: getYmd() }, { $inc: { seid: num } }, { new: true, upsert: true }).then(function(doc) {

        let arr = [];
        for (let i = 0; i < num; i++) {
            arr.push(getSec().shift(23) + exports.extid.shift(15) + parseInt((doc.seid - i) % 65535));
        }

        return arr;
    });
};