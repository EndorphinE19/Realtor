<template>
    <div class="listrealtor">
        <div class="filter-panel">
            <b-field label="Фильтр по фамилии">
                <b-select placeholder="Select a lastname" v-model="lastname" @input="keysSwitch('lastname')">
                    <option
                        v-for="option in realtors"
                        :value="option.lastname"
                        :key="option.id">
                        {{ option.lastname }}
                    </option>
                </b-select>
            </b-field>
            <b-field label="Фильтр по дате: От">
                <b-datepicker
                    placeholder="Type or select a date..."
                    icon="calendar-today"
                    v-model="dateFilterTo"
                    @input="keysSwitch('date')"
                    v-on:input="toAndFromDate(dateFilterTo, 'to')"
                    >
                </b-datepicker>
            </b-field>
            <b-field label="До">
                <b-datepicker
                    placeholder="Type or select a date..."
                    icon="calendar-today"
                    v-model="dateFilterFrom"
                    @input="keysSwitch('date')"
                    v-on:input="toAndFromDate(dateFilterFrom, 'from')"
                    >
                </b-datepicker>
            </b-field>
        </div>
        <b-loading v-if="realtors.length === 0" :is-full-page="isFullPage" :active.sync="isLoading" :can-cancel="true"></b-loading>
        <listrealtor v-else :resultRealtor="resultRealtor" />
        <b-pagination
            :total="realtors.length"
            :current.sync="current"
            :range-before="rangeBefore"
            :range-after="rangeAfter"
            :order="order"
            :size="size"
            :simple="isSimple"
            :rounded="isRounded"
            :per-page="perPage"
            :icon-prev="prevIcon"
            :icon-next="nextIcon"
            aria-next-label="Next page"
            aria-previous-label="Previous page"
            aria-page-label="Page"
            aria-current-label="Current page">
        </b-pagination>
    </div>
</template>
<script lang="ts">
import Vue from 'vue'
import listrealtor from '@/components/listrealtor.vue';
import {mapActions, mapGetters} from 'vuex'

export default Vue.extend({
    props: {
        realtors: Array
    },
    name:'ListRealtor',
    data: () => ({
            isFullPage: <Boolean>true,
            isLoading: <Boolean>true,
            current: <Number | Enum | Any>1,
            perPage: <Number | Enum | Any>5,
            rangeBefore: 1,
            rangeAfter: 1,
            order: <String>'',
            size: <String>'',
            isSimple: <Boolean>true,
            isRounded: <Boolean>false,
            prevIcon: 'chevron-left',
            nextIcon: 'chevron-right',
            lastname: <String>'',
            showWeekNumber: <Boolean>false,
            dateFilterTo: [],
            dateFilterFrom:[],
            keys: <String>'',
            toDate: <String | Date | Number>'',
            fromDate: <String | Date | Number>'',
            self: <Object>{to: <String>'', from: <String>''},
            resultArr: []
        }),
    methods: {
        ...mapActions(['getArrayRealtors']),

        //используемый фильтр
        keysSwitch(val: string) {
            this.keys = val
        },

        toAndFromDate(val: any, self: any) {

            if (self === 'from') {
                this.fromDate = val
                this.self.from = self
            }
            if (self === 'to') {
                this.toDate = val
                this.self.to = self
            }
        },

        //preloader
        openLoading() {
            this.isLoading = true
            setTimeout(() => {
                this.isLoading = false
            }, 10 * 1000)
        }
    },
    computed:{

        //пагинация
        arrayRealtorPaginate() {
            
            const start = this.perPage * this.current - 5,
                  end = start + this.perPage;

            if (this.keys === 'date') {
                if(this.self.to === 'to') {
                    return this.filterDate.slice(start, end);
                } else if (this.self.from === 'from') {
                    return this.filterDate.slice(start, end);
                }
            }
            
            if (this.keys === 'lastname') {
                return this.filterLastname.slice(start, end);
            }

            return this.realtors.slice(start, end);
        },

        //возращает данные после пагинации
        resultRealtor() {
            return this.arrayRealtorPaginate
        },

        //фильтр по фамилии
        filterLastname(): Array<any> {

            return this.realtors.filter((item: any) => {
                
                if (this.lastname === '') {
                    return this.realtors
                } else {
                    return item.lastname === this.lastname
                }
            })
        },

        //фильтр по дате
        filterDate(): Array<any> {
            
            return this.realtors.filter((item: any) => {
               
                if ((String(this.dateFilterTo) === '') && (String(this.dateFilterFrom) === '')) {
                    return this.realtors
                } else {

                    if (((this.self.to === 'to') && (this.self.from === 'from'))) {
                        if (((new Date(this.toDate) <= Date.parse(item.date)) && (Date.parse(item.date) <= new Date(this.fromDate)))) {
                            return item
                        }
                    } else if (((this.self.to === 'to') && (Date.parse(item.date) >= new Date(this.toDate))) || 
                        ((this.self.from === 'from') && (Date.parse(item.date) <= new Date(this.fromDate)))) {
                            return item
                    }
                } 
            })
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
<style lang="scss">
    .filter-panel {
        padding: 15px;
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        flex-wrap: wrap;

        .field {
            text-align: left;
            padding-right: 15px;
        }
    }
</style>