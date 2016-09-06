import {ServiceProvider} from "../Core/Index";
import {Router} from "./Router";
import FactoryMethod = Huject.FactoryMethod;

/**
 * Bootstrap the routing module
 * A router is a component that direct requests to controllers
 */
export class RouterServiceProvider extends ServiceProvider {

    boot(container:Huject.Container) {
        container.register("Router", Router).as(FactoryMethod.SINGLETON);
    }

    start(container:Huject.Container) {

    }

}