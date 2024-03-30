import { defineStore } from "pinia";

//  Pinia User Data Store
export const useUserStore = defineStore({
    id: "userStore",
    state: () => ({
        //  user details
        user: {},
        token: null,
    }),
    actions: {
        //  set user details
        setUser(user) {
            this.user = user;
        },
        //  set token
        setToken(token) {
            this.token = token;
        },
        // get user details
        getUser() {
            return this.user;
        },
        // get token
        getToken() {
            return this.token;
        },
    },
  persist: {
        storage: sessionStorage,
    },  
});
