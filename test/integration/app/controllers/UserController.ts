import {Controller} from "../../../../build/Controller";
import {User} from "../models/User";

export class UserController extends Controller
{
    static configure() 
    {
        this.model = User;
    }
}