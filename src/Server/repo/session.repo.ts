import type { Prisma } from '@prisma/client'
import { db } from './db.repo'

export const sessionRepo = {
    insert: async (sessionData: Prisma.SessionCreateInput) => {
        return db.session.create({ data: sessionData })
    },

    findSession: async (session: string) => {
        return db.session.findUnique({ where: { session } })
    },

    findValidSession: async (session: string, now = new Date()) => {
        return db.session.findFirst({ where: { session, expiredAt: { gt: now } } })
    },

    listByUserId: async (userId: number) => {
        return db.session.findMany({ where: { userId }, orderBy: { createdAt: 'desc' } })
    },

    delete: async (session: string) => {
        return db.session.delete({ where: { session } })
    },

    deleteByUserId: async (userId: number) => {
        return db.session.deleteMany({ where: { userId } })
    },

    deleteExpired: async (now = new Date()) => {
        return db.session.deleteMany({ where: { expiredAt: { lte: now } } })
    }
}
