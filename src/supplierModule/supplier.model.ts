import { getModelForClass, prop, Ref } from "@typegoose/typegoose";

export class Supplier {
  @prop({ trim: true })
  name: string;

  @prop({})
  address: string;

  @prop({})
  mobile: string;

  @prop({ default: true })
  isActive: boolean;

  @prop({ default: false })
  isDeleted: boolean;
}


export const SupplierModel = getModelForClass(Supplier, {
    schemaOptions: { timestamps: true },
});
