import { Request } from "express";

export default async (req: Request) => {
  const { name } = req.query;
  return `Hello ${name}`;
};
