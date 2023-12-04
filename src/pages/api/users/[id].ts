import {NextApiRequest, NextApiResponse} from "next";
import userController from "@/library/http/controllers/user.controller";
import {executeRouteAction} from "@/library/helpers/http.helper";
import conf from "@/config/index";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  /**
   * Add your routes here
   */
  const actions: any = {
    'GET': userController.find
  };


  // const routeGuards: RouteGuards = {} // add route guards if needed

  return await executeRouteAction(actions, req, res)
}

// force use formidable as parser
export const config = conf.api.routes.config;
