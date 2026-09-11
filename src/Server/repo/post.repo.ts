import type { PostStatus, Prisma } from '@prisma/client'
import { db } from './db.repo'

const postInclude = {
    user: {
        select: {
            id: true,
            username: true,
            avatarUrl: true,
            role: true
        }
    },
    tags: true
} satisfies Prisma.PostInclude

export const postRepo = {
    findPostBySlug: async (slug: string) => {
        return db.post.findFirst({ where: { slug, deletedAt: null }, include: postInclude })
    },

    findPostById: async (id: number, includeDeleted = false) => {
        return db.post.findFirst({
            where: includeDeleted ? { id } : { id, deletedAt: null },
            include: postInclude
        })
    },

    listPost: async (
        options: {
            page?: number
            limit?: number
            status?: PostStatus
            userId?: number
            tagId?: number
            includeDeleted?: boolean
        } = {}
    ) => {
        const page = Number.isInteger(options.page) && (options.page ?? 0) >= 0 ? (options.page ?? 0) : 0
        const limit =
            Number.isInteger(options.limit) && (options.limit ?? 10) > 0 ? Math.min(options.limit ?? 10, 100) : 10
        const where: Prisma.PostWhereInput = {
            ...(options.includeDeleted ? {} : { deletedAt: null }),
            ...(options.status ? { status: options.status } : {}),
            ...(options.userId ? { userId: options.userId } : {}),
            ...(options.tagId ? { tags: { some: { id: options.tagId } } } : {})
        }

        const [items, total] = await db.$transaction([
            db.post.findMany({
                skip: page * limit,
                take: limit,
                where,
                include: postInclude,
                orderBy: [{ pinned: 'desc' }, { createdAt: 'desc' }]
            }),
            db.post.count({ where })
        ])

        return { items, total, page, limit }
    },

    insert: async (postData: Prisma.PostCreateInput) => {
        return db.post.create({ data: postData, include: postInclude })
    },

    update: async (id: number, postData: Prisma.PostUpdateInput) => {
        return db.post.update({ where: { id }, data: postData, include: postInclude })
    },

    setTags: async (id: number, tagIds: number[]) => {
        return db.post.update({
            where: { id },
            data: { tags: { set: tagIds.map(tagId => ({ id: tagId })) } },
            include: postInclude
        })
    },

    publish: async (id: number) => {
        return db.post.update({ where: { id }, data: { status: 'Published' }, include: postInclude })
    },

    archive: async (id: number) => {
        return db.post.update({ where: { id }, data: { status: 'Archived' }, include: postInclude })
    },

    delete: async (id: number) => {
        return db.post.update({ where: { id }, data: { deletedAt: new Date() }, include: postInclude })
    },

    restore: async (id: number) => {
        return db.post.update({ where: { id }, data: { deletedAt: null }, include: postInclude })
    }
}
