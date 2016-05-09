import Container = Huject.Container;
import {Application} from "./Application";
import {Configuration} from "./Configuration";
import {Router} from "../Router/Router";
import {ServiceProviderContract } from "./Contracts/ServiceProviderContract";
import FactoryMethod = Huject.FactoryMethod;


export abstract class ServiceProvider implements ServiceProviderContract {

    /**
     * Boot the service
     * Here the service must register every component it provides to the injection container
     * @param container
     */
    public abstract boot(container: Container);

    /**
     * Start the application
     * Here the service must start any component it provides to the application
     * @param app
     * @param container
     */
    public abstract start(app: Application, container:Huject.Container);

}

/**
 * Defines the base service provider
 *
 * Basically register all TSFW related classes
 */
export class TSFWServiceProvider extends ServiceProvider {

    boot(container:Huject.Container) {
        //Register default framework classes
        container.register("Configuration", Configuration).as(FactoryMethod.SINGLETON);
        container.register("Router", Router).as(FactoryMethod.SINGLETON);
    }

    start(app:Application, container:Huject.Container) {
        //Start any component that have to be started
    }

}