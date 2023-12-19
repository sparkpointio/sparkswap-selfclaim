import {NextApiRequest, NextApiResponse} from "next";
import {StatusCodes} from "http-status-codes";
import formidable from "formidable";
import {ZodError} from "zod";
import {fromZodError} from "zod-validation-error";
import {serializeError} from "eth-rpc-errors";
import {checkGuards, RouteGuards} from "@/library/helpers/guard.helper";
import {getAuthUser} from "@/library/helpers/auth.helper";
import {RouteError} from "@/library/errors/RouteError";

export enum HTTP_METHODS {
  GET = 'GET',
  POST = 'POST',
  PATCH = 'PATCH',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export type RouteActions = {
  [HTTP_METHODS.GET]?: any
  [HTTP_METHODS.POST]?: any
  [HTTP_METHODS.PUT]?: any
  [HTTP_METHODS.PATCH]?: any
  [HTTP_METHODS.DELETE]?: any
}

const checkRouteAction = (method: HTTP_METHODS, actions: RouteActions) => {
  if (!method || !actions[method as HTTP_METHODS]) {
    throw new RouteError('Action not allowed')
  }
}

export const executeRouteAction = async (
  actions: RouteActions,
  req: NextApiRequest,
  res: NextApiResponse,
  guards?: RouteGuards
) => {
  const method = <HTTP_METHODS>req.method

  try {
    /**
     * Execute guards if there's any
     */
    await checkGuards(await getAuthUser(req), guards, method)
    checkRouteAction(method, actions)
    /**
     * Try running the specific action from the controller
     */
    return await actions[method](req, res)
  } catch (e: any) {
    let responseStatus = getHttpStatus('METHOD_NOT_ALLOWED')

    if (e instanceof ZodError || e.constructor.name === 'ZodError') {
      responseStatus = getHttpStatus('BAD_REQUEST')
      e = {message: fromZodError(e).toString()}
    } else {
      responseStatus = getHttpStatus('INTERNAL_SERVER_ERROR')
      e = serializeError(e)
    }

    return res
      .status(responseStatus.code)
      .json({error: e.message, success: false})
  }
}

export const parseFormData = async (req: NextApiRequest): Promise<{ primary: any, files: any }> => {
  const form = formidable()

  const formData = await form.parse(req)

  return {
    primary: formData[0],
    files: formData[1]
  }
}
/**
 * this is just a basic implementation, it can't handle files or array of values just yet
 * todo: add support for files and array of values
 * @param formData
 * @param fillable
 */
export const extractFormData = (formData: any, fillable?: string[]): { [key: string] : any } => {
  const formEntry = formData.primary;
  const inputData: any = {};

  for (const [key, value] of Object.entries(formEntry) as Array<[string, any]>) {
    if (fillable && fillable.includes(key)) {
      inputData[key] = value?.[0];
    } else {
      inputData[key] = value?.[0];
    }
  }

  return inputData;
}

export type HttpStatus = {
  code: any,
  phrase: string
}
export const getHttpStatus = (responsePhrase: keyof typeof StatusCodes): HttpStatus => {
  return {
    code: StatusCodes[responsePhrase],
    phrase: responsePhrase
  }
}
