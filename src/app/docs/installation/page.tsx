import { redirect } from "next/navigation";

// /docs/installation → canonical page is /docs/getting-started
export default function InstallationPage() {
  redirect("/docs/getting-started");
}
