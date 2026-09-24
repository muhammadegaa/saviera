import { useEffect, useState } from "react";
import api from "./api";
import fallback from "../../server/content.json";

export function useContent() {
  const [content, setContent] = useState(fallback);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    let active = true;
    api
      .get("/api/content")
      .then((response) => {
        if (!active) return;
        // On Vercel the SPA rewrite answers /api/content with index.html, so check the shape.
        if (response.data?.homepage && response.data?.about) {
          setContent(response.data);
          setStatus("ready");
        } else {
          setStatus("fallback");
        }
      })
      .catch(() => {
        if (active) setStatus("fallback");
      });
    return () => {
      active = false;
    };
  }, []);

  return { content, status };
}
