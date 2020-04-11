<template>
    <div class="newrealtor">
        <listrealtor :resultRealtor="realtor" />
    </div>
</template>
<script lang="ts">
import Vue from 'vue'
import {mapGetters, mapActions} from 'vuex'
import listrealtor from '../components/listrealtor';
export default Vue.extend({
    name:'NewRealtor',
    methods: {
        ...mapActions(['getArrayRealtors'])
    },
    computed: {

        ...mapGetters(['getRealtors']),

        realtor: {
            get() {
                return this.getRealtors.filter((item: any) => {
                    return item.id === +this.$route.params.id
                })
            }
        }
    },
    async mounted() {
        this.getArrayRealtors()
    },
    components: {
        listrealtor
    }
})
</script>