"use client"

import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from "react"

export type DemoView = "prefeitura" | "cartorio"

type DemoViewContextType = {
  view: DemoView
  setView: (view: DemoView) => void
}

const DemoViewContext = createContext<DemoViewContextType>({
  view: "prefeitura",
  setView: () => undefined,
})

const STORAGE_KEY = "sit-demo-view"

export function DemoViewProvider({ children }: { children: ReactNode }) {
  const [view, setViewState] = useState<DemoView>("prefeitura")

  useEffect(() => {
    const storedView = window.localStorage.getItem(STORAGE_KEY)
    if (storedView === "prefeitura" || storedView === "cartorio") {
      setViewState(storedView)
    }
  }, [])

  const setView = useCallback((nextView: DemoView) => {
    setViewState(nextView)
    window.localStorage.setItem(STORAGE_KEY, nextView)
  }, [])

  const value = useMemo(() => ({ view, setView }), [setView, view])

  return (
    <DemoViewContext.Provider value={value}>
      {children}
    </DemoViewContext.Provider>
  )
}

export function useDemoView() {
  return useContext(DemoViewContext)
}
