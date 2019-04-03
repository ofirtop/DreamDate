import utilService from '@/services/util.service';

export default {
    state: {
        notifs: []
    },
    getters: {
        notifs(state) {
            return state.notifs;
        }
    },
    mutations: {
        addNotif(state, { notif }) {
            console.log('addNotif', notif);
            notif._id = utilService.getRandId();
            notif.show = true;
            state.notifs.push(notif);
            setTimeout(() => {
                notif.show = false;//hide from user

                setTimeout(() => {//remove from store
                    let idx = state.notifs.indexOf(currNotif => currNotif._id === notif._id);
                    state.notifs.splice(idx, 1);
                }, 1000);
            }, 5 * 1000);
        }
    },
    actions: {
        addNotif({ commit }, { member, actionType }) {
            console.log('addLikeNotif', member);
            let notif = { type: actionType, member };
            commit({ type: 'addNotif', notif });
        }
    }
};