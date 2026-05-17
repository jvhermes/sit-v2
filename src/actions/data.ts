"use server"

import { demoStore } from "@/data/demo-store"

export const getAdminData = async () => {
  return demoStore.getAdminData()
}
