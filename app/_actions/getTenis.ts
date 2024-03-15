"use server";

import { db } from "@/lib/prisma"
import { Prisma } from "@prisma/client";

export const getTenisQuantity = async (search?: string) => {
  let whereClause: Prisma.TenisWhereInput = {};

  if (search) {
    whereClause = {
      OR: [
        { nome: { contains: search, mode: 'insensitive' } },
        { marca: { contains: search, mode: 'insensitive' } },
        { categoria: { contains: search, mode: 'insensitive' } },
      ],
    };
  }

  const quantity = await db.tenis.count({
    where: whereClause
  })
  
  return quantity
}

export const getTenisById = async (id: number) => {
  const tenis = await db.tenis.findFirst({
    where: {
      id: id
    }
  })
  return tenis
}

export const getOrSearchTenis = async (page: number, search?: string) => {
  let whereClause: Prisma.TenisWhereInput = {};

  if (search) {
    whereClause = {
      OR: [
        { nome: { contains: search, mode: 'insensitive' } },
        { marca: { contains: search, mode: 'insensitive' } },
        { categoria: { contains: search, mode: 'insensitive' } },
      ],
    };
  }

  const tenis = await db.tenis.findMany({
    where: whereClause,
    skip: (page - 1) * 10,
    take: 10,
    orderBy: { id: 'asc' },
  });

  return tenis;
}
