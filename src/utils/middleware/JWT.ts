import { NextFunction, Request, Response } from "express";
import { sign, verify } from "jsonwebtoken";
import { UserModel } from "../../auth/User.model";

export const createAccessToken = async (
  userId: any,
  type: string
): Promise<string> => {
  let token = sign({ userId, type }, process.env.ACCESS_TOKEN_SECRET!, {});
  return token;
};

export const verifyJwtToken = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const authorization: string = req.headers.authorization || "";

    if (authorization) {
      const token = authorization.split(" ")[1];
      const payload: any = await verify(
        token,
        process.env.ACCESS_TOKEN_SECRET!
      );
      if (payload.type != undefined) {
        let user: any;
        user = await UserModel.findById(payload.userId);

        if (user != null) {
          req.body.user = user._id;
          req.body.userRole = payload.type;
          return next();
        } else {
          res
            .status(401)
            .json({ success: false, message: "You are not authenticated." });
        }
      } else {
        res
          .status(401)
          .json({ success: false, message: "You are not authenticated." });
      }
    } else {
      res
        .status(401)
        .json({ success: false, message: "You are not authenticated." });
    }
  } catch (error) {
    res
      .status(401)
      .json({ success: false, message: "You are not authenticated." });
  }
};
