import { getModelForClass, prop, Ref } from "@typegoose/typegoose";

export class Category {
  @prop({ trim: true })
  name: String;
}


export const CategoryModel = getModelForClass(Category, {
    schemaOptions: { timestamps: true },
});
