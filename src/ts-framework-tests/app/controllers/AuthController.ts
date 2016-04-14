import {Controller, action} from "../../../ts-framework/Controller";
import {Request, Response} from "../../../ts-framework/Http";

export class AuthController extends Controller
{
    // GET: /auth
    @action index()
    {
        // ...
    }

    // POST: /auth/login
    @action login(username: string, password: string)
    {
        if (username === "foo" && password === "bar") {
            this.response.redirect("/success");
        } else {
            this.response.redirect("/error");
        }
    }

    // POST: /auth/logout
    @action logout(token: string)
    {
        // ...
    }
}