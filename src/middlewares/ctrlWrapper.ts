import { Request, Response, NextFunction } from "express";

const ctrlWrapper = (
  controller: (req: Request, res: Response, next: NextFunction) => {}
) => {
  const func = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await controller(req, res, next);
    } catch (error) {
      next(error);
    }
  };

  return func;
};
export default ctrlWrapper;
