import { connectDB } from "@/util/database";
import Place from "./Place";
import { ObjectId } from "mongodb";
import { PlaceProps } from "./Place"



export default async function HotPlace() {
  let result: PlaceProps[] = [];

  try {
    const db = (await connectDB).db('gonggan')
    result = await db.collection('place').find().toArray() as unknown as PlaceProps[];    
    console.log('result',result)
  } catch (error) {
    console.log('error',error)
  }

  


  return (
    <div className="left-96 absolute w-90 h-80">
      <div className="text-2xl font-bold mb-2">핫한 공간</div>
      <div className="border-2 border-sygnature-brown rounded-lg h-auto">
        <Place result={result}/>
      </div>
    </div>
  )
}