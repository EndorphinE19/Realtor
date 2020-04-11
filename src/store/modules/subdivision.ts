import firebase from 'firebase/app'

export default {
    state: {
        subdivisions: []
    },
    mutations: {
        addSubdivisionToRead(state: any, data: any) {

            data.forEach((item: any, i: number) => {
                data[i]['date'] = new Date(data[i]['date'])
            })

            state.subdivisions = data
        }
    },
    actions: {

        async getArraySubdivisions(ctx: any) {

            const dbRef = await firebase.database().ref('/subdivision');
            dbRef.on('value', snap => {
                //console.log(snap.val())
                ctx.commit('addSubdivisionToRead', snap.val())
            });
        }
    },
    getters: {
        getSubdivisions(state: any) {
            console.log(state.subdivisions)
            return state.subdivisions
        }
    }
}