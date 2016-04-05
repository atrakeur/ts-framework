/// <reference path="TSFramework.ts" />

var _ = <_.LoDashStatic> require('lodash');
var fs = require('fs');
var path = require('path');
var deprecate: (message: string) => void = require('depd')('ts-framework');

var extend = function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};

module TS {
    export interface ICookieOption {
        domain?: string;
        path?: string;
        secure?: boolean;
        httpOnly?: boolean;
        expires?: Date;
        maxAge?: number;
        signed?: boolean;
    }
}