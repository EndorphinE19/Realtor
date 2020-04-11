<template>
    <div class="menu">
        <ul>
            <li>
                <router-link to="/">Главная</router-link>
                <router-link  to="/newrealtor">Новый риэлтор</router-link>
                <router-link  to="/listrealtor">Список риэлторов</router-link>
            </li>
            <li class="search-dot">
                <b-field>
                    <b-autocomplete
                        v-model="name"
                        placeholder="e.g. Anne"
                        :keep-first="keepFirst"
                        :open-on-focus="openOnFocus"
                        :data="filteredDataObj"
                        field="searchName"
                        @select="option => setTemplate(option)">
                    </b-autocomplete>
                </b-field>
            </li>
        </ul>
    </div>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    props: {
        realtors: Array
    },
    name:'menus',
    data() {
        return {
            data:'',
            keepFirst: false,
            openOnFocus: false,
            name: '',
            idUrl:'',
            selected: null,
            arr: []
        }
    },
    methods: {
        setTemplate(option: any) {
            this.$router.push('/updaterealtor/' + option.id)
        }
    },
    computed: {
        
        getRealtors() {

            this.realtors.forEach((item: any) => {
                this.arr.push({
                    id: item.id,
                    searchName: `${item.subdivision}, ${item.firstname}, ${item.lastname}`
                })
            })

            return this.arr
        },

        filteredDataObj() {
            return this.getRealtors.filter((option: any) => {
                return option.searchName
                    .toString()
                    .toLowerCase()
                    .indexOf(this.name.toLowerCase()) >= 0
            })
        }
    }
})
</script>
<style lang="scss">

    .menu {
        ul {
            li:first-of-type {
                margin: 0 auto;

                a {
                    margin: 0 10px;
                }
            }
        }
    }

    .search-dot {
        max-width: 300px;
        width: 100%;
    }
</style>