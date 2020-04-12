<template>
    <div class="menu">
        <div class="menu__mobile-menu">
           <b-button @click="openMenu"><b-icon icon="menu"></b-icon></b-button>
            <div v-if="open" class="mobile">
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
        </div>
        <div class="menu__desktop">
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
        
    </div>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    props: {
        realtors: Array
    },
    name:'menus',
    data:() => ({
            data: <String>'',
            keepFirst: <Boolean>false,
            openOnFocus: <Boolean>false,
            name: <String>'',
            idUrl: <String>'',
            selected: null,
            arr: [],
            open: <Boolean>false
        }),
    methods: {
        setTemplate(option: any) {
            this.$router.push('/updaterealtor/' + option.id)
        },
        openMenu() {
            this.open = !this.open
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
        &__mobile-menu {
                text-align: left;
                display: none;
                cursor: pointer;
        }
    }

    .search-dot {
        max-width: 300px;
        width: 100%;
    }
</style>