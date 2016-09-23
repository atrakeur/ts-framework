import * as chai from "chai";
import {RouteEndpoint} from "../../build/Http/Router/Route";
var expect = chai.expect;

class DummyController {
}

describe('Http RouteEndpoint component:', () => {
    it('should toString correctly when given type', function (done) {
        //Given
        var endpoint = new RouteEndpoint();
        //When
        endpoint.controller = DummyController;
        endpoint.method = "testMethod";
        //Then
        expect(endpoint.toString()).to.be.equals("DummyController@testMethod");
        done();
    });

    it('should toString correctly when given instance', function (done) {
        //Given
        var endpoint = new RouteEndpoint();
        //When
        endpoint.controller = new DummyController();
        endpoint.method = "testMethod";
        //Then
        expect(endpoint.toString()).to.be.equals("DummyController@testMethod");
        done();
    });

    it('should toString correctly when given string', function (done) {
        //Given
        var endpoint = new RouteEndpoint();
        //When
        endpoint.controller = "DummyController";
        endpoint.method = "testMethod";
        //Then
        expect(endpoint.toString()).to.be.equals("DummyController@testMethod");
        done();
    });
});