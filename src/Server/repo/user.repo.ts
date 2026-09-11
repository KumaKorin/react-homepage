import type { Prisma } from '@prisma/client'
import { db } from './db.repo'
import { randomUUID } from 'crypto'

export const userRepo = {
    findUser: async (identifier: 'username' | 'email', value: string) => {
        return db.user.findFirst({
            where: {
                [identifier]: value,
                deletedAt: null
            }
        })
    },

    findUserById: async (id: number) => {
        return db.user.findFirst({ where: { id, deletedAt: null } })
    },

    listUser: async (page = 0, limit = 10) => {
        const validPage = Number.isInteger(page) && page >= 0 ? page : 0
        const validLimit = Number.isInteger(limit) && limit > 0 ? Math.min(limit, 100) : 10
        const where: Prisma.UserWhereInput = { deletedAt: null }

        const [items, total] = await db.$transaction([
            db.user.findMany({
                skip: validPage * validLimit,
                take: validLimit,
                where,
                orderBy: { createdAt: 'desc' },
                select: {
                    id: true,
                    avatarUrl: true,
                    role: true,
                    username: true,
                    email: true,
                    authProvider: true,
                    passportProfileId: true,
                    createdAt: true,
                    updatedAt: true,
                    deletedAt: true,
                    lastLogin: true
                }
            }),
            db.user.count({ where })
        ])

        return { items, total, page: validPage, limit: validLimit }
    },

    insert: async (userData: Prisma.UserCreateInput) => {
        return db.user.create({ data: userData })
    },

    update: async (id: number, userData: Prisma.UserUpdateInput) => {
        const user = await userRepo.findUserById(id)
        return user ? db.user.update({ where: { id }, data: userData }) : null
    },

    delete: async (id: number) => {
        const user = await userRepo.findUserById(id)
        if (!user) return null

        return db.user.update({
            where: { id },
            data: {
                username: `${randomUUID()}`,
                email: `${randomUUID()}@user.local`,
                passportProfileId: null,
                password: null,
                deletedAt: new Date()
            }
        })
    }
}
