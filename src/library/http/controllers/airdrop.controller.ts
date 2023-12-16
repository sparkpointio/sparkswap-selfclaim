import {NextApiRequest, NextApiResponse} from "next";
import airdropModel from "@/library/models/airdrop.model";
import {getHttpStatus, parseFormData} from "@/library/helpers/http.helper";
import airdropRequest from "@/library/http/requests/airdrop.request";
import {faker} from "@faker-js/faker";
import {getAuthUser} from "@/library/helpers/auth.helper";

const airdropController = {
  find: async (req: NextApiRequest, res: NextApiResponse) => {
    const queryData = await airdropRequest.validate({'id': req.query.id}, 'find')

    const data = await airdropModel.findFirst({
      where: queryData
    })

    return res.status(getHttpStatus("OK").code).json({data: data, success: true})
  },
  all: async (req: NextApiRequest, res: NextApiResponse) => {
    const data = await airdropModel.all()

    return res.status(getHttpStatus("OK").code).json({data: data, success: true})
  },
  store: async (req: NextApiRequest, res: NextApiResponse) => {
    const formData = await parseFormData(req)

    const validatedData = await airdropRequest.validate({
      name: faker.word.noun() + ' Airdrop',
      contractAddress: formData.primary.contractAddress[0],
      merkleRoot: formData.primary.merkleRoot[0],
      tokenTotal: formData.primary.tokenTotal[0],
      tokenTotalHex: formData.primary.tokenTotalHex[0],
      rewardTokenAddress: formData.primary.rewardTokenAddress[0],
      startsAt: formData.primary.startsAt[0],
      expiresAt: formData.primary.expiresAt[0],
      // startsAt: config.selfclaim.start.toISOString(),
      // expiresAt: config.selfclaim.expiry.toISOString(),
      creatorId: (await getAuthUser(req)).session.id
    }, 'store')

    const data = await airdropModel.create({
      data: validatedData
    });

    return res.status(getHttpStatus("OK").code).json({data: data, success: true})
  },
  update: () => {
  },
  delete: () => {
  },
}

export default airdropController



