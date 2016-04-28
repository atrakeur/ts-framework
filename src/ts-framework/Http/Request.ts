/// <reference path="../../../typings/main.d.ts" />

import * as Express from "express";

/**
 * TS-Framework Request
 * Contains basic method for working with HTTP
 */
export class Request
{
    public constructor(public express: Express.Request) {}
}