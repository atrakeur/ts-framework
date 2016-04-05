var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Controller_1 = require("../../../../build/Controller");
var IndexController = (function (_super) {
    __extends(IndexController, _super);
    function IndexController() {
        _super.apply(this, arguments);
    }
    IndexController.prototype.index = function () {
        this.content('home');
    };
    return IndexController;
})(Controller_1.Controller);
exports.IndexController = IndexController;
