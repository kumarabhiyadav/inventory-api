import { Request, Response } from "express";
import { Types } from "mongoose";
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
        image: sub.image,
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
    .populate("subProducts");

  if (purchase) {
    console.log(purchase);
    res.status(200).json({
      success: true,
      result: purchase,
    });
  }

  res.status(500).json({
    success: false,
    message: "Failed to fetch purchase",
  });
});



export const deletePurchase = tryCatchFn(async (req: Request, res: Response) => {
 let id = req.params.id
  let purchase = await PurchaseModel.findByIdAndDelete(id);
  if (purchase) {
    console.log(purchase);
    res.status(200).json({
      success: true,
      result: purchase,
    });
  }

  res.status(500).json({
    success: false,
    message: "Failed to fetch purchase",
  });
});