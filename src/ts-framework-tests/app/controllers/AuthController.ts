import {Controller, action} from "../../../ts-framework/Controller";
import {Request, Response} from "../../../ts-framework/Http";
import {HttpController} from "../../../ts-framework/Controller/HttpController";

export class AuthController extends HttpController
{
    // GET: /auth
    @action({
        'path': '/auth',
        'method': ['GET']
    }) index()
    {
        return this.content("Auth");
    }

    // POST: /auth/login
    @action({
        'path': '/auth/login',
        'method': ['POST']
    }) login(username: string, password: string)
    {
        if (username === "foo" && password === "bar") {
            this.redirect("/success");
        } else {
            this.redirect("/error");
        }
    }

    // POST: /auth/logout
    @action() logout(token: string)
    {
        this.content("logout");
    }
}