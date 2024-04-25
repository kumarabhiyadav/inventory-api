import { getModelForClass, prop, Ref } from "@typegoose/typegoose";
import { Category } from "./category.model";
import { Product } from "./product.model";

export class SubProduct {
  @prop({ trim: true })
  name: String;

  @prop({ref:()=> Category})
  category:Ref<Category>

  @prop({ref:()=> Product})
  product:Ref<Product>


}


export const SubProductModel = getModelForClass(SubProduct, {
    schemaOptions: { timestamps: true },
});
