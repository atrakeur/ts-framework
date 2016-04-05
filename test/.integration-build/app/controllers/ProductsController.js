var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Controller_1 = require("../../../../build/Controller");
var Products_1 = require("../models/Products");
var ProductsController = (function (_super) {
    __extends(ProductsController, _super);
    function ProductsController() {
        _super.apply(this, arguments);
    }
    ProductsController.configure = function () {
        this.model = Products_1.Products;
    };
    return ProductsController;
})(Controller_1.Controller);
exports.ProductsController = ProductsController;
