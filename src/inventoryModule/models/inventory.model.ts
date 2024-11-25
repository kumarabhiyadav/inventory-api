import { getModelForClass, prop, Ref } from "@typegoose/typegoose";
import { PurchaseSubProduct } from "./purchase.subproduct.model";

export class Inventory {
  @prop({ required: true, ref: () => PurchaseSubProduct })
  subProduct!: Ref<PurchaseSubProduct>;

  @prop({ required: true })
  sku: string;

  @prop({ required: true })
  quantityChanged: number;

  @prop({ required: true })
  transactionType: string;

  @prop()
  notes: string;

  @prop({default:0})
  sellPrice: number;

  @prop({ required: true })
  newQuantity: number;
}

export const InventoryModel = getModelForClass(Inventory, {
  schemaOptions: { timestamps: true },
});
