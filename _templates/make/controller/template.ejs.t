---
to: src/library/http/controllers/<%= name %>.controller.ts
# create a controller without request library using -o option
sh: "<%= !locals.o ? `hygen make request ${name}` : null %>"
unless_exists: true
---
import {<%= h.capitalize(name) %>} from "@prisma/client";
import {NextApiRequest, NextApiResponse} from "next";
import <%= name %>Model from "@/library/models/<%= name %>.model";
import {getHttpStatus, parseFormData} from "@/library/helpers/http.helper";
<% if(locals.o){ -%>
import _ from "lodash"
<% } -%>
<% if(!locals.o){ -%>
import <%= name %>Request from "@/library/http/requests/<%= name %>.request";
<% } -%>

const <%= name %>Controller = {
  find: async (req: NextApiRequest, res: NextApiResponse) => {
  <% if(!locals.o){ %>
    const queryData = await <%= name %>Request.validate({'id': req.query.id}, 'find')
  <% } -%>
  <% if(locals.o){ -%>
    const queryData = {'id': _.toNumber(req.query.id)}
  <% } -%>

    const data = await <%= name %>Model.findFirst({
      where: queryData
    })

    return res.status(getHttpStatus("OK").code).json({data: data, success: true})
  },
  all: async (req: NextApiRequest, res: NextApiResponse) => {
    const data = await <%= name %>Model.all()

    return res.status(getHttpStatus("OK").code).json({data: data, success: true})
  },
  store: async (req: NextApiRequest, res: NextApiResponse) => {
    const formData = await parseFormData(req)

    const data = await <%= name %>Model.create({
      data: {<%= name %>Column: formData.primary.<%= name %>Column[0]}
    });

    return res.status(getHttpStatus("OK").code).json({data: data, success: true})
  },
  update: () => {
  },
  delete: () => {
  },
}

export default <%= name %>Controller



