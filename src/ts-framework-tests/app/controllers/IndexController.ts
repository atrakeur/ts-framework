import {Request, Response, HttpController, action} from "../../../ts-framework/Http";
import {ContentResult} from "../../../ts-framework/View";
import {controller} from "../../../ts-framework/Controller/ControllerDecorator";

@controller()
export class IndexController extends HttpController
{
    // GET: /
    @action({path:'/'})
    public getIndex()
    {
        return this.view('welcome.ejs');
    }

    @action({path: '/download'})
    public getDownload()
    {
        return this.download('somefile.dat');
    }
}