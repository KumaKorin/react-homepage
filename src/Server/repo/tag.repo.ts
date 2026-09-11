import type { Prisma } from '@prisma/client'
import { db } from './db.repo'

export const tagRepo = {
    findTagById: async (id: number) => {
        return db.tag.findUnique({ where: { id }, include: { posts: true } })
    },

    findTagByName: async (name: string) => {
        return db.tag.findUnique({ where: { name }, include: { posts: true } })
    },

    listTag: async (page = 0, limit = 50) => {
        const validPage = Number.isInteger(page) && page >= 0 ? page : 0
        const validLimit = Number.isInteger(limit) && limit > 0 ? Math.min(limit, 100) : 50
        const where: Prisma.TagWhereInput = {}

        const [items, total] = await db.$transaction([
            db.tag.findMany({
                skip: validPage * validLimit,
                take: validLimit,
                where,
                include: { _count: { select: { posts: true } } },
                orderBy: { name: 'asc' }
            }),
            db.tag.count({ where })
        ])

        return { items, total, page: validPage, limit: validLimit }
    },

    insert: async (tagData: Prisma.TagCreateInput) => {
        return db.tag.create({ data: tagData })
    },

    update: async (id: number, tagData: Prisma.TagUpdateInput) => {
        return db.tag.update({ where: { id }, data: tagData })
    },

    delete: async (id: number) => {
        return db.tag.delete({ where: { id } })
    }
}
