/// <reference path="../../app.ts" />

class UserController extends TS.Controller {

    static configure() {
        this.model = User;
    }

}