import {Model} from "../../../../build/Model";

export class User extends Model 
{
    name: string;
    email: string;
    age: number;

    static configure() 
    {
        this.validate('age', { required: false, min: 10 });
    }
}