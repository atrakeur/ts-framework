import * as Express from "express";

/**
 * TS-Framework Request
 * Contains basic method for working with HTTP
 */
export class Request
{

    private getArray = {};
    private postArray = {};

    public get(name: string = undefined) {
        if (name == undefined) {
            return this.getArray;
        }

        return this.getArray[name];
    }

    public post(name: string = undefined) {
        if (name == undefined) {
            return this.postArray;
        }

        return this.postArray[name];
    }

    public setFromExpress(express: Express.Request) {
        this.getArray = express.params;
        this.postArray = express.body;
    }

    public setPost(data: any) {
        this.postArray = data;
    }

    public setGet(data: any) {
        this.getArray = data;
    }
}