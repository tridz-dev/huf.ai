import fs from 'node:fs'
import path from 'node:path'
import { Footer, Layout, Navbar } from 'nextra-theme-docs'
import { Head, Search, SkipNavLink } from 'nextra/components'
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

async function loadMetaTitles(lang) {
  const titles = {}
  const contentDir = path.join(process.cwd(), 'content', lang)

  async function scan(dir) {
    let entries
    try {
      entries = await fs.promises.readdir(dir, { withFileTypes: true })
    } catch {
      return
    }
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name)
      if (entry.isDirectory()) {
        await scan(fullPath)
      } else if (entry.name === '_meta.json') {
        let meta
        try {
          meta = JSON.parse(await fs.promises.readFile(fullPath, 'utf-8'))
        } catch {
          continue
        }
        const relativeDir = path.relative(contentDir, dir)
        const baseRoute = relativeDir
          ? `/${lang}/${relativeDir.replace(/\\/g, '/')}`
          : `/${lang}`
        for (const [key, value] of Object.entries(meta)) {
          if (typeof value === 'string') {
            const route = path.posix.join(baseRoute, key)
            titles[route] = value
          }
        }
      }
    }
  }

  await scan(contentDir)
  return titles
}

function localizePageMap(pageMap, lang, metaTitles) {
  if (!pageMap || !Array.isArray(pageMap)) return pageMap
  return pageMap.flatMap(item => {
    if (item.name === '[lang]' && item.children) {
      return localizePageMap(item.children, lang, metaTitles)
    }
    const localized = { ...item }
    if (localized.route) localized.route = localized.route.replace(/\[lang\]/g, lang)
    if (localized.route && !localized.route.startsWith(`/${lang}`) && localized.route !== '/') {
      localized.route = `/${lang}${localized.route}`
    }
    if (localized.children) {
      const title = metaTitles?.[localized.route]
      if (title) localized.title = title
      localized.children = localizePageMap(localized.children, lang, metaTitles)
    }
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
  const metaTitles = await loadMetaTitles(lang)
  const sortedPageMap = localizePageMap(sortPageMap(pageMap, docsOrder), lang, metaTitles)
  fs.writeFileSync(`/tmp/pagemap-${lang}.json`, JSON.stringify(sortedPageMap, null, 2))

  const isArabic = lang === 'ar'

  const ui = {
    searchPlaceholder: isArabic ? 'البحث في الوثائق...' : 'Search documentation...',
    themeSwitch: isArabic
      ? { system: 'النظام', dark: 'داكن', light: 'فاتح' }
      : { system: 'System', dark: 'Dark', light: 'Light' },
    toc: isArabic
      ? { title: 'على هذه الصفحة', backToTop: 'العودة إلى الأعلى' }
      : { title: 'On This Page', backToTop: 'Scroll to top' },
    editLink: isArabic ? 'تعديل هذه الصفحة على GitHub →' : 'Edit this page on GitHub →',
    feedback: isArabic
      ? { content: 'هل لديك سؤال؟ أرسل لنا ملاحظات →', labels: 'feedback' }
      : { content: 'Question? Give us feedback →', labels: 'feedback' },
    skipLink: isArabic ? 'تخطي إلى المحتوى' : 'Skip to Content'
  }

  return (
    <html lang={lang} dir={isArabic ? 'rtl' : 'ltr'} suppressHydrationWarning>
      <Head />
      <body className={isArabic ? notoKufiArabic.className : ''}>
        <div className="huf-layout-wrapper">
          <SkipNavLink>{ui.skipLink}</SkipNavLink>
          <Layout
            navbar={navbar}
            pageMap={sortedPageMap}
            docsRepositoryBase="https://github.com/tridz-dev/agent_flo/tree/main/docs"
            footer={footer}
            search={<Search placeholder={ui.searchPlaceholder} />}
            themeSwitch={ui.themeSwitch}
            toc={ui.toc}
            editLink={ui.editLink}
            feedback={ui.feedback}
          >
            {children}
          </Layout>
        </div>
      </body>
    </html>
  )
}
