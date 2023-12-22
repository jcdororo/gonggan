export default function Loading() {
  return(
    <div className="h-screen text-9xl flex flex-col justify-center items-center">
      <div className="flex items-center justify-center">
        <div className="animate-spin rounded-full h-28 w-28 border-t-4 border-blue-500"></div>
      </div>
    </div>
  )
}