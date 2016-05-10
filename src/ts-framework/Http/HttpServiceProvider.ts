import {ServiceProvider} from "../Core/ServiceProvider";
import {HttpServer} from "./HttpServer";
import {Application} from "../Core/Application";
import FactoryMethod = Huject.FactoryMethod;
import {Router} from "./Router/Router";

export class HttpServiceProvider extends ServiceProvider {

    boot(container:Huject.Container) {
        container.register("HttpServer", HttpServer).as(FactoryMethod.SINGLETON);
        container.register("Router", Router).as(FactoryMethod.SINGLETON);
    }

    start(app:Application, container:Huject.Container) {
        var httpServer: HttpServer = container.resolve("HttpServer");
        httpServer.start();
    }

}
