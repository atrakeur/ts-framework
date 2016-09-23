import * as Express from "express";

/**
 * TS-Framework Request
 * Contains basic method for working with HTTP
 */
export class Request
{
    public constructor(public express: Express.Request) {}

    public post(name: string) {
        if (name == undefined) {
            return this.express.body;
        }

        return this.express.body[name];
    }

    public params() {
        return this.express.params
    }
}