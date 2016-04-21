import {Controller} from "../../../ts-framework/Controller";
import {action, required} from "../../../ts-framework/DecoratorController";
import {JsonResult} from "../../../ts-framework/ActionResult";

export class ShopController extends Controller
{
    // GET: /shop
    @action() index()
    {
        this.response.sendContent("Hello");
    }

    // GET: /shop/product/:id
    @action() product(@required id: number)
    {
        return new JsonResult({
            "id": id || 0
        });
    }
}