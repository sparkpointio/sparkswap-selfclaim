---
to: src/library/models/<%= name %>.model.ts
---
import prisma from "@/library/prisma";
import {Prisma, <%= h.capitalize(name) %>} from "@prisma/client";

const <%= name %>Model = {
  ...prisma.<%= name %>,
  first: async (value: any, column: keyof <%= h.capitalize(name) %> = 'id'): Promise<<%= h.capitalize(name) %> | null> => {
    return prisma.<%= name %>.findFirst({
      where: {
        [column]: value
      }
    })
  },
  all: async (options?: Prisma.<%= h.capitalize(name) %>FindManyArgs): Promise<<%= h.capitalize(name) %>[] | null> => {
    return prisma.<%= name %>.findMany(options)
  },
  softDelete: () => {
  },
}

export default <%= name %>Model
