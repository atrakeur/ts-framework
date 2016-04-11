import * as Express from "express";

import {Model} from "./Model";
import {Reply} from "./Reply";
import {Request} from "./Request";
import {Response} from "./Response";
import {IActionResult} from "./Result";
import {IConfigurable} from "./Configuration";

export interface IFilterAction {
    (context: IActionFilterContext): void;
}

export interface IActionFilterContext {
    request: Request;
    response: Response;
    reply: Reply;
    next: () => void;
    result?: IActionResult;
}

export interface IActionFilter {
    before?(context: IActionFilterContext): void;
    after?(context: IActionFilterContext): void;
}

export class ActionFilter implements IActionFilter {
    private includeList: string[] = [];
    private excludeList: string[] = [];

    contains(action: string) {
        if (this.includeList.length > 0 && this.excludeList.length > 0)
            throw new Error('Action filter includes and excludes cannot be both specified!');

        if (this.includeList.length > 0 && !_.includes(this.includeList, action)) return false;
        if (this.excludeList.length > 0 && _.includes(this.excludeList, action)) return false;
        return true;
    }

    only(...includes: string[]): ActionFilter {
        this.includeList.push.apply(this.includeList, includes);
        return this;
    }

    except(...excludes: string[]): ActionFilter {
        this.excludeList.push.apply(this.excludeList, excludes);
        return this;
    }
}

export class Controller extends Reply implements IConfigurable {
    static filters: any[];
    static model: any = null;

    constructor(public request: Request, public response: Response, send: (IActionResult) => void) {
        super(send);
    }

    static addBeforeFilter(action: IFilterAction): ActionFilter {
        var filter = new ActionFilter();
        filter['before'] = action;
        this.filters = this.filters || [];
        this.filters.push(filter);
        return filter;
    }

    static addAfterFilter(action: IFilterAction): ActionFilter {
        var filter = new ActionFilter();
        filter['after'] = action;
        this.filters = this.filters || [];
        this.filters.push(filter);
        return filter;
    }

    static addFilter(filterType: any): ActionFilter {
        var filter = new filterType();
        this.filters = this.filters || [];
        this.filters.push(filter);
        return filter;
    }
    
    /**
     * Placeholder configure method
     * @returns {void}
     */
    public configure() : void {} 
}

export class ModelController extends Controller {
    constructor(request: Request, response: Response, send: (IActionResult) => void, public _model: any) {
        super(request, response, send);
    }

    find(id?: string) {
        if (!!id) {
            this._model.first({id: id}).done((err, model: Model) => {
                if (!model) {
                    this.response.setStatus(404);
                    this.json({ error: 'not found' });
                    return;
                }
                this.json(model);
            });
            return;
        }

        this._model.find().where(this.request.query).done((err, model: Model) => {
            if (!model) {
                this.json([]);
                return;
            }
            this.json(model);
        });
    }

    create() {
        var model = new this._model();
        ModelController.bindModel(model, this.request);

        this._model.save(model, (err) => {
            if (err) this.json(err);
            else this.json(model);
        })
    }

    update(id: string) {
        this._model.first({id: id}).done((err, model: Model) => {
            if (!model) {
                this.response.setStatus(404);
                this.json({ error: 'not found' });
                return;
            }
            ModelController.bindModel(model, this.request);
            this._model.save(model, (err) => this.json(model));
        });
    }

    destroy(id: string) {
        this._model.first({id: id}).done((err, model: Model) => {
            if (!model) {
                this.response.setStatus(404);
                this.json({ error: 'not found' });
                return;
            }
            this._model.destroy(model, (err) => this.json(model));
        });
    }

    private static bindModel(model: any, request: Express.Request) {
        for (var key in request.query)
            if (request.query.hasOwnProperty(key))
                model[key] = request.query[key];

        for (var key in request.body)
            if (request.body.hasOwnProperty(key))
                model[key] = request.body[key];
    }
}