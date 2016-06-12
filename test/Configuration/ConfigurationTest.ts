import * as chai from "chai";
import {Configuration} from "../../build/Configuration/Configuration";
var expect = chai.expect;

describe('Configuration component:', () => {
    it('should have no value at start', function (done) {
        //Given
        var config = new Configuration();
        //When

        //Then
        expect(config.get("test-not-set-value")).to.be.undefined;
        done();
    });

    it('should keep values', function (done) {
        //Given
        var config = new Configuration();
        //When
        config.set("test-value-set", 16);
        //Then
        expect(config.get("test-value-set")).to.be.equals(16);
        done();
    });

    it('should act as a singleton', function (done) {
        //Given
        var config = new Configuration();
        config.set("test-unique-value", 16);
        //When
        config = new Configuration();
        //Then
        expect(config.get("test-unique-value")).to.be.equals(16);
        done();
    });
});