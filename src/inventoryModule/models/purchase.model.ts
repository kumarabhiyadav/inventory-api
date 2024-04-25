import { getModelForClass, prop, Ref } from "@typegoose/typegoose";
import { Supplier } from "../../supplierModule/supplier.model";
import { PurchaseSubProduct, PurchaseSubProductModel } from "./purchase.subproduct.model";

class Purchase {
  
    @prop({ default: 0 })
    totalCost: number;
  
    @prop({ default: 0 })
    additionalCost: number;
  
    @prop({ ref: () => PurchaseSubProduct })
    subProducts: Ref <PurchaseSubProduct>[];
  
    @prop({ required: true })
    purchaseDate: Date;
  
    @prop({ ref: () => Supplier })
    supplier: Ref<Supplier>;
  }

  export const PurchaseModel = getModelForClass(Purchase, {
    schemaOptions: { timestamps: true },
});