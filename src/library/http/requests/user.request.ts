import z from "zod"
import {resolveAddress} from "@thirdweb-dev/sdk";
import userModel from "@/library/models/user.model";

/**
 * Define the field rules using zod
 */
const rules = {
  find: z.object({
    id: z.preprocess((x) => Number(x), z.number())
      .refine(async (value) => {
        // Perform async validation
        // TODO: implement in a custom rule
        const user = await userModel.first(value)
        if (!user) {
          return false;
        }
        return value;
      }, {message: 'User not found'}),
  }),
  store: z.object({
    walletAddress: z.string().refine(async (value) => {
      // Perform async validation
      const isValid = await resolveAddress(value);
      if (!isValid) {
        return false;
      }
      return value;
    }),
  })
}

/**
 * Link the rules to the controller action
 */
const userRequest = {
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

export default userRequest
