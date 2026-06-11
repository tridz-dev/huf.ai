'use client'

import { createContext, useContext, useState } from 'react'

const TabContext = createContext(null)

export function Tabs({ defaultValue, children }) {
  const [active, setActive] = useState(defaultValue)

  return (
    <TabContext.Provider value={{ active, setActive }}>
      <div className="huf-tabs">{children}</div>
    </TabContext.Provider>
  )
}

export function TabList({ children }) {
  return <div className="huf-tab-list" role="tablist">{children}</div>
}

export function Tab({ value, children }) {
  const { active, setActive } = useContext(TabContext)
  const isActive = active === value

  return (
    <button
      type="button"
      role="tab"
      aria-selected={isActive}
      className={`huf-tab ${isActive ? 'huf-tab--active' : ''}`}
      onClick={() => setActive(value)}
    >
      {children}
    </button>
  )
}

export function TabPanel({ value, children }) {
  const { active } = useContext(TabContext)
  if (active !== value) return null
  return <div className="huf-tab-panel" role="tabpanel">{children}</div>
}
