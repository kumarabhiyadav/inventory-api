import { getModelForClass, prop, Ref } from "@typegoose/typegoose";
import { SubProduct } from "./subproduct.model";
import { Supplier } from "../../supplierModule/supplier.model";

export class PurchaseSubProduct {
  @prop()
  id: string;

  @prop({ required: true })
  cost: number;

  @prop({})
  image: string;

  @prop({ ref: () => SubProduct })
  subproduct: Ref<SubProduct>;

  @prop({ ref: () => Supplier })
  supplier: Ref<Supplier>;

  @prop({ required: true, default: 0 })
  mrp: number;

  @prop({ required: true, default: 0 })
  sellingprice: number;

  @prop({ required: true })
  name: string;

  @prop({ required: true })
  unit: string;

  @prop({ required: true })
  quantity: number;
}

export const PurchaseSubProductModel = getModelForClass(PurchaseSubProduct, {
  schemaOptions: { timestamps: true },
});
