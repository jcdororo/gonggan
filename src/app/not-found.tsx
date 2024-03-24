"use client";

import NotFoundInfo from "./components/Error/NotFoundInfo";

export default function NotFound({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div>
      <NotFoundInfo reset={reset} />
    </div>
  );
}
