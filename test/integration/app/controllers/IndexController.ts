import {Controller} from "../../../../build/Controller";

export class IndexController extends Controller 
{
    public index() 
    {
        this.content('home');
    }
}