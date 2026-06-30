import nextra from 'nextra'
import { fileURLToPath } from 'node:url'
import { dirname } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))

const withNextra = nextra({
  contentDirBasePath: '/'
})

export default withNextra({
  i18n: {
    locales: ['en', 'ar'],
    defaultLocale: 'en'
  },
  output: 'export',
  outputFileTracingRoot: __dirname,
  images: {
    unoptimized: true
  },
  trailingSlash: true
})
