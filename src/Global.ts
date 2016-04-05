/// <reference path="../typings/lodash/lodash.d.ts" />

export const _ = <_.LoDashStatic> require('lodash');
export const fs = require('fs');
export const path = require('path');
export const deprecate: (message: string) => void = require('depd')('ts-framework');

export function extend(d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};