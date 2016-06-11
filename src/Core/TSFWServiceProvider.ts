import {FactoryMethod} from 'huject';
import {ServiceProvider} from "./ServiceProvider";
import {AutoLoader} from "./AutoLoader";
import {Application} from "./Application";
import {Debug} from "./Debug";
/**
 * Defines the base service provider
 *
 * Basically register all TSFW related classes
 */
export class TSFWServiceProvider extends ServiceProvider {

    boot(container:Huject.Container) {
        //Register default framework classes
        container.register("Container", container);
        container.register("Debug", Debug);
    }

    start(app:Application, container:Huject.Container) {
        //Start any component that have to be started
    }

}
