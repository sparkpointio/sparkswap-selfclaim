---
to: src/database/factory/<%= name %>.factory.ts
---
import {faker} from "@faker-js/faker";
import <%= name %>Model from "@/library/models/<%= name %>.model";
import {Prisma, <%= h.capitalize(name) %>} from "@prisma/client";

const <%= name %>Factory = {
  definition: <Prisma.<%= h.capitalize(name) %>CreateArgs> {
    data: {<%= name %>Column: faker.string.hexadecimal({length: 40})}
  },
  reloadDefinition: () => {
    <%= name %>Factory.setDefinition({
      <%= name %>Column: faker.string.hexadecimal({length: 10})
    })

    return <%= name %>Factory
  },
  setDefinition: (definition:Prisma.<%= h.capitalize(name) %>CreateInput) => {
    <%= name %>Factory.definition = {
      data: {...definition}
    }

    return <%= name %>Factory
  },
  create: async (quantity = 1): Promise<<%= h.capitalize(name) %>[]> => {
    let records: <%= h.capitalize(name) %>[] = [];
    for (let i = 0; i < quantity; i++) {
      <%= name %>Factory.reloadDefinition()
      records.push(await <%= name %>Model.create(<%= name %>Factory.definition))
    }
    return records
  }
}

export default <%= name %>Factory
