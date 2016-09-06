import {ServiceProvider} from "../Core/ServiceProvider";
import {HttpServer} from "./HttpServer";
import {Application} from "../Core/Application";
import FactoryMethod = Huject.FactoryMethod;

/**
 * Bootstrap the http stack
 *
 * The Http stack is composed of an http server (express)
 * And a Router (route express requests to a given Class@method)
 * The Express Request and Responces are encapsulated in TSFW's Requests/Responces objects
 */
export class HttpServiceProvider extends ServiceProvider {

    boot(container:Huject.Container) {
        container.register("HttpServer", HttpServer).as(FactoryMethod.SINGLETON);
    }

    start(container:Huject.Container) {
        var httpServer: HttpServer = container.resolve("HttpServer");
        httpServer.start();
    }

}
