"use client";

import ErrorInfo from "./components/Error/ErrorInfo";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div>
      <ErrorInfo reset={reset} />
    </div>
  );
}
