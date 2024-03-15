"use server";

import { db } from "@/lib/prisma"

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