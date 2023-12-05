---
to: src/pages/api/<%= name %>s/[id].ts
unless_exists: true
---
import {NextApiRequest, NextApiResponse} from "next";
import <%= name %>Controller from "@/library/http/controllers/<%= name %>.controller";
import {executeRouteAction} from "@/library/helpers/http.helper";
import conf from "@/config/index";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  /**
   * Add your routes here
   */
  const actions: any = {
    'GET': <%= name %>Controller.find
  };

  return await executeRouteAction(actions, req, res)
}

// force use formidable as parser
export const config = conf.api.routes.config;



