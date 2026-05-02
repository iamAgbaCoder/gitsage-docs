"use client";

import { useEffect } from "react";

const BACKEND_URL = "https://gitsage-backend-api.onrender.com/";
const INTERVAL_MS = 4 * 60 * 1000;

export default function KeepAlive() {
  useEffect(() => {
    const ping = () => {
      fetch(BACKEND_URL, { method: "HEAD", mode: "no-cors" }).catch(() => {});
    };

    ping();
    const id = setInterval(ping, INTERVAL_MS);
    return () => clearInterval(id);
  }, []);

  return null;
}
