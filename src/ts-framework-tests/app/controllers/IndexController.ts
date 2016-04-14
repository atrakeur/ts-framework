import {Controller, action} from "../../../ts-framework/Controller";
import {Request, Response} from "../../../ts-framework/Http";

export class IndexController extends Controller
{
    // GET: /
    @action index()
    {
        // ...
    }
}