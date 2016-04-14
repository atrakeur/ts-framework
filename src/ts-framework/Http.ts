/// <reference path="../../typings/main.d.ts" />

import * as Express from "express";
<<<<<<< HEAD
import { ICookieOption } from "./Cookie"; 

export class Request {
    //...   
}

export class Reply {
    //...   
}

export class Response {
  //..
}
=======
>>>>>>> 0ec4387b558e8f09db772e067daac29db77d93a3

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
<<<<<<< HEAD
=======
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
>>>>>>> 0ec4387b558e8f09db772e067daac29db77d93a3
}