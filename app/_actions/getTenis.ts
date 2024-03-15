"use server";

import { db } from "@/lib/prisma"
import { Prisma } from "@prisma/client";

export const getTenis = async (page: number) => {
  const tenis = await db.tenis.findMany({
    skip: (page - 1) * 10,
    take: 10,
    orderBy: {
      id: 'asc'
    }
  })
  return tenis
}

export const getTenisQuantity = async () => {
  const quantity = await db.tenis.count()
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

export const searchTenis = async (search: string) => {
  const tenis = await db.tenis.findMany({
    where: {
      OR: [
        {
          nome: {
            contains: search,
            mode: 'insensitive'
          }
        },
        {
          marca: {
            contains: search,
            mode: 'insensitive'
          }
        },
        {
          categoria: {
            contains: search,
            mode: 'insensitive'
          }
        },
      ]
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
