import {ServiceProviderContract } from "../Contracts/ServiceProviderContract";
import {Container, FactoryMethod} from "huject";
import {Application} from "./Application";
import {AutoLoader} from "./AutoLoader";


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
    public abstract start(container:Huject.Container);

}
