import { Request, Response, NextFunction } from "express";
import { successResponse } from "../utils/response";
import * as service from "../services/libraryService";

export const borrowBook = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { memberCode, bookCode } = req.body;
    const result = await service.borrowBook(memberCode, bookCode);

    res.json(successResponse(result, "Book borrowed successfully"));
  } catch (err) {
    next(err);
  }
};

export const returnBook = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { memberCode, bookCode } = req.body;
    const result = await service.returnBook(memberCode, bookCode);

    res.json(successResponse(result, "Book returned successfully"));
  } catch (err) {
    next(err);
  }
};

export const getBooks = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await service.getBooks();

    res.json(successResponse(result));
  } catch (err) {
    next(err);
  }
};

export const getMembers = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await service.getMembers();

    res.json(successResponse(result));
  } catch (err) {
    next(err);
  }
};
