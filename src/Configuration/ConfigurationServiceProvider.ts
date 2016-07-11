import {ServiceProvider} from "../Core/ServiceProvider";
import {Application} from "../Core/Application";
import {Configuration} from "./Configuration";
import FactoryMethod = Huject.FactoryMethod;
/**
 *
 */
export class ConfigurationServiceProvider extends ServiceProvider {

    boot(container:Huject.Container) {
        //Register default framework classes
        container.register("Configuration", Configuration).as(FactoryMethod.SINGLETON);
    }

    start(container:Huject.Container) {
        //Start any component that have to be started
        var configuration: Configuration = container.resolve("Configuration");
        configuration.load();
    }

}
