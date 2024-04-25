import { getModelForClass, prop, Ref } from "@typegoose/typegoose";


export enum UserRole {
  ADMIN = "Admin",
  EMPLOYEE = "Employee",
  USER = "User",
  COOPERATE = "Cooperate",
}

export class User {
  @prop({ trim: true })
  fullName: string;

  @prop()
  phone: string;

  @prop({ default: "91" })
  countryCode: string;

  @prop({ trim: true })
  email: string;

  @prop({ trim: true })
  password: string;

  @prop()
  avatar?: string;

  @prop()
  fcmTokens: [string];

  @prop({ enum: UserRole })
  role: UserRole;

  @prop({ default: true })
  isActive: boolean;

  @prop({ default: false })
  isDeleted: boolean;
}


export const UserModel = getModelForClass(User, {
    schemaOptions: { timestamps: true },
});
