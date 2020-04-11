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
        }
    },
    actions: {

        async getArrayRealtors(ctx: any) {

            const dbRef = await firebase.database().ref('/realtors');
            dbRef.on('value', snap => {
                console.log(snap.val())
                ctx.commit('addRealtorToRead', snap.val())
            });
        },

        async setRealtor(ctx: any, data: any) {
            return new Promise(async (res: Function, rej: Function) => {

                try {
                    await firebase.database().ref('/realtors').child(data.id).set({
                        id: data.id,
                        guid: data.guid,
                        firstname: data.firstname,
                        lastname: data.lastname,
                        subdivision: data.subdivision,
                        date: data.date
                    })

                    res()
                    
                } catch(e) {
                    throw new Error()
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