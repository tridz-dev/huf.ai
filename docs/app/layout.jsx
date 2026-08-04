import { Footer, Layout, Navbar } from 'nextra-theme-docs'
import { Head } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import Script from 'next/script'
import 'nextra-theme-docs/style.css'

export const metadata = {
  title: 'Huf Documentation',
  description: 'Documentation for Huf - AI agents for Frappe Framework'
}

const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
const clarityProjectId = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID
const enableGa = gaMeasurementId?.startsWith('G-')
const enableClarity =
  Boolean(clarityProjectId) && clarityProjectId !== 'your-clarity-project-id'

const navbar = (
  <Navbar
    logo={
      <>
        <span style={{ fontWeight: 800, fontSize: '1.2em' }}>Huf</span>
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
      // Sort children based on metaOrder
      const sortedChildren = [...item.children].sort((a, b) => {
        const aIndex = metaOrder.indexOf(a.name)
        const bIndex = metaOrder.indexOf(b.name)
        if (aIndex === -1 && bIndex === -1) return 0
        if (aIndex === -1) return 1
        if (bIndex === -1) return -1
        return aIndex - bIndex
      })
      
      // Recursively sort nested children
      return {
        ...item,
        children: sortedChildren.map(child => {
          if (child.children) {
            // Handle nested folders (like concepts, tools, guides)
            const childMeta = metaOrder.find(m => typeof m === 'object' && m[child.name])
            if (childMeta && typeof childMeta === 'object') {
              return sortPageMap(child, Object.keys(childMeta[child.name] || {}))
            }
            return child
          }
          return child
        })
      }
    }
    return item
  })
}

export default async function RootLayout({ children }) {
  const pageMap = await getPageMap()
  
  // Define the desired order from _meta.json
  const docsOrder = [
    'quick-start',
    'installation',
    'concepts',
    'tools',
    'use-cases',
    'examples',
    'guides',
    'development'
  ]
  
  // Sort the pageMap
  const sortedPageMap = sortPageMap(pageMap, docsOrder)
  
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <Head />
      <body>
        {enableGa && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`}
              strategy="afterInteractive"
            />
            <Script id="gtag-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaMeasurementId}');
              `}
            </Script>
          </>
        )}
        {enableClarity && (
          <Script id="clarity-init" strategy="afterInteractive">
            {`
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "${clarityProjectId}");
            `}
          </Script>
        )}
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
