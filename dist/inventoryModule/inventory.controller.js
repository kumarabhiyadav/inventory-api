"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createQRCode = exports.sellProductQR = exports.deleteSubproduct = exports.deleteProduct = exports.deleteCategory = exports.fetchSubProductPurchase = exports.deletePurchase = exports.fetchPurchase = exports.createPurchase = exports.searchSubProducts = exports.fetchSubProducts = exports.fetchProducts = exports.fetchCategories = exports.createSubproduct = exports.createProduct = exports.createCategory = void 0;
const tryCatchFn_1 = require("../utils/Helpers/tryCatchFn");
const category_model_1 = require("./models/category.model");
const product_model_1 = require("./models/product.model");
const subproduct_model_1 = require("./models/subproduct.model");
const fileUpload_1 = require("../utils/Helpers/fileUpload");
const purchase_subproduct_model_1 = require("./models/purchase.subproduct.model");
const purchase_model_1 = require("./models/purchase.model");
const inventory_model_1 = require("./models/inventory.model");
const supplier_model_1 = require("../supplierModule/supplier.model");
const ENC_1 = require("../utils/Helpers/ENC");
const inventorylog_model_1 = require("./models/inventorylog.model");
exports.createCategory = (0, tryCatchFn_1.tryCatchFn)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { name } = req.body;
    let category = yield category_model_1.CategoryModel.create({ name });
    if (category) {
        res.status(200).json({
            success: true,
            result: category,
        });
    }
}));
exports.createProduct = (0, tryCatchFn_1.tryCatchFn)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { name, category } = req.body;
    let product = yield product_model_1.ProductModel.create({ name, category });
    if (product) {
        res.status(200).json({
            success: true,
            result: product,
        });
    }
}));
exports.createSubproduct = (0, tryCatchFn_1.tryCatchFn)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { name, category, product } = req.body;
    let subproduct = yield subproduct_model_1.SubProductModel.create({ name, category, product });
    if (subproduct) {
        res.status(200).json({
            success: true,
            result: subproduct,
        });
    }
}));
exports.fetchCategories = (0, tryCatchFn_1.tryCatchFn)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let categories = yield category_model_1.CategoryModel.find();
    if (categories) {
        res.status(200).json({
            success: true,
            result: categories,
        });
    }
}));
exports.fetchProducts = (0, tryCatchFn_1.tryCatchFn)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let category = req.params.category;
    let products = yield product_model_1.ProductModel.find({
        category: category,
    });
    if (products) {
        res.status(200).json({
            success: true,
            result: products,
        });
    }
}));
exports.fetchSubProducts = (0, tryCatchFn_1.tryCatchFn)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let product = req.params.product;
    let products = yield subproduct_model_1.SubProductModel.find({
        product: product,
    });
    if (products) {
        res.status(200).json({
            success: true,
            result: products,
        });
    }
}));
exports.searchSubProducts = (0, tryCatchFn_1.tryCatchFn)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let name = req.query.query;
    let products = yield subproduct_model_1.SubProductModel.find({
        name: { $regex: `/${name}` },
    });
    if (!name) {
        products = yield subproduct_model_1.SubProductModel.find().sort({
            createdAt: -1,
        });
    }
    if (products) {
        res.status(200).json({
            success: true,
            result: products,
        });
    }
}));
exports.createPurchase = (0, tryCatchFn_1.tryCatchFn)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, e_1, _b, _c;
    let body = JSON.parse(req.body.data);
    let subproducts = [];
    try {
        for (var _d = true, _e = __asyncValues(body.subProducts), _f; _f = yield _e.next(), _a = _f.done, !_a;) {
            _c = _f.value;
            _d = false;
            try {
                const sub = _c;
                if (sub.image && req.files && req.files[sub.subproduct]) {
                    let response = yield (0, fileUpload_1.uploadToS3Bucket)("purchaseFolder", req.files[sub.subproduct].name, req.files[sub.subproduct].data);
                    sub.image = response.Location;
                }
                let subData = yield purchase_subproduct_model_1.PurchaseSubProductModel.create({
                    name: sub.name,
                    unit: sub.unit,
                    subproduct: sub.subproduct,
                    quantity: sub.quantity,
                    cost: sub.cost,
                    mrp: sub.mrp,
                    sellingprice: sub.sellingprice,
                    image: sub.image,
                    supplier: body.supplier._id,
                });
                if (subData) {
                    subproducts.push(subData._id);
                }
            }
            finally {
                _d = true;
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (!_d && !_a && (_b = _e.return)) yield _b.call(_e);
        }
        finally { if (e_1) throw e_1.error; }
    }
    let purchase = yield purchase_model_1.PurchaseModel.create({
        totalCost: body.totalCost,
        additionalCost: body.additionalCost,
        subProducts: subproducts,
        purchaseDate: body.purchaseDate,
        supplier: body.supplier._id,
    });
    if (purchase) {
        return res.status(200).json({
            success: true,
            result: purchase,
        });
    }
    return res.status(500).json({
        success: false,
        message: "Failed to create purchase",
    });
}));
exports.fetchPurchase = (0, tryCatchFn_1.tryCatchFn)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let purchase = yield purchase_model_1.PurchaseModel.find()
        .populate("supplier")
        .populate("subProducts")
        .sort({
        createdAt: -1,
    });
    if (purchase) {
        return res.status(200).json({
            success: true,
            result: purchase,
        });
    }
    return res.status(500).json({
        success: false,
        message: "Failed to fetch purchase",
    });
}));
exports.deletePurchase = (0, tryCatchFn_1.tryCatchFn)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let id = req.params.id;
    let purchase = yield purchase_model_1.PurchaseModel.findByIdAndDelete(id);
    if (purchase) {
        let subproduct = yield purchase_subproduct_model_1.PurchaseSubProductModel.deleteMany({
            _id: { $in: purchase.subProducts },
        });
        return res.status(200).json({
            success: true,
            result: purchase,
        });
    }
    return res.status(500).json({
        success: false,
        message: "Failed to fetch purchase",
    });
}));
exports.fetchSubProductPurchase = (0, tryCatchFn_1.tryCatchFn)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let id = req.params.id;
    let purchase = yield purchase_subproduct_model_1.PurchaseSubProductModel.find({
        subproduct: id,
    }).populate("supplier");
    if (purchase) {
        return res.status(200).json({
            success: true,
            result: purchase,
        });
    }
    return res.status(500).json({
        success: false,
        message: "Failed to fetch purchase",
    });
}));
exports.deleteCategory = (0, tryCatchFn_1.tryCatchFn)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let id = req.params.id;
    let product = yield product_model_1.ProductModel.find({
        category: id,
    });
    if (product) {
        return res.status(200).json({
            success: false,
            result: product,
            message: "Failed to delete category beacuse products in category",
        });
    }
    let category = yield category_model_1.CategoryModel.findByIdAndDelete(id);
    return res.status(200).json({
        success: true,
        result: category,
        message: "Category Deleted successfully",
    });
}));
exports.deleteProduct = (0, tryCatchFn_1.tryCatchFn)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let id = req.params.id;
    let subproduct = yield subproduct_model_1.SubProductModel.find({
        product: id,
    });
    if (subproduct) {
        return res.status(200).json({
            success: false,
            result: subproduct,
            message: "Failed to delete product beacuse subproduct in product",
        });
    }
    let category = yield category_model_1.CategoryModel.findByIdAndDelete(id);
    return res.status(200).json({
        success: true,
        result: category,
        message: "Product Deleted successfully",
    });
}));
exports.deleteSubproduct = (0, tryCatchFn_1.tryCatchFn)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let id = req.params.id;
    let subproduct = yield subproduct_model_1.SubProductModel.findByIdAndDelete(id);
    return res.status(200).json({
        success: true,
        result: subproduct,
        message: "Subproduct delete successfully",
    });
}));
exports.sellProductQR = (0, tryCatchFn_1.tryCatchFn)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _g, _h;
    let code = req.params.code;
    let pass = req.params.pass;
    let qyt = req.params.qyt;
    let cost = req.params.cost;
    let note = req.params.note;
    if (!code && !pass && !qyt && !cost) {
        return res.status(200).json({
            success: false,
            message: "Invalide code",
        });
    }
    let data = (0, ENC_1.decryptText)({ cipherText: code, iv: pass });
    console.log(data);
    let inventory = yield inventory_model_1.InventoryModel.findById(data);
    if (!inventory) {
        return res.status(200).json({
            success: false,
            message: "Product Not Found",
        });
    }
    const result = yield inventorylog_model_1.InventoryLogModel.aggregate([
        {
            $match: {
                inventory: inventory._id
            }
        }, {
            $group: {
                _id: null,
                totalQyt: { $sum: "$qyt" }
            }
        }
    ]);
    if ((!(inventory.newQuantity >= ((_h = (_g = result[0]) === null || _g === void 0 ? void 0 : _g.totalQyt) !== null && _h !== void 0 ? _h : 0) + parseInt(qyt)))) {
        return res.status(200).json({
            success: false,
            message: `${inventory.newQuantity - result[0]['totalQyt']} In Stock`,
        });
    }
    let total = parseInt(qyt) * parseFloat(cost);
    let inventoryLog = yield inventorylog_model_1.InventoryLogModel.create({
        inventory: inventory._id,
        cost: total,
        qyt,
        note
    });
    return res.status(200).json({
        success: true,
        result: inventoryLog,
        message: "Logged Inventory OUT",
    });
}));
exports.createQRCode = (0, tryCatchFn_1.tryCatchFn)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { id, supplierId } = req.body;
    let subproduct = yield purchase_subproduct_model_1.PurchaseSubProductModel.findById(id);
    let supplier = yield supplier_model_1.SupplierModel.findById(supplierId);
    let inventoryCheck = yield inventory_model_1.InventoryModel.findOne({
        subProduct: subproduct === null || subproduct === void 0 ? void 0 : subproduct._id
    });
    if (inventoryCheck) {
        return res.status(500).json({
            success: false,
            message: "Already Exists in Inventory",
        });
    }
    if (subproduct && supplier) {
        let sku = getSKU(supplier.name, subproduct.cost);
        let inventory = yield inventory_model_1.InventoryModel.create({
            subProduct: subproduct._id,
            sku,
            quantityChanged: 0,
            newQuantity: subproduct.quantity,
            transactionType: "PURCHASE",
        });
        let result = Object.assign(Object.assign({}, inventory.toObject()), { pcost: subproduct.sellingprice, sp: subproduct.mrp });
        let enc = (0, ENC_1.encryptText)(inventory._id.toString());
        return res.status(200).json({
            success: true,
            result: result,
            message: "Moved TO INVENTORY",
            qr: `${enc["cipherText"]}:${enc["iv"]}`,
        });
    }
    else {
        return res.status(500).json({
            success: false,
            message: "Error to move inventory",
        });
    }
}));
function getSKU(supplierName, price) {
    return supplierName.slice(0, 2) + "AD" + numberToStringFormat(price);
}
function numberToStringFormat(num) {
    const numStr = num.toString();
    let result = "";
    for (let i = 0; i < numStr.length; i++) {
        const digit = parseInt(numStr[i]);
        if (digit >= 1 && digit <= 26) {
            result += String.fromCharCode(65 + digit - 1);
        }
        else {
            result += numStr[i];
        }
    }
    return result;
}
