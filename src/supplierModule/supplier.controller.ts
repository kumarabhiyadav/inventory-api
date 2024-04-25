import { tryCatchFn } from "../utils/Helpers/tryCatchFn";
import { SupplierModel } from "./supplier.model";
import { Request, Response } from "express";

export const createSupplier = tryCatchFn(async (req: Request, res: Response) => {
  let { name, address } = req.body;
  let supplier = await SupplierModel.create({
    name,
    address
  });
  if (supplier) {
    res.status(200).json({
      success: true,
      result: supplier,
    });
  } else {
    res.status(200).json({
      success: false,
      result: supplier,
    });
  }
});

export const fetchSupplier = tryCatchFn(async (req: Request, res: Response) => {
  let suppliers= await SupplierModel.find({
    isActive: true,
    isDeleted: false,
  }).sort({
    createdAt:-1
  });
  if (suppliers) {
    res.status(200).json({
      success: true,
      result: suppliers,
    });
  } else {
    res.status(200).json({
      success: false,
      result: suppliers,
    });
  }
});
