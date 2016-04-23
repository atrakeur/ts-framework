import {Controller, action} from "../../../ts-framework/Controller";
import {Request, Response} from "../../../ts-framework/Http";

export class AuthController extends Controller
{
    // GET: /auth
    @action({
        'path': '/auth',
        'method': ['GET']
    }) index()
    {
        this.response.sendContent("Auth");
    }

    // POST: /auth/login
    @action({
        'path': '/auth/login',
        'method': ['POST']
    }) login(username: string, password: string)
    {
        if (username === "foo" && password === "bar") {
            this.response.redirect("/success");
        } else {
            this.response.redirect("/error");
        }
    }

    // POST: /auth/logout
    @action() logout(token: string)
    {
        this.response.sendContent("logout");
    }
}