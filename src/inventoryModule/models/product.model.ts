import { getModelForClass, prop, Ref } from "@typegoose/typegoose";
import { Category } from "./category.model";

export class Product {
  @prop({ trim: true })
  name: String;

  @prop({ref:()=> Category})
  category:Ref<Category>


}


export const ProductModel = getModelForClass(Product, {
    schemaOptions: { timestamps: true },
});
