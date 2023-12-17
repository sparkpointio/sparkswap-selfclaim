import {NextApiRequest, NextApiResponse} from "next";
import airdropController from "@/library/http/controllers/airdrop.controller";
import {executeRouteAction} from "@/library/helpers/http.helper";
import conf from "@/config/index";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  /**
   * Add your routes here
   */
  const actions: any = {
    'GET': airdropController.find
  };

  return await executeRouteAction(actions, req, res)
}

// force use formidable as parser
export const config = conf.api.routes.config;



