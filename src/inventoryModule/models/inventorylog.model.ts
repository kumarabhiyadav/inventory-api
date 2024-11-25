import { getModelForClass, prop, Ref } from "@typegoose/typegoose";
import { PurchaseSubProduct } from "./purchase.subproduct.model";
import { Inventory } from "./inventory.model";

export class InventoryLog {
  @prop({ required: true })
  inventory: Ref<Inventory>;

  @prop({ required: true })
  cost: number;

  @prop({ required: true })
  qyt: number;
  
  @prop()
  notes: string;

  @prop()
  createdAt!:Date
}

export const InventoryLogModel = getModelForClass(InventoryLog, {
  schemaOptions: { timestamps: true },
});
