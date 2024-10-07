

import { useFriendStore } from "@/stores/friend"
import { useGroupStore } from "@/stores/group"
import { useMessageStore } from "@/stores/message"
import { useUserStore } from "@/stores/user"
import { UserSummary } from "@/types"
import toast from "react-hot-toast"

export const toLogin = async (user:UserSummary) => {
    const res = await useUserStore.getState().login(user.username, '123456')
    if (res.success) {
        toast.success( `Logined as user: ${user.username}`)
        location.href = '/'
        
        useMessageStore.getState().clear()
        useGroupStore.getState().clear()
        useFriendStore.getState().clear()

        
    } else {
        toast.error(res.message)
    }
}