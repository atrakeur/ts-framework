var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Controller_1 = require("../../../../build/Controller");
var User_1 = require("../models/User");
var UserController = (function (_super) {
    __extends(UserController, _super);
    function UserController() {
        _super.apply(this, arguments);
    }
    UserController.configure = function () {
        this.model = User_1.User;
    };
    return UserController;
})(Controller_1.Controller);
exports.UserController = UserController;
