import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";



const IndexPage = async () => {
  let session = await getServerSession(authOptions);
  console.log('session',session)

  return (
    <div>
      세션테스트
    </div>
  )
};

export default IndexPage;
