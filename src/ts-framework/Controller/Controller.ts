/**
 * TS-Framework application
 * Defines a base controller: ie some code that is called to handle a given request
 */
export class Controller
{
    /**
     * TypeScript won't recognise 'prototype' on classes
     * This is a hack to get around it, don't ask me why.
     */
    public __proto__: any;

    /**
     * Parameters Decorator Action
     */
    public decorate: Object;

}