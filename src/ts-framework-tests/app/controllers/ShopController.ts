import {Controller, action} from "../../../ts-framework/Controller";
import {Request, Response} from "../../../ts-framework/Http";

export class ShopController extends Controller
{
    // GET: /shop
    @action index()
    {
        // ...
    }

    // GET: /shop/product/:id
    @action product(id: number)
    {
        // ...
    }
}