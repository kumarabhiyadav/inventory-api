import { Request, Response } from "express";
import XLSX from "xlsx";

import fs from "fs";

import { DocumentType } from "@typegoose/typegoose";

import { tryCatchFn } from "../utils/Helpers/tryCatchFn";
import { CategoryModel } from "./models/category.model";
import { ProductModel } from "./models/product.model";
import { SubProductModel } from "./models/subproduct.model";
import { uploadToS3Bucket } from "../utils/Helpers/fileUpload";
import {
  PurchaseSubProduct,
  PurchaseSubProductModel,
} from "./models/purchase.subproduct.model";
import { PurchaseModel } from "./models/purchase.model";
import { InventoryModel } from "./models/inventory.model";
import { SupplierModel } from "../supplierModule/supplier.model";
import { decryptText, encryptText } from "../utils/Helpers/ENC";
import { InventoryLog, InventoryLogModel } from "./models/inventorylog.model";
import path from "path";
import { ReportsModel } from "./models/reports.model";

export const createCategory = tryCatchFn(
  async (req: Request, res: Response) => {
    let { name } = req.body;
    let category = await CategoryModel.create({ name });
    if (category) {
      res.status(200).json({
        success: true,
        result: category,
      });
    }
  }
);

export const createProduct = tryCatchFn(async (req: Request, res: Response) => {
  let { name, category } = req.body;
  let product = await ProductModel.create({ name, category });
  if (product) {
    res.status(200).json({
      success: true,
      result: product,
    });
  }
});

export const createSubproduct = tryCatchFn(
  async (req: Request, res: Response) => {
    let { name, category, product } = req.body;
    let subproduct = await SubProductModel.create({ name, category, product });
    if (subproduct) {
      res.status(200).json({
        success: true,
        result: subproduct,
      });
    }
  }
);

export const fetchCategories = tryCatchFn(
  async (req: Request, res: Response) => {
    let categories = await CategoryModel.find();
    if (categories) {
      res.status(200).json({
        success: true,
        result: categories,
      });
    }
  }
);

export const fetchProducts = tryCatchFn(async (req: Request, res: Response) => {
  let category = req.params.category;
  let products = await ProductModel.find({
    category: category,
  });
  if (products) {
    res.status(200).json({
      success: true,
      result: products,
    });
  }
});

export const fetchSubProducts = tryCatchFn(
  async (req: Request, res: Response) => {
    let product = req.params.product;
    let products = await SubProductModel.find({
      product: product,
    });
    if (products) {
      res.status(200).json({
        success: true,
        result: products,
      });
    }
  }
);

export const searchSubProducts = tryCatchFn(
  async (req: Request, res: Response) => {
    let name = req.query.query;
    let products = await SubProductModel.find({
      name: { $regex: `/${name}` },
    });

    if (!name) {
      products = await SubProductModel.find().sort({
        createdAt: -1,
      });
    }
    if (products) {
      res.status(200).json({
        success: true,
        result: products,
      });
    }
  }
);

export const createPurchase = tryCatchFn(
  async (req: Request, res: Response) => {
    let body = JSON.parse(req.body.data);

    let subproducts = [];
    for await (const sub of body.subProducts) {
      if (sub.image && req.files && req.files[sub.subproduct]) {
        let response: any = await uploadToS3Bucket(
          "purchaseFolder",
          (req.files[sub.subproduct] as any).name,
          (req.files[sub.subproduct] as any).data
        );
        sub.image = response.Location;
      }

      let subData = await PurchaseSubProductModel.create({
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

    let purchase = await PurchaseModel.create({
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
  }
);

export const fetchPurchase = tryCatchFn(async (req: Request, res: Response) => {
  let purchase = await PurchaseModel.find()
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
});

export const deletePurchase = tryCatchFn(
  async (req: Request, res: Response) => {
    let id = req.params.id;

    let purchase = await PurchaseModel.findByIdAndDelete(id);
    if (purchase) {
      let subproduct = await PurchaseSubProductModel.deleteMany({
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
  }
);

export const fetchSubProductPurchase = tryCatchFn(
  async (req: Request, res: Response) => {
    let id = req.params.id;
    let purchase = await PurchaseSubProductModel.find({
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
  }
);

export const deleteCategory = tryCatchFn(
  async (req: Request, res: Response) => {
    let id = req.params.id;
    let product = await ProductModel.find({
      category: id,
    });
    if (product) {
      return res.status(200).json({
        success: false,
        result: product,
        message: "Failed to delete category beacuse products in category",
      });
    }
    let category = await CategoryModel.findByIdAndDelete(id);
    return res.status(200).json({
      success: true,
      result: category,
      message: "Category Deleted successfully",
    });
  }
);

export const deleteProduct = tryCatchFn(async (req: Request, res: Response) => {
  let id = req.params.id;
  let subproduct = await SubProductModel.find({
    product: id,
  });
  if (subproduct) {
    return res.status(200).json({
      success: false,
      result: subproduct,
      message: "Failed to delete product beacuse subproduct in product",
    });
  }
  let category = await CategoryModel.findByIdAndDelete(id);
  return res.status(200).json({
    success: true,
    result: category,
    message: "Product Deleted successfully",
  });
});

export const deleteSubproduct = tryCatchFn(
  async (req: Request, res: Response) => {
    let id = req.params.id;
    let subproduct = await SubProductModel.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      result: subproduct,
      message: "Subproduct delete successfully",
    });
  }
);

// New APIS
export const getProductByQR = tryCatchFn(
  async (req: Request, res: Response) => {
    let code = req.params.code;
    let pass = req.params.pass;

    let data = decryptText({ cipherText: code, iv: pass });
    console.log(data);

    let inventory = await InventoryModel.findById(data);

    if (!inventory) {
      return res.status(200).json({
        success: false,
        result: null,
      });
    }

    const result = await InventoryLogModel.aggregate([
      {
        $match: {
          inventory: inventory?._id, // Filter based on the value of `inventory`
        },
      },
      {
        $group: {
          _id: null,
          totalQyt: { $sum: "$qyt" },
        },
      },
    ]);

    let inStock =
      result[0]?.["totalQyt"] !== undefined
        ? inventory.newQuantity - result[0]["totalQyt"]
        : inventory.newQuantity;
    let subproduct = await PurchaseSubProductModel.findById(
      inventory?.subProduct
    );

    let inventoryLogs = await InventoryLogModel.find({
      inventory: inventory._id,
    });

    return res.status(200).json({
      success: true,
      result: subproduct,
      inStock: inStock,
      log: inventoryLogs,
      message: "Detail ",
    });
  }
);

export const sellProductQR = tryCatchFn(async (req: Request, res: Response) => {
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

  let data = decryptText({ cipherText: code, iv: pass });
  console.log(data);
  let inventory = await InventoryModel.findById(data);

  if (!inventory) {
    return res.status(200).json({
      success: false,
      message: "Product Not Found",
    });
  }

  const result = await InventoryLogModel.aggregate([
    {
      $match: {
        inventory: inventory._id, // Filter based on the value of `inventory`
      },
    },
    {
      $group: {
        _id: null,
        totalQyt: { $sum: "$qyt" },
      },
    },
  ]);

  if (!(inventory.newQuantity >= (result[0]?.totalQyt ?? 0) + parseInt(qyt))) {
    return res.status(200).json({
      success: false,
      message: `${inventory.newQuantity - result[0]["totalQyt"]} In Stock`,
    });
  }

  let total = parseInt(qyt) * parseFloat(cost);
  let inventoryLog = await InventoryLogModel.create({
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
});

export const createQRCode = tryCatchFn(async (req: Request, res: Response) => {
  let { id, supplierId } = req.body;

  let subproduct = await PurchaseSubProductModel.findById(id);

  let supplier = await SupplierModel.findById(supplierId);
  // Check Inventory Already Exists Or Not

  let inventoryCheck = await InventoryModel.findOne({
    subProduct: subproduct?._id,
  });

  if (inventoryCheck) {
    return res.status(200).json({
      success: false,
      message: "Already Exists in Inventory",
    });
  }

  if (subproduct && supplier) {
    let sku = getSKU(supplier.name, subproduct.cost);
    let inventory = await InventoryModel.create({
      subProduct: subproduct._id,
      sku,
      quantityChanged: 0,
      newQuantity: subproduct.quantity,
      transactionType: "PURCHASE",
    });

    let result = {
      ...inventory.toObject(),
      pcost: subproduct.sellingprice,
      sp: subproduct.mrp,
      name: subproduct.name,
    };

    let enc = encryptText(inventory._id.toString());

    let sub = await PurchaseSubProductModel.findByIdAndUpdate(subproduct._id, {
      inInventory: true,
    });

    return res.status(200).json({
      success: true,
      result: result,
      message: "Moved TO INVENTORY",
      qr: `${enc["cipherText"]}:${enc["iv"]}`,
    });
  } else {
    return res.status(500).json({
      success: false,
      message: "Error to move inventory",
    });
  }
});

function getSKU(supplierName: string, price: number) {
  return supplierName.slice(0, 2) + "AD" + numberToStringFormat(price);
}

function numberToStringFormat(num: number) {
  // Convert the number to a string
  const numStr = num.toString();

  // Initialize an empty result string
  let result = "";

  // Loop through each digit of the number string
  for (let i = 0; i < numStr.length; i++) {
    const digit = parseInt(numStr[i]);

    // Map digit to letter (1 -> 'A', 2 -> 'B', ..., 26 -> 'Z')
    if (digit >= 1 && digit <= 26) {
      result += String.fromCharCode(65 + digit - 1); // 'A' is at char code 65
    } else {
      result += numStr[i];
    }
  }

  return result;
}

export const createReport = tryCatchFn(async (req: Request, res: Response) => {
  let data = [];

  let fileName = `Report-${new Date()}.xlsx`;
  let report = await ReportsModel.create({
    name: fileName,
    status: "Pending",
  });

  res.status(200).json({
    success: true,
    result: report,
    message: "Report is creating wait for some time",
  });

  const inventory = await InventoryModel.find().populate({
    path: "subProduct",
    select: "name",
  });
  for (const inv of inventory) {
    // Use a type assertion to inform TypeScript that subProduct is populated
    if (inv.subProduct && typeof inv.subProduct !== "string") {
      const subProduct = inv.subProduct as PurchaseSubProduct; // Assert the populated type

      const Logs: DocumentType<InventoryLog>[] = await InventoryLogModel.find({
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

  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.json_to_sheet(data); // Convert JSON data to sheet
  XLSX.utils.book_append_sheet(workbook, worksheet, "Report");

  // 2. Write the workbook to a temporary file
  const filePath = path.join(__dirname, fileName);
  XLSX.writeFile(workbook, filePath);

  const fileContent = fs.readFileSync(filePath);

  let result: any = await uploadToS3Bucket("reports", fileName, fileContent);

  console.warn(result);

  let reportUpdate = await ReportsModel.findByIdAndUpdate(report._id, {
    url: result.Location,
    status: "Completed",
  });

  fs.unlinkSync(filePath);
});

export const getReports = tryCatchFn(async (req: Request, res: Response) => {
  let id = req.params.id;
  let reports = await ReportsModel.find({}, {}, { sort: { createdAt: -1 } });

  return res.status(200).json({
    success: true,
    result: reports,
    message: "Reports",
  });
});

export const getInventoryDetails = tryCatchFn(
  async (req: Request, res: Response) => {
    let logs = await InventoryLogModel.aggregate([
      // Lookup to join inventoryLogs with Inventories
      {
        $lookup: {
          from: "inventories", // The related collection
          localField: "inventory", // Field in inventoryLogs
          foreignField: "_id", // Field in Inventories
          as: "inventoryDetails", // Output array
        },
      },

      {
        $unwind: "$inventoryDetails",
      },
      // Lookup to join Inventories with SubProducts
      {
        $lookup: {
          from: "purchasesubproducts", // The related collection
          localField: "inventoryDetails.subProduct", // Field in inventoryDetails
          foreignField: "_id", // Field in SubProducts
          as: "subProductDetails", // Output array
        },
      },
      // Unwind the joined subProductDetails array
      {
        $unwind: "$subProductDetails",
      },
      // Group by inventory ID
      {
        $group: {
          _id: "$inventory", // Group by inventory ID
          qyt: { $sum: "$qyt" }, // Sum of qyt
          totalqyt: { $first: "$inventoryDetails.newQuantity" }, // Take newQuantity
          name: { $first: "$subProductDetails.name" }, // Take name from SubProducts
        },
      },
      {
        $sort: { createdAt: -1 }, // Use -1 for descending order
      },
    ]);

    return res.status(200).json({
      success: true,
      result: logs,
      message: "Logs",
    });
  }
);
