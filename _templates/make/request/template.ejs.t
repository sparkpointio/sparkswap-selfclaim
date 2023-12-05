---
to: src/library/http/requests/<%= name %>.request.ts
# include a controller library using -c option
sh: "<%= locals.c ? `hygen make controller ${name}` : null %>"
unless_exists: true
---
import z from "zod"
import <%= name %>Model from "@/library/models/<%= name %>.model";

/**
 * Define the field rules using zod
 */
const rules = {
  find: z.object({
    id: z.preprocess((x) => Number(x), z.number())
      .refine(async (value) => {
        // Perform async validation
        // TODO: implement in a custom rule
        const <%= name %> = await <%= name %>Model.first(value)
        if (!<%= name %>) {
          return false;
        }
        return value;
      }, {message: '<%= name %> not found'}),
  }),
  store: z.object({
    <%= name %>Column: z.string()
  })
}

/**
 * Link the rules to the controller action
 */
const <%= name %>Request = {
  validate: (data: any, action: any): any => {
    switch (action) {
      case 'find':
        return rules.find.parseAsync(data)
      case 'store':
        return rules.store.parseAsync(data)
      default:
        throw new Error('Invalid Action')
    }
  }
}

export default <%= name %>Request

