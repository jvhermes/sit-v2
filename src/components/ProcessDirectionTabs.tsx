"use client"

import { Button } from "@/components/ui/button"

export type ProcessDirection = "recebidos" | "enviados"

type ProcessDirectionTabsProps = {
  value: ProcessDirection
  onChange: (value: ProcessDirection) => void
  recebidosLabel?: string
  enviadosLabel?: string
}

export function ProcessDirectionTabs({
  value,
  onChange,
  recebidosLabel = "Recebidos",
  enviadosLabel = "Enviados",
}: ProcessDirectionTabsProps) {
  return (
    <div className="inline-flex rounded-md border border-primary/20 bg-secondary p-1 shadow-sm">
      <Button
        type="button"
        size="sm"
        variant={value === "recebidos" ? "default" : "secondary"}
        className="rounded-sm"
        onClick={() => onChange("recebidos")}
      >
        {recebidosLabel}
      </Button>
      <Button
        type="button"
        size="sm"
        variant={value === "enviados" ? "default" : "secondary"}
        className="rounded-sm"
        onClick={() => onChange("enviados")}
      >
        {enviadosLabel}
      </Button>
    </div>
  )
}
