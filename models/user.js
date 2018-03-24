'use strict';
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Code = require('../lib/error_code');
const SALT_WORK_FACTOR = 9; // the bcrypt for nodejs package's default is 10, which takes longer while being safer
const Promise = require("bluebird");
Promise.promisifyAll(bcrypt);

var UserSchema = new mongoose.Schema({
    user_name: {
        type: String,
        required: [true, 'user_name is required'],
        index: true
    },
    phone: {
        type: String,
        required: [true, 'phone is required'],
        index: {
            unique: true
        }
    },
    password: {

        type: String,
        required: [true, 'password is required'],

    },
    created_at: Number,
    updated_at: Number
}, {
    minimize: false
});

UserSchema.set('toJSON', {
    getters: true,
    virtuals: false,
    transform: function(doc, ret, options) {
        delete ret.__v;
        delete ret.password
    }
});

UserSchema.pre('save', async function(next) {
    let user = this;

    // update creation and updating timestamp
    this.updated_at = new Date().getTime();

    this.created_at = new Date().getTime();
    // processing password to hash
    if (user.password === undefined || user.password === null) return next();

    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);
            user.password = hash;
            next();
        });
    });
});

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
    if (typeof this.private_data.password !== 'string') { return cb(null, false) };
    bcrypt.compare(candidatePassword, this.private_data.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

UserSchema.methods.inner_comparePassword = function(candidatePassword) {
    return new Promise((resolve, reject) => {
        if (typeof this.private_data.password !== 'string') { return resolve(false) }
        bcrypt.compare(candidatePassword, this.private_data.password, function(err, isMatch) {
            if (err) return reject(err);
            return resolve(isMatch);
        });
    });
};

UserSchema.methods.comparePasswordPromise = function(candidatePassword) {
    return bcrypt.compareAsync(candidatePassword, this.private_data.password);
};

module.exports = mongoose.model('User', UserSchema);