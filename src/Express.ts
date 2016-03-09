declare module Express {
    export interface Request {
        params: {
            controller: string,
            action: string
        };
        param: Function;
        query: Function;
        body: Function;
    }
    export interface Response {
        send: Function;
        header: Function;
        redirect: Function;
        json: Function;
        sendfile: Function;
        attachment: Function;
        render: Function;
        status: Function;
        statusCode: number;
        get: Function;
        cookie: Function;
        clearCookie: Function;
        type: Function;
        links: Function;
        locals: Function;
    }
    export interface Application {
        get: Function;
        set: Function;
        route: any;
        listen: Function;
    }
}