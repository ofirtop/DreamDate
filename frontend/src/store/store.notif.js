import utilService from '@/services/util.service';

export default {
    state: {
        notifs: [],
        numOfSecsToShow: 5 * 1000
    },
    getters: {
        notifs(state) {
            return state.notifs;
        }
    },
    mutations: {
        hideNotif(state, { notif }) {
            console.log('hideNotif', notif);
            notif.show = false;//hide before remove from store
        },
        removeNotif(state, { notif }) {
            console.log('removeNotif', notif);
            let idx = state.notifs.indexOf(currNotif => currNotif._id === notif._id);
            state.notifs.splice(idx, 1);
        },
        addNotif(state, { notif }) {
            console.log('addNotif', notif);
            notif._id = utilService.getRandId();
            notif.show = true;
            state.notifs.push(notif);
        }
    },
    actions: {
        addNotif({ commit, state }, { member, actionType }) {
            console.log('addLikeNotif', member);
            let notif = { type: actionType, member };
            commit({ type: 'addNotif', notif });
            setTimeout(() => {
                commit({ type: 'hideNotif', notif });
                setTimeout(() => {
                    commit({ type: 'removeNotif', notif });
                }, 1000);
            }, state.numOfSecsToShow);
        }
    }
};