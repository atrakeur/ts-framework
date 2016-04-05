var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Model_1 = require("../../../../build/Model");
var Products = (function (_super) {
    __extends(Products, _super);
    function Products() {
        _super.apply(this, arguments);
    }
    Products.configure = function () {
        this.validate('name', { required: true });
        this.validate('price', { required: true, min: 0 });
        this.validate('stock', { required: true, min: 0 });
    };
    return Products;
})(Model_1.Model);
exports.Products = Products;
