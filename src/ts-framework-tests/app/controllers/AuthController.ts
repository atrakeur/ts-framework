import {Controller, action} from "../../../ts-framework/Controller";
import {Request, Response} from "../../../ts-framework/Http";

export class AuthController extends Controller
{
    // Path /auth
    @action index(req: Request, res: Response)
    {
        // ...
    }

    // Path /auth/login
    @action login(req: Request, res: Response)
    {
        // ...
    }

    // Path /auth/logout
    @action logout(req: Request, res: Response)
    {
        // ...
    }
}