import z from "zod"
import airdropModel from "@/library/models/airdrop.model";

/**
 * Define the field rules using zod
 */
const rules = {
  find: z.object({
    id: z.preprocess((x) => Number(x), z.number())
      .refine(async (value) => {
        // Perform async validation
        // TODO: implement in a custom rule
        const airdrop = await airdropModel.first(value)
        if (!airdrop) {
          return false;
        }
        return value;
      }, {message: 'airdrop not found'}),
  }),
  store: z.object({
    name: z.string(),
    contractAddress: z.string(),
    merkleRoot: z.string(),
    tokenTotal: z.string(),
    tokenTotalHex: z.string(),
    rewardTokenAddress: z.string(),
    startsAt: z.string().datetime(),
    expiresAt: z.string().datetime(),
    creatorId: z.number()
  })
}

/**
 * Link the rules to the controller action
 */
const airdropRequest = {
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

export default airdropRequest

