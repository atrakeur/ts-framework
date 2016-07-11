/**
 * Defines the contract interface for the configuration manager
 */
export interface ConfigurationContract {

    /**
     * return the value associated with a key
     * @param key
     */
    get(key: string): any;

    /**
     * Set a value associated with a key
     * @param key
     * @param value
     */
    set(key: string, value: any);
}
