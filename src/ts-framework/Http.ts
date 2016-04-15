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
     * @param {Express.Response} rawResponse
     */
    public constructor(private rawResponse: Express.Response) {}

    /**
     * Constructor for Response
     * @param {number} code
     * @return {Response}
     */
    public setStatus(code: number): Response
    {
        this.rawResponse.status(code);
        return this;
    }

    /**
     * Get Response status     
     * @return {number}
     */
    public getStatus(): number
    {
        return this.rawResponse.statusCode;
    }

    /**
     * Set Response header
     * @param {string} field
     * @param {string} value
     * @return {Response}
     */
    public setHeader(field: string, value: string): Response
    {
        this.rawResponse.header(field, value);
        return this;
    }

    /**
     * Get Response header
     * @param {string} field
     * @return {string}
     */
    public getHeader(field: string): string
    {
        return this.rawResponse.get(field);
    }

    /**
     * Set Cookie
     * @param {string} name
     * @param {string} value
     * @param {ICookieOption?} options     
     * @return {Response}
     */
    public setCookie(name: string, value: string, options?: ICookieOption): Response
    {
        this.rawResponse.cookie(name, value, options);
        return this;
    }

    /**
     * Remove cookie
     * @param {string} name
     * @param {string} path     
     * @return {Response}
     */
    public removeCookie(name: string, path: string = '/'): Response
    {
        this.rawResponse.clearCookie(name, { path: path });
        return this;
    }
    
    /**
     * Set content type of Response
     * @param {string} value          
     * @return {Response}
     */
    public setContentType(value: string): Response
    {
        this.rawResponse.type(value);
        return this;
    }

    /**
     * Set Response Links
     * @param {Object} links
     * @return {Response}
     */
    public setLinks(links: {}): Response
    {
        this.rawResponse.links(links);
        return this;
    }

    /**
     * Set Response Local
     * @param {string} name
     * @param {any} value          
     * @return {Response}
     */
    public setLocal(name: string, value: any): Response
    {
        this.rawResponse.locals[name] = value;
        return this;
    }

    /**
     * Get Response Local     
     * @param {any} name          
     * @return {Response}
     */
    public getLocal(name: string): any
    {
        return this.rawResponse.locals[name];
    }

    /**
     * Wrapper for the Express.Request#send() method
     * @param {string} content
     * @returns {Response}
     */
    public sendContent(content: string): Response
    {
        this.rawResponse.send(content);
        return this;
    }

    /**
     * Send a response of serialized JSON data
     * @param {any} content
     * @returns {Response}
     */
    public sendJson(content: any): Response
    {
        this.rawResponse.json(content);
        return this;
    }

    /**
     * Read a file and send it to the client
     * @param {string} path
     * @returns {Response}
     */
    public sendFile(path: string): Response
    {
        this.rawResponse.sendFile(path);
        return this;
    }

    /**
     * Set the attachment name of a download
     * @param {string} path
     * @param {string} name
     * @returns {Response}
     */
    public sendDownload(path: string, name?: string): Response
    {
        this.rawResponse.download(path, name);
        return this;
    }

    /**
     * Render a view
     * @param {string} view
     * @param {Object} options
     * @returns {Response}
     */
    public sendView(view: string, options?: Object): Response
    {
        this.rawResponse.render(view, options);
        return this;
    }

    /**
     * Send a redirect response to the client
     * @param {string} url
     * @param {number} status
     * @returns {Response}
     */
    public redirect(url: string, status: number = 302): Response
    {
        this.rawResponse.redirect(url, status);
        return this;
    }

    /**
     * Gets the raw express response
     * @returns {Express.Response}
     */
    public getRawResponse(): Express.Response
    {
        return this.rawResponse;
    }
}