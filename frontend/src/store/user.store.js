import userService from '@/services/user.service.js';
import utilService from "@/services/util.service.js";

export default {
    state: {
        loggedInUser: null,
    },
    mutations: {
        setLoggedInUser(state, { user }) {
            state.loggedInUser = user;
        },
        markWatchedMeMembersAsRead(state) {
            state.loggedInUser.membersWhoWatchedMe.forEach(member => {
                member.isRead = true;
            });
        },
        addWatchFromMember(state, { memberId }) {
            let member = state.loggedInUser.membersWhoWatchedMe.find(currMember => currMember.id === memberId)
            if (member) member.date = new Date();
            else {
                state.loggedInUser.membersWhoWatchedMe.push({ id: memberId, isRead: false, date: new Date() });
            }
        },
    },
    getters: {
        loggedInUser(state) {
            return state.loggedInUser;
        },
        newMembersWhoWatchedCount(state) {
            if (state.loggedInUser) {
                return state.loggedInUser.membersWhoWatchedMe.filter(member => !member.isRead).length;
            }
        },
    },
    actions: {
        async loginUser({ commit }, { userCredentials }) {
            try {
                let loggedInUser = await userService.login(userCredentials);
                commit({ type: 'setLoggedInUser', user: loggedInUser });
                console.log('logged in:', loggedInUser._id);
                utilService.saveToStorage("loggedInUser", loggedInUser);
                return Promise.resolve(loggedInUser);
            } catch{
                return Promise.reject();
            }
        },
        async logoutUser({ commit }) {
            localStorage.removeItem("loggedInUser");
            await userService.logout();
            commit({ type: 'setLoggedInUser', user: null });
            console.log('logged out');
        },
        async signupUser({ commit }, { userCredentials }) {
            try {
                let loggedInUser = await userService.signup(userCredentials);
                commit({ type: 'setLoggedInUser', user: loggedInUser });
                console.log('logged in:', loggedInUser._id);
                utilService.saveToStorage("loggedInUser", loggedInUser);
                return Promise.resolve(loggedInUser);
            } catch{
                return Promise.reject();
            }
        },
        async updateUser({ commit }, { user }) {
            await userService.updateUser(user);
            commit({ type: 'setLoggedInUser', user });
        },
        async addNewUser({ commit }, { user }) {
            let newUser = await userService.addNewUser(user);
            commit({ type: 'setLoggedInUser', user: newUser })
        },
        watchMember({ state }, { memberId }) {
            memberService.watchMember(state.loggedInUser._id, memberId);
        },
        markWatchedMeMembersAsRead({ commit, state }) {
            commit({ type: 'markWatchedMeMembersAsRead' });
            return userService.update(state.loggedInUser);
        },
    }
};