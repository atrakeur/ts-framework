/**
 * TS-Framework DatabaseDriver
 * Contains method for oparation with WL Query
 * @parameter T
 */
export class DatabaseDriver<T> implements IDatabaseDriver<T> {

    /**
     * Register query method WHERE
     * @param {} query
     * @return IDatabaseDriver<T>
     */
    public where(query: {}) : IDatabaseDriver<T> {
        return new DatabaseDriver<T>();
    }

    /**
     * Register query method WHERE
     * @param {} query
     * @return IDatabaseDriver<T>
     */
    public order(query: {}) : IDatabaseDriver<T> {
        return new DatabaseDriver<T>();
    }

    /**
     * Register query method WHERE
     * @param {} query
     * @return IDatabaseDriver<T>
     */
    public skip(query: {}) : IDatabaseDriver<T> {
        return new DatabaseDriver<T>();
    }

    /**
     * Register query method WHERE
     * @param {} query
     * @return IDatabaseDriver<T>
     */
    public limit(query: {}) : IDatabaseDriver<T> {
        return new DatabaseDriver<T>();
    }

    /**
     * Register query method WHERE
     * @param {IMultipleResultCallback<T>} callback
     */
    public done(callback: IMultipleResultCallback<T>) {

    }
}