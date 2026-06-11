import { useMDXComponents as getNextraComponents } from 'nextra-theme-docs'

import {
  ChatTranscript,
  ChatMessage,
  AgentPrompt,
  TokenCalculation,
  TokenRow,
  TokenNote,
  ToolCallResult,
  ConfigPanel,
  ConfigField,
  ConfigSection,
  DoDont,
  Checklist,
  Tabs,
  TabList,
  Tab,
  TabPanel,
  Button,
  Mermaid
} from '@/app/components'

const nextraComponents = getNextraComponents()

export function useMDXComponents(components) {
  return {
    ...nextraComponents,
    ...components,
    ChatTranscript,
    ChatMessage,
    AgentPrompt,
    TokenCalculation,
    TokenRow,
    TokenNote,
    ToolCallResult,
    ConfigPanel,
    ConfigField,
    ConfigSection,
    DoDont,
    Checklist,
    Tabs,
    TabList,
    Tab,
    TabPanel,
    Button,
    Mermaid
  }
}
