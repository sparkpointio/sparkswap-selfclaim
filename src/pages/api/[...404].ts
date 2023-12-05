import {NextApiRequest, NextApiResponse} from "next";
import {getHttpStatus} from "@/library/helpers/http.helper";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  return res.status(getHttpStatus("NOT_FOUND").code).json({
    message: getHttpStatus("NOT_FOUND").phrase,
  })
}
