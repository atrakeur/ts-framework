import * as chai from "chai";
import {RouteBuilder} from "../../build/Http/Index";
var expect = chai.expect;

describe('Http RouteBuilder component:', () => {
    it('should have path and method value at start', function (done) {
        //Given
        var routeBuilder = new RouteBuilder("/lala", ["GET"]);
        //When

        //Then
        expect(routeBuilder.getRoute().path).to.be.equals("/lala");
        expect(routeBuilder.getRoute().methods).to.be.deep.equal(["GET"]);
        done();
    });

    it('should return always the same route', function (done) {
        //Given
        var routeBuilder = new RouteBuilder("/lala", ["GET"]);
        var route = routeBuilder.getRoute();
        //When
        routeBuilder.toAction("test1@test1");
        //Then
        expect(routeBuilder.getRoute()).to.be.equals(route);
        done();
    });

    it('should assign controller correctly', function (done) {
        //Given
        var routeBuilder = new RouteBuilder("/lala", ["GET"]);
        var route = routeBuilder.getRoute();
        //When
        routeBuilder.toAction("test0@test1");
        //Then
        expect(routeBuilder.getRoute().controller.controller).to.be.equals("test0");
        done();
    });
});