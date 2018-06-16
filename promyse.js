"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let id = 0;
class Promyse {
    constructor(fn) {
        this.state = 'pending';
        this.value = null;
        this.resolutions = [];
        this.rejections = [];
        this.id = id++;
        fn(v => {
            if (this.state !== 'pending') {
                throw new Error('promise was not pending.');
            }
            this.state = 'resolved';
            this.value = v;
            if (this.resolutions.length < 1) {
                return;
            }
            setTimeout(() => {
                while (this.resolutions.length > 0) {
                    this.resolutions.shift()(this.value);
                }
            }, 0);
        }, e => {
            if (this.state !== 'pending') {
                throw new Error('promise was not pending.');
            }
            this.state = 'rejected';
            this.value = e;
            setTimeout(() => {
                if (this.rejections.length < 1) {
                    throw new Error('promise was rejected but there are no handlers for id => ' + this.id + e);
                }
                while (this.rejections.length > 0) {
                    this.rejections.shift()(this.value);
                }
            }, 0);
        });
    }
    then(a, b) {
        return new Promyse((resolve, reject) => {
            if (a && this.state === 'resolved') {
                try {
                    return Promise.resolve(a(this.value))
                        .then(resolve, reject);
                }
                catch (err) {
                    return reject(err);
                }
            }
            if (b && this.state === 'rejected') {
                try {
                    return Promise.reject(b(this.value))
                        .then(resolve, reject);
                }
                catch (err) {
                    return reject(err);
                }
            }
            a && this.resolutions.push(function (v) {
                try {
                    return Promyse.resolve(a(v)).then(resolve, reject);
                }
                catch (err) {
                    return reject(err);
                }
            });
            b && this.rejections.push(function (e) {
                try {
                    return Promyse.reject(b(e)).then(resolve, reject);
                }
                catch (err) {
                    return reject(err);
                }
            });
        });
    }
    catch(a) {
        return new Promyse((resolve, reject) => {
            if (a) {
                console.log('adding catch block rejection handler to id:', this.id);
                this.rejections.push(reject);
            }
        });
    }
    static resolve(v) {
        return new Promyse(resolve => {
            if (!(v && typeof v.then === 'function')) {
                return resolve(v);
            }
            v.then(v => resolve(v));
        });
    }
    static reject(v) {
        return new Promyse((resolve, reject) => {
            if (!(v && typeof v.then === 'function')) {
                return reject(v);
            }
            v.then(v => reject(v));
        });
    }
}
exports.Promyse = Promyse;
