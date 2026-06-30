// debug: inspect pageMap structure for /ar
import { getPageMap } from 'nextra/page-map'

async function debug() {
  const pm = await getPageMap('/ar')
  
  function inspect(items, depth = 0) {
    for (const item of items) {
      const indent = '  '.repeat(depth)
      console.log(`${indent}name: ${item.name}`)
      console.log(`${indent}  title: ${item.title || '(none)'}`)
      console.log(`${indent}  route: ${item.route || '(none)'}`)
      console.log(`${indent}  type: ${item.children ? 'folder' : 'leaf'}`)
      if (item.children) {
        inspect(item.children, depth + 1)
      }
    }
  }
  
  inspect(pm)
}

debug().catch(console.error)
