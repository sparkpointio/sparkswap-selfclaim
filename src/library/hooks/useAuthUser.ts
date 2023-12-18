import {useUser} from "@thirdweb-dev/react";
import {AuthUserSessionData} from "@/library/helpers/auth.helper";

export const useAuthUser = () => {
  const {user, isLoggedIn, isLoading} = useUser()

  return {
    user: user? {
      address: user?.address,
      session: user?.session as AuthUserSessionData,
      data: user?.data,
    } : undefined,
    isLoggedIn: isLoggedIn,
    isLoading: isLoading,
  }
}
