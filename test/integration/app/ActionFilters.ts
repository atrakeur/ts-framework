/// <reference path="../app.ts" />

class ActionFilter1 extends TS.ActionFilter {

    before(context: TS.IActionFilterContext) {
        if (context.request.param('filter') == 'filter1') context.reply.content('filter1');
        else context.next();
    }

    after(context: TS.IActionFilterContext) {
        context.next();
    }

}

class ActionFilter2 extends TS.ActionFilter {

    before(context: TS.IActionFilterContext) {
        if (context.request.param('filter') == 'filter2') context.reply.content('filter2');
        else context.next();
    }

}