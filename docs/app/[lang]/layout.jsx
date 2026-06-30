import { Footer, Layout, Navbar } from 'nextra-theme-docs'
import { Head } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import { Noto_Kufi_Arabic } from 'next/font/google'
import 'nextra-theme-docs/style.css'
import '../globals.css'

const notoKufiArabic = Noto_Kufi_Arabic({
  subsets: ['arabic'],
  variable: '--font-noto-kufi-arabic',
  display: 'swap'
})

export const metadata = {
  title: 'HUF Documentation',
  description: 'Documentation for HUF — the AI engine you actually control. Open-source agent infrastructure built on Frappe.'
}

const navbar = (
  <Navbar
    logo={
      <>
        <span style={{ fontFamily: "'Big Shoulders', sans-serif" }}>HUF</span>
      </>
    }
    projectLink="https://github.com/tridz-dev/agent_flo"
  />
)

const footer = (
  <Footer>
    AGPL {new Date().getFullYear()} ©{' '}
    <a href="https://tridz.com" target="_blank" rel="noreferrer">
      Tridz Technologies Ltd
    </a>
  </Footer>
)

function sortPageMap(pageMap, metaOrder) {
  if (!pageMap || !Array.isArray(pageMap)) return pageMap
  return pageMap.map(item => {
    if (item.children && Array.isArray(item.children)) {
      const sortedChildren = [...item.children].sort((a, b) => {
        const aIndex = metaOrder.indexOf(a.name)
        const bIndex = metaOrder.indexOf(b.name)
        if (aIndex === -1 && bIndex === -1) return 0
        if (aIndex === -1) return 1
        if (bIndex === -1) return -1
        return aIndex - bIndex
      })
      return {
        ...item,
        children: sortedChildren.map(child => {
          if (child.children) {
            const childMeta = metaOrder.find(m => typeof m === 'object' && m[child.name])
            if (childMeta && typeof childMeta === 'object') {
              return sortPageMap(child, Object.keys(childMeta[child.name] || {}))
            }
          }
          return child
        })
      }
    }
    return item
  })
}

function localizePageMap(pageMap, lang) {
  if (!pageMap || !Array.isArray(pageMap)) return pageMap
  return pageMap.flatMap(item => {
    if (item.name === '[lang]' && item.children) {
      return localizePageMap(item.children, lang)
    }
    const localized = { ...item }
    if (localized.route) localized.route = localized.route.replace(/\[lang\]/g, lang)
    if (localized.route && !localized.route.startsWith(`/${lang}`) && localized.route !== '/') {
      localized.route = `/${lang}${localized.route}`
    }
    if (localized.children) localized.children = localizePageMap(localized.children, lang)
    return [localized]
  })
}

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'ar' }]
}

export default async function RootLayout({ children, params }) {
  const { lang } = await params
  const pageMap = await getPageMap(`/${lang}`)
  const docsOrder = [
    'quick-start', 'installation', 'concepts', 'tools',
    'use-cases', 'examples', 'guides', 'development'
  ]
  const sortedPageMap = localizePageMap(sortPageMap(pageMap, docsOrder), lang)

  return (
    <html lang={lang} dir={lang === 'ar' ? 'rtl' : 'ltr'} suppressHydrationWarning>
      <Head />
      <body className={lang === 'ar' ? notoKufiArabic.className : ''}>
        <Layout
          navbar={navbar}
          pageMap={sortedPageMap}
          docsRepositoryBase="https://github.com/tridz-dev/agent_flo/tree/main/docs"
          footer={footer}
        >
          {children}
        </Layout>
      </body>
    </html>
  )
}
