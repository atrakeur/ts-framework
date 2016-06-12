/**
 * Defines the contract interface for the service providers
 * A service provider mission is to register component to the IoC, then start each components
 */
export interface ServiceProviderContract {
    /**
     * Called when booting the framework.
     * Here we must register every object to the dependency container
     * We must never use external dependencies because we can't be sure they are registered at this point (use start instead)
     * @param container
     */
    boot(container:Huject.Container);

    /**
     * Called when starting the application
     * Here we must start every thing the service need to work
     * We can use external dependencies because we are sure they are all registered to the container
     * @param app
     */
    start(container:Huject.Container);
}

