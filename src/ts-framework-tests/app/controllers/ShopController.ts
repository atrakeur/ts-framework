import {Controller, action} from "../../../ts-framework/Controller";
import {Request, Response} from "../../../ts-framework/Http";

export class ShopController extends Controller
{
    // Path: /shop
    @action index(req: Request, res: Response)
    {
        // ...
    }

    // Path: /shop/product
    @action product(req: Request, res: Response)
    {
        // ...
    }
}