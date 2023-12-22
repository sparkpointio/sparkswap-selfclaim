import {NextApiRequest, NextApiResponse} from "next";
import airdropModel from "@/library/models/airdrop.model";
import {extractFormData, getHttpStatus, parseFormData} from "@/library/helpers/http.helper";
import airdropRequest from "@/library/http/requests/airdrop.request";
import {getAuthUser} from "@/library/helpers/auth.helper";
import airdropUserModel from "@/library/models/airdropUser.model";
import userModel from "@/library/models/user.model";

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
    const creator = (await getAuthUser(req)).session
    const inputData = extractFormData(formData, airdropModel.fillable)
    const validatedAirdropData = await airdropRequest.validate({
      ...inputData,
      creatorId: creator.id
    }, 'store');

    const data = await airdropModel.create({
      data: validatedAirdropData
    });

    // save recipients
    const validatedAirdropUserData: {
      merkleInfo: string;
      rawRecipientList: string;
    } = await airdropRequest.validate({
      ...inputData
    }, 'storeRecipients');

    const merkleInfo = JSON.parse(validatedAirdropUserData.merkleInfo)
    const rawRecipientList = JSON.parse(validatedAirdropUserData.rawRecipientList)

    const userList = await userModel.createUsersFromMerkle(
      merkleInfo,
      creator.id
    )

    await airdropUserModel.createManyWithMerkle(
      {
        airdrop: data,
        rewardTokenAddress: validatedAirdropData.rewardTokenAddress,
        merkleInfo: merkleInfo,
        rawRecipientList: rawRecipientList
      },
      userList
    )

    return res.status(getHttpStatus("OK").code).json({data: data, success: true})
  },
  update: () => {
  },
  delete: () => {
  },
}

export default airdropController



