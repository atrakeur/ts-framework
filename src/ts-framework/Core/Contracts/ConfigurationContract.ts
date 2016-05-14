/**
 * Defines the contract interface for the configuration manager
 */
export interface ConfigurationContract {
    get(key: string): any;
    set(key: string, value: any);
}
