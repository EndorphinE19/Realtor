import firebase from 'firebase/app'

export default {
    state: {
        realtors: []
    },
    mutations: {
        addRealtorToRead(state: any, data: any) {

            data.forEach((item: any, i: number) => {
                data[i]['date'] = new Date(data[i]['date'])
            })

            state.realtors = data
        },
        removeRealtor(state: any, data: any) {
            state.realtors = state.realtors.splice(state.realtors[data].id, 1)
        }
    },
    actions: {

        async getArrayRealtors(ctx: any) {

            const dbRef = await firebase.database().ref('/realtors');
            dbRef.on('value', snap => {
                ctx.commit('addRealtorToRead', snap.val())
            });
        },

        async updateRealtor(ctx: any, data: any) {

            return new Promise(async (res: Function, rej: Function) => {

                try {
                    await firebase.database().ref(`/realtors/${data.id}`).update({
                        id: data.id,
                        guid: data.guid,
                        firstname: data.firstname,
                        lastname: data.lastname,
                        subdivision: data.subdivision,
                        date: data.date
                    })

                    res()
                    
                } catch(e) {
                    throw new Error(e)
                }
            })
        },

        async createRealtor(ctx: any, data: any) {

            return new Promise(async (res: Function, rej: Function) => {

                try {
                    await firebase.database().ref('/realtors').child(ctx.state.realtors[ctx.state.realtors.length + - 1].id + 1).set({
                        id: ctx.state.realtors[ctx.state.realtors.length - 1 || 0].id + 1,
                        guid: ctx.state.realtors[ctx.state.realtors.length - 1 || 0].guid + 1,
                        firstname: data.firstname,
                        lastname: data.lastname,
                        subdivision: data.subdivision,
                        date: data.date
                    })

                    res()
                    
                } catch(e) {
                    throw new Error(e)
                }
            })
        },

        async setRealtor(ctx: any, data: any) {
            await firebase.database().ref('/realtors').set(data)
        },

        async removeRealtor(ctx: any, data: any) {
        
            return new Promise(async (res: Function, rej: Function) => {

                try {
                    await firebase.database().ref(`/realtors/${data}`).remove()
                    
                    res(true)
                    
                } catch(e) {
                    throw new Error(e)
                }
            })
        }
    },
    getters: {
        getRealtors(state: any) {
            return state.realtors
        }
    }
}