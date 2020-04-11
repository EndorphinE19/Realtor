<template>
    <div class="top-panel">
        <menus />
    </div>
</template>
<script lang="ts">
import Vue from 'vue'
import menus from './menus/menus'
export default Vue.extend({
    name:'topPanel',
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