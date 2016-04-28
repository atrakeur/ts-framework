export interface IDatabaseDriver<T> {

    /**
     * Register query method WHERE
     * @param {} query
     * @return IDatabaseDriver<T>
     */
    where(query: {}) : IDatabaseDriver<T>;


    /**
     * Register query method WHERE
     * @param {} query
     * @return IDatabaseDriver<T>
     */
    order(query: {}) : IDatabaseDriver<T>;

    /**
     * Register query method WHERE
     * @param {} query
     * @return IDatabaseDriver<T>
     */
    skip(query: {}) : IDatabaseDriver<T>;

    /**
     * Register query method WHERE
     * @param {} query
     * @return IDatabaseDriver<T>
     */
    limit(query: {}) : IDatabaseDriver<T>;

    /**
     * Register query method WHERE
     * @param {IMultipleResultCallback<T>} callback
     */
    done(callback: IMultipleResultCallback<T>)
}