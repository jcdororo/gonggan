import { NextApiRequest, NextApiResponse } from "next";

export default function handler(request:NextApiRequest, response:NextApiResponse) {

  console.log('request@@@@',request.body)

}