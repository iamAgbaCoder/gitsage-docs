import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "GitSage Central Dashboard",
  description: "Manage your GitSage Intelligence Engine API keys, usage, and preferences.",
};

import DashboardLayoutClient from "./DashboardLayoutClient";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <DashboardLayoutClient>{children}</DashboardLayoutClient>;
}
