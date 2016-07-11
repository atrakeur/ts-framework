import * as Express from "express";

/**
 * TS-Framework Request
 * Contains basic method for working with HTTP
 */
export class Request
{
    public constructor(public express: Express.Request) {}

    public params() {
        return this.express.params
    }
}