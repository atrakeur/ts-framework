/// <reference path="../../typings/main.d.ts" />

import * as Express from "express";

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
    private response: Express.Response;
}

/** @todo What's actually the difference between Response and Reply? The name states they basically do the same thing */
export class Reply
{
    //...
}