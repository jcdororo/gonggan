"use client";
import { Roboto } from "next/font/google";
import { useState } from "react";

import DetailModal from "./detail/DetailModal";
import LoginBtn from "./components/LoginBtn";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export default function Home() {
  const [detail, setDetail] = useState(false);

  const handleModal:
    | React.MouseEventHandler<HTMLDivElement>
    | undefined = (): void => {
      setDetail(!detail);
  };

  return (
    <div className={roboto.className}>
      <button>버튼</button>
      <input type="text" value="텍스트박스"></input>
      <div className="" onClick={handleModal}>
        클릭
      </div>
      <LoginBtn />
      {detail ? <DetailModal handleModal={handleModal} /> : ""}
    </div>
  );
}
