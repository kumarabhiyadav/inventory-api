import { getModelForClass, prop, Ref } from "@typegoose/typegoose";

export class Reports {
  @prop({ trim: true,required:true })
  name: String;

  @prop({ trim: true })
  url: String;

  @prop({ trim: true })
  status: String;
}


export const ReportsModel = getModelForClass(Reports, {
    schemaOptions: { timestamps: true },
});
