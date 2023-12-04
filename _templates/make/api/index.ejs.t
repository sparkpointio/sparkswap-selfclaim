---
to: src/pages/api/<%= name %>s/index.ts
unless_exists: true
---
import {NextApiRequest, NextApiResponse} from "next";
import <%= name %>Controller from "@/library/http/controllers/<%= name %>.controller";
import {executeRouteAction, HTTP_METHODS, RouteActions} from "@/library/helpers/http.helper";
import conf from "@/config/index";
import {GUARDS} from "@/library/enums/guards.enum";
import {RouteGuards} from "@/library/helpers/guard.helper";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {POST, GET} = HTTP_METHODS
  const routeActions: RouteActions = {
    [GET]: <%= name %>Controller.all,
    [POST]: <%= name %>Controller.store,
  }
  const routeGuards: RouteGuards = {
    // [GET]: [GUARDS.AUTH], // register guards here
  }
  /**
   * Add your routes here
   */
  return await executeRouteAction(routeActions, req, res, routeGuards)
}

// force use formidable as parser
export const config = conf.api.routes.config;




