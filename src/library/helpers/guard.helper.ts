import {AuthUser} from "@/library/helpers/auth.helper";
import {GuardEnum} from "@/library/enums/guards.enum";
import {HTTP_METHODS} from "@/library/helpers/http.helper";
import {RouteError} from "@/library/errors/RouteError";
import config from "@/config/index";

export type RouteGuards = {
  [HTTP_METHODS.GET]?: GuardEnum[]
  [HTTP_METHODS.POST]?: GuardEnum[]
  [HTTP_METHODS.PUT]?: GuardEnum[]
  [HTTP_METHODS.PATCH]?: GuardEnum[]
  [HTTP_METHODS.DELETE]?: GuardEnum[]
}

export const authGuard = {
  [GuardEnum.AUTH]: (user: AuthUser) => {
    if (!user) {
      throw new RouteError('User not logged in')
    }
    return true
  },
  [GuardEnum.UNAUTH]: (user: AuthUser) => {
    if (user) {
      throw new RouteError('User is logged in')
    }
    return true
  },
  [GuardEnum.PUBLIC]: (user: AuthUser) => {
    return true
  }
}

export const checkGuards = async (user: AuthUser, routeGuards: RouteGuards | undefined | null, routeMethod: HTTP_METHODS) => {
  if (!config.app.guards.enabled) {
    return
  }
  if (routeGuards && routeGuards[routeMethod]) {
    const guards = <GuardEnum[]>routeGuards[routeMethod]
    for (const apiGuard of guards) {
      authGuard[apiGuard](user)
    }
  }
}


