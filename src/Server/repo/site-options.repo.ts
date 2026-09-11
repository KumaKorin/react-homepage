import { db } from './db.repo'

export const siteOptionsRepo = {
    find: async (key: string) => {
        return db.siteOptions.findUnique({ where: { key } })
    },

    list: async () => {
        return db.siteOptions.findMany({ orderBy: { key: 'asc' } })
    },

    upsert: async (key: string, value: string) => {
        return db.siteOptions.upsert({
            where: { key },
            create: { key, value },
            update: { value }
        })
    },

    delete: async (key: string) => {
        return db.siteOptions.delete({ where: { key } })
    }
}
