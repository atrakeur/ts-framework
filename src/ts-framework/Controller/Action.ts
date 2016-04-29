import {RequestMethod} from "../Http/RequestMethod";

export class Action {
    public __proto__: any;
    public path: string;
    public method: Array<RequestMethod>;
}
