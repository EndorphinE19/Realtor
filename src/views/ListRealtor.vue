<template>
    <div class="listrealtor">
        <div class="filter-panel">
            <b-field label="Фильтр по фамилии">
                <b-select placeholder="Select a lastname" v-model="lastname" @input="keysSwitch('lastname')">
                    <option
                        v-for="option in getRealtors"
                        :value="option.lastname"
                        :key="option.id">
                        {{ option.lastname }}
                    </option>
                </b-select>
            </b-field>
            <b-field label="Фильтр по дате: До">
                <b-datepicker
                    placeholder="Type or select a date..."
                    icon="calendar-today"
                    v-model="dateFilterTo"
                    @input="keysSwitch('date')"
                    v-on:input="toAndFromDate(dateFilterTo, 'to')"
                    >
                </b-datepicker>
            </b-field>
            <b-field label="После">
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
        <listrealtor :resultRealtor="resultRealtor" />
        <b-pagination
            :total="getRealtors.length"
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
import listrealtor from '@/components/listrealtor';
import {mapActions, mapGetters} from 'vuex'

export default Vue.extend({
    name:'ListRealtor',
    data: () => ({
            current: 1,
            perPage: <Number>5,
            rangeBefore: 1,
            rangeAfter: 1,
            order: '',
            size: '',
            isSimple: true,
            isRounded: false,
            prevIcon: 'chevron-left',
            nextIcon: 'chevron-right',
            lastname: <String>'',
            showWeekNumber: <Boolean>false,
            dateFilterTo: [],
            dateFilterFrom:[],
            keys: <String>'',
            toDate: <String>'',
            fromDate: <String>'',
            self: <Object>{to: <String>'', from: <String>''},
            resultArr: []
        }),
    methods: {
        ...mapActions(['getArrayRealtors']),

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
        }
    },
    computed:{

        ...mapGetters(['getRealtors']),

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
            } else {
                return this.getRealtors.slice(start, end);
            }
        },

        resultRealtor() {
            return this.arrayRealtorPaginate
        },

        filterLastname(): Array<any> {

            return this.getRealtors.filter((item: any) => {
                
                if (this.lastname === '') {
                    return this.getRealtors
                } else {
                    return item.lastname === this.lastname
                }
            })
        },

        filterDate(): Array<any> {
            
            return this.getRealtors.filter((item: any) => {
               
                if ((String(this.dateFilterTo) === '') && (String(this.dateFilterFrom) === '')) {
                    return this.getRealtors
                } else {
                    
                    if (((this.self.to === 'to') && (Date.parse(item.date) <= new Date(this.toDate))) || 
                        ((this.self.from === 'from') && (new Date(this.fromDate) <= Date.parse(item.date)))) {
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
        padding: 15px 0;
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;

        .field {
            text-align: left;
            padding-right: 15px;
        }
    }
</style>