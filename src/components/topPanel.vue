<template>
    <div class="top-panel">
        <menus :realtors="getRealtors" />
    </div>
</template>
<script lang="ts">
import Vue from 'vue'
import {mapGetters} from 'vuex'
import menus from './menus/menus'
export default Vue.extend({
    name:'topPanel',
    computed:mapGetters(['getRealtors']),
    components: {
        menus
    }
})
</script>
<style lang="scss">
    .top-panel {
        max-width: 100%;
        width: 100%;
        padding: 15px;
    }
</style>