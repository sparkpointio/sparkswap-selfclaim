import {NextApiRequest, NextApiResponse} from "next";
import userController from "@/library/http/controllers/user.controller";
import {executeRouteAction, HTTP_METHODS, RouteActions} from "@/library/helpers/http.helper";
import conf from "@/config/index";
import {GuardEnum} from "@/library/enums/guards.enum";
import {RouteGuards} from "@/library/helpers/guard.helper";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {POST, GET} = HTTP_METHODS
  const routeActions: RouteActions = {
    [GET]: userController.all,
    [POST]: userController.store,
  }
  const routeGuards: RouteGuards = {
    [GET]: [GuardEnum.AUTH],
    [POST]: [GuardEnum.AUTH]
  }
  /**
   * Add your routes here
   */
  return await executeRouteAction(routeActions, req, res, routeGuards)
}

// force use formidable as parser
export const config = conf.api.routes.config;
