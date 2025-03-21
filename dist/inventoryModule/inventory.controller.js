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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInventoryDetails = exports.getReports = exports.createReport = exports.createQRCode = exports.sellProductQR = exports.getProductByQR = exports.deleteSubproduct = exports.deleteProduct = exports.deleteCategory = exports.fetchSubProductPurchase = exports.deletePurchase = exports.fetchPurchase = exports.createPurchase = exports.searchSubProducts = exports.fetchSubProducts = exports.fetchProducts = exports.fetchCategories = exports.createSubproduct = exports.createProduct = exports.createCategory = void 0;
const xlsx_1 = __importDefault(require("xlsx"));
const fs_1 = __importDefault(require("fs"));
const tryCatchFn_1 = require("../utils/Helpers/tryCatchFn");
const category_model_1 = require("./models/category.model");
const product_model_1 = require("./models/product.model");
const subproduct_model_1 = require("./models/subproduct.model");
const fileUpload_1 = require("../utils/Helpers/fileUpload");
const purchase_subproduct_model_1 = require("./models/purchase.subproduct.model");
const purchase_model_1 = require("./models/purchase.model");
const inventory_model_1 = require("./models/inventory.model");
const supplier_model_1 = require("../supplierModule/supplier.model");
const inventorylog_model_1 = require("./models/inventorylog.model");
const path_1 = __importDefault(require("path"));
const reports_model_1 = require("./models/reports.model");
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
                    let response = yield (0, fileUpload_1.uploadToCloudinary)("purchaseFolder", req.files[sub.subproduct].name, req.files[sub.subproduct]);
                    if (response.success) {
                        sub.image = response.url;
                    }
                    console.log(response);
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
exports.getProductByQR = (0, tryCatchFn_1.tryCatchFn)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _g;
    let id = req.params.id;
    let inventory = yield inventory_model_1.InventoryModel.findById(id);
    if (!inventory) {
        return res.status(200).json({
            success: false,
            result: null,
        });
    }
    const result = yield inventorylog_model_1.InventoryLogModel.aggregate([
        {
            $match: {
                inventory: inventory === null || inventory === void 0 ? void 0 : inventory._id,
            },
        },
        {
            $group: {
                _id: null,
                totalQyt: { $sum: "$qyt" },
            },
        },
    ]);
    let inStock = ((_g = result[0]) === null || _g === void 0 ? void 0 : _g["totalQyt"]) !== undefined
        ? inventory.newQuantity - result[0]["totalQyt"]
        : inventory.newQuantity;
    let subproduct = yield purchase_subproduct_model_1.PurchaseSubProductModel.findById(inventory === null || inventory === void 0 ? void 0 : inventory.subProduct);
    let inventoryLogs = yield inventorylog_model_1.InventoryLogModel.find({
        inventory: inventory._id,
    });
    return res.status(200).json({
        success: true,
        result: subproduct,
        inStock: inStock,
        log: inventoryLogs,
        message: "Detail ",
    });
}));
exports.sellProductQR = (0, tryCatchFn_1.tryCatchFn)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _h, _j;
    let id = req.params.id;
    let qyt = req.params.qyt;
    let cost = req.params.cost;
    let note = req.params.note;
    if (!id && !qyt && !cost) {
        return res.status(200).json({
            success: false,
            message: "Invalide code",
        });
    }
    console.log(id);
    let inventory = yield inventory_model_1.InventoryModel.findById(id);
    if (!inventory) {
        return res.status(200).json({
            success: false,
            message: "Product Not Found",
        });
    }
    const result = yield inventorylog_model_1.InventoryLogModel.aggregate([
        {
            $match: {
                inventory: inventory._id,
            },
        },
        {
            $group: {
                _id: null,
                totalQyt: { $sum: "$qyt" },
            },
        },
    ]);
    if (!(inventory.newQuantity >= ((_j = (_h = result[0]) === null || _h === void 0 ? void 0 : _h.totalQyt) !== null && _j !== void 0 ? _j : 0) + parseInt(qyt))) {
        return res.status(200).json({
            success: false,
            message: `${inventory.newQuantity - result[0]["totalQyt"]} In Stock`,
        });
    }
    let total = parseInt(qyt) * parseFloat(cost);
    let inventoryLog = yield inventorylog_model_1.InventoryLogModel.create({
        inventory: inventory._id,
        cost: total,
        qyt,
        note,
    });
    console.log({
        success: true,
        result: inventoryLog,
        message: "Logged Inventory OUT",
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
        subProduct: subproduct === null || subproduct === void 0 ? void 0 : subproduct._id,
    });
    if (inventoryCheck) {
        return res.status(200).json({
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
        let result = Object.assign(Object.assign({}, inventory.toObject()), { pcost: subproduct.sellingprice, sp: subproduct.mrp, name: subproduct.name });
        yield purchase_subproduct_model_1.PurchaseSubProductModel.findByIdAndUpdate(subproduct._id, {
            inInventory: true,
        });
        return res.status(200).json({
            success: true,
            result: result,
            message: "Moved TO INVENTORY",
            qr: inventory._id.toString(),
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
exports.createReport = (0, tryCatchFn_1.tryCatchFn)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let data = [];
    let fileName = `Report-${new Date()}.xlsx`;
    let report = yield reports_model_1.ReportsModel.create({
        name: fileName,
        status: "Pending",
    });
    res.status(200).json({
        success: true,
        result: report,
        message: "Report is creating wait for some time",
    });
    const inventory = yield inventory_model_1.InventoryModel.find().populate({
        path: "subProduct",
        select: "name",
    });
    for (const inv of inventory) {
        if (inv.subProduct && typeof inv.subProduct !== "string") {
            const subProduct = inv.subProduct;
            const Logs = yield inventorylog_model_1.InventoryLogModel.find({
                inventory: inv._id,
            });
            let inStock = inv.newQuantity;
            for (const lo of Logs) {
                inStock -= lo.qyt;
                const obj = {
                    Name: subProduct.name,
                    Quantity: lo.qyt,
                    Cost: lo.cost,
                    Total: lo.qyt * lo.cost,
                    Stock: inStock,
                    Date: lo.createdAt,
                };
                data.push(obj);
                console.log(obj);
            }
        }
    }
    const workbook = xlsx_1.default.utils.book_new();
    const worksheet = xlsx_1.default.utils.json_to_sheet(data);
    xlsx_1.default.utils.book_append_sheet(workbook, worksheet, "Report");
    const filePath = path_1.default.join(__dirname, fileName);
    xlsx_1.default.writeFile(workbook, filePath);
    const fileContent = fs_1.default.readFileSync(filePath);
    let result = yield (0, fileUpload_1.uploadToS3Bucket)("reports", fileName, fileContent);
    console.warn(result);
    let reportUpdate = yield reports_model_1.ReportsModel.findByIdAndUpdate(report._id, {
        url: result.Location,
        status: "Completed",
    });
    fs_1.default.unlinkSync(filePath);
}));
exports.getReports = (0, tryCatchFn_1.tryCatchFn)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let id = req.params.id;
    let reports = yield reports_model_1.ReportsModel.find({}, {}, { sort: { createdAt: -1 } });
    return res.status(200).json({
        success: true,
        result: reports,
        message: "Reports",
    });
}));
exports.getInventoryDetails = (0, tryCatchFn_1.tryCatchFn)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let logs = yield inventorylog_model_1.InventoryLogModel.aggregate([
        {
            $lookup: {
                from: "inventories",
                localField: "inventory",
                foreignField: "_id",
                as: "inventoryDetails",
            },
        },
        {
            $unwind: "$inventoryDetails",
        },
        {
            $lookup: {
                from: "purchasesubproducts",
                localField: "inventoryDetails.subProduct",
                foreignField: "_id",
                as: "subProductDetails",
            },
        },
        {
            $unwind: "$subProductDetails",
        },
        {
            $group: {
                _id: "$inventory",
                qyt: { $sum: "$qyt" },
                totalqyt: { $first: "$inventoryDetails.newQuantity" },
                name: { $first: "$subProductDetails.name" },
                createdAt: { $first: "$createdAt" },
            },
        },
        {
            $sort: { createdAt: -1 },
        },
    ]);
    return res.status(200).json({
        success: true,
        result: logs,
        message: "Logs",
    });
}));
