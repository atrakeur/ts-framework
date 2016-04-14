import {Controller, action} from "../../../ts-framework/Controller";
import {Request, Response} from "../../../ts-framework/Http";

export class IndexController extends Controller
{
    // Path: /
    @action index(req: Request, res: Response)
    {
        // ...
    }
}