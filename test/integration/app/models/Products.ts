import {Model} from "../../../../build/Model";

export class Products extends Model 
{
    name: string;
    price: number
    stock: number;

    static configure() 
    {
        this.validate('name', { required: true });
        this.validate('price', { required: true, min: 0 });
        this.validate('stock', { required: true, min: 0});
    }
}