import {Controller} from "../../../../build/Controller";
import {Products} from "../models/Products";

export class ProductsController extends Controller
{
    static configure() 
    {
        this.model = Products;
    }
}