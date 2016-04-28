/// <reference path="../../../typings/main.d.ts" />

/**
 * Module dependencies.
 */
import assert = require('assert');
import chai = require('chai');
import http = require('http');

/**
 * Globals
 */

var expect = chai.expect;

/**
 * Unit tests
 */
describe('Test application homepage:', () => {
    it('should return 200', function (done) {
        http.get('http://localhost:3000', function (res) {
            assert.equal(200, res.statusCode);
            done();
        });
    });
});