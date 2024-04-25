import { getModelForClass, prop, Ref } from "@typegoose/typegoose";

export class Finance {
  @prop({ trim: true })
  date: Date;

  @prop({})
  onlineAmount: number;

  @prop()
  cashAmount: number;

  @prop({ default: true })
  isActive: boolean;

  @prop({ default: false })
  isDeleted: boolean;
}


export const FinanceModel = getModelForClass(Finance, {
    schemaOptions: { timestamps: true },
});
