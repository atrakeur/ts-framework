/// <reference path="../../../typings/main.d.ts" />

/**
 * Module dependencies.
 */
import * as assert from "assert";
import * as chai from "chai";
import * as http from "http";

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