import {Controller, action} from "../../../ts-framework/Controller";
import {JsonResult} from "../../../ts-framework/View";
import {HttpController} from "../../../ts-framework/Controller/HttpController";

export class ShopController extends HttpController
{
    // GET: /shop
    @action() index()
    {
        this.content("Hello");
    }

    // GET: /shop/product/:id
    @action({
        'path': '/shop/product/:id',
        'method': ['GET']
    }) product()
    {
        this.json({
            "id": this.request.params().id || 0
        });
    }
}