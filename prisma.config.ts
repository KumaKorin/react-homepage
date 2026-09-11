import { defineConfig } from 'prisma/config'

const isProduction = process.env.PRODUCTION === 'true'

export default defineConfig({
    schema: 'prisma/schema.prisma',
    datasource: {
        url: isProduction ? 'file:./.database/database.db' : 'file:./.database/dev.db'
    }
})
