interface SpaceProps {
  category: string;
}

export default function Space({ category }: SpaceProps) {
  return (
    <>
      <p className="text-2xl font-bold">{category} 공간</p>
      <div className="my-5 mx-2 w-full h-1/2 border border-[#998373] rounded-md"></div>
    </>
  );
}
