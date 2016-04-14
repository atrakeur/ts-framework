/// <reference path="../../typings/main.d.ts" />

import * as Express from "express";
import { ICookieOption } from "./Cookie";

/**
 * TS-Framework INoResultCallback<T>
 * Callback for no result
 */
export interface INoResultCallback<T>
{
    (err: Error);
}

/**
 * TS-Framework ISingleResultCallback<T>
 * Callback for generic model
 */
export interface ISingleResultCallback<T>
{
    (err: Error, model: T); 
}

/**
 * TS-Framework IMultipleResultCallback<T>
 * Callback for collection of models
 */
export interface IMultipleResultCallback<T>
{
    (err: Error, models: T[]); 
}

/**
 * TS-Framework Request
 * Contains basic method for working with HTTP
 */
export class Request
{
    public constructor(public express: Express.Response) {}
}

/**
 * TS-Framework Response
 * Contains basic method for working with HTTP
 */
export class Response
{
    /**
     * Constructor for Response
     * @param {Express.Response} response
     */
    public constructor(public express: Express.Response) {}

    /**
     * Constructor for Response
     * @param {number} code
     * @return {Express.Response}
     */
    public setStatus(code: number): Response {
        this.express.status(code);
        return this;
    }

    /**
     * Get Response status     
     * @return {number}
     */
    public getStatus(): number {
        return this.express.statusCode;
    }

    /**
     * Set Response header
     * @param {string} filed
     * @param {string} value
     * @return {Express.Response}
     */
    public setHeader(field: string, value: string): Response {
        this.express.header(field, value);
        return this;
    }

    /**
     * Get Response header
     * @param {string} filed     
     * @return {string}
     */
    public getHeader(field: string): string {
        return this.express.get(field);
    }

    /**
     * Set Cookie
     * @param {string} name
     * @param {string} value
     * @param {ICookieOption?} options     
     * @return {Response}
     */
    public setCookie(name: string, value: string, options?: ICookieOption): Response {
        this.express.cookie(name, value, options);
        return this;
    }

    /**
     * Remove cookie
     * @param {string} name
     * @param {string} path     
     * @return {Response}
     */
    public removeCookie(name: string, path: string = '/'): Response {
        this.express.clearCookie(name, { path: path });
        return this;
    }
    
    /**
     * Set content type of Response
     * @param {string} value          
     * @return {Response}
     */
    public setContentType(value: string): Response {
        this.express.type(value);
        return this;
    }

    /**
     * Set Response Links
     * @param {} value          
     * @return {Response}
     */
    public setLinks(links: {}): Response {
        this.express.links(links);
        return this;
    }

    /**
     * Set Response Local
     * @param {string} name
     * @param {any} value          
     * @return {Response}
     */
    public setLocal(name: string, value: any): Response {
        this.express.locals[name] = value;
        return this;
    }

    /**
     * Get Response Local     
     * @param {any} name          
     * @return {Response}
     */
    public getLocal(name: string): any {
        return this.express.locals[name];
    }
}