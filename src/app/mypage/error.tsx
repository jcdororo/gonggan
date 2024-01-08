'use client' // Error components must be Client Components
 
import { useEffect } from 'react'
 
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])
 
  return (
    <div>
      <h2>Something went wrong!</h2>
      <button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </button>
    </div>
  )
}

/*
'use client'

import { useRouter } from "next/navigation";

export default function Error({error, reset}:any){
  const router = useRouter()

  setTimeout(() => {
    router.push('/signin')
  }, 1000);
  return (
    <div className="h-96 flex flex-col justify-center items-center font-bold text-2xl text-sygnature-brown">
      <div>
        세션 오류발생 <br />
        <br /><br />
      </div>

      <div>잠시 후 로그인페이지로 이동합니다.</div>
    </div>
  )
}
*/