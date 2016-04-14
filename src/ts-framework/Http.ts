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


export class Request
{
    private request: Express.Request;
}


export class Response
{
    /**
     * Constructor for Response
     * @param {Express.Response} response
     */
    public constructor(private response: Express.Response) {}

    /**
     * Redirect a client to a given path/url
     * @param {string} path
     */
    public redirect(path: string)
    {
        this.response.redirect(path);
    }
}

/** @todo What's actually the difference between Response and Reply? The name states they basically do the same thing */
export class Reply
{
    //...
}