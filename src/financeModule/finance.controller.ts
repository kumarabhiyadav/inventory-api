import { tryCatchFn } from "../utils/Helpers/tryCatchFn";
import { FinanceModel } from "./finance.model";
import { Request, Response } from "express";

export const createSales = tryCatchFn(async (req: Request, res: Response) => {
  let { date, onlineAmount, cashAmount } = req.body;
  let sale = await FinanceModel.create({
    date,
    onlineAmount,
    cashAmount,
  });
  if (sale) {
    res.status(200).json({
      success: true,
      result: sale,
    });
  } else {
    res.status(200).json({
      success: false,
      result: sale,
    });
  }
});

export const fetchSales = tryCatchFn(async (req: Request, res: Response) => {
  let sales = await FinanceModel.find({
    isActive: true,
    isDeleted: false,
  }).sort({
    date:-1
  });
  if (sales) {
    res.status(200).json({
      success: true,
      result: sales,
    });
  } else {
    res.status(200).json({
      success: false,
      result: sales,
    });
  }
});
