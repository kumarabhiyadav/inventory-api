import { getModelForClass, prop, Ref } from "@typegoose/typegoose";
import { SubProduct } from "./subproduct.model";


export class PurchaseSubProduct {
    @prop()
    id: string;
  
    @prop({ required: true })
    cost: number;
  
    @prop({ required: true })
    image: string;
  

    @prop({ ref: ()=>SubProduct })
    subproduct: Ref<SubProduct>;
  
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