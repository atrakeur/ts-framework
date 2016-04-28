import {Controller, action} from "../../../ts-framework/Controller";
import {JsonResult} from "../../../ts-framework/View";

export class ShopController extends Controller
{
    // GET: /shop
    @action() index()
    {
        this.response.sendContent("Hello");
    }

    // GET: /shop/product/:id
    @action() product(id: number)
    {
        return new JsonResult({
            "id": id || 0
        });
    }
}