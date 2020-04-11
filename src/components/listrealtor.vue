<template>
    <div class="listrealtor-component">
        <div v-if="!$route.params.id" class="flex">
            <div class="listrealtor-component__column" v-for="(item, index) in resultRealtor" :key="index">
                <router-link :to="'/updaterealtor/'+item.id">
                <div>
                    <p>Имя: {{item.firstname}}</p>
                    <p>Фамилия: {{item.lastname}}</p>
                    <p>Подразделение: {{item.subdivision}}</p>
                    <p>Дата: {{item.date}}</p>
                </div>
                </router-link>
                
            </div>
        </div>
        <div v-else-if="$route.params.id" class="flex">
            <div class="listrealtor-component__column" v-for="item in resultRealtor" :key="item.id">
                <div :class="{inputUpdateRealtor : isUpdate}">
                    <b-input type="hidden" v-model="item.id" :value="id= item.id"></b-input>
                    <b-input type="hidden" v-model="item.guid" :value="guid= item.guid"></b-input>
                    <b-field label="Имя">
                        <b-input type="text" v-model="item.firstname" :value="firstname = item.firstname"></b-input>
                    </b-field>
                    <b-field label="Фамилия">
                        <b-input type="text" v-model="item.lastname" :value="lastname = item.lastname"></b-input>
                    </b-field>
                    <b-field label="Подразделение">
                        <b-select placeholder="Подразделение" v-model="subdivision">
                            <option v-for="item in getSubdivisions" :key="item.id" :value="item.name">{{item.name}}</option>
                        </b-select>
                        <!--b-input type="text" v-model="item.subdivision" :value="subdivision = item.subdivision"></b-input-->
                    </b-field>
                    <b-field label="Дата">
                        <b-datepicker
                            placeholder="Type or select a date..."
                            icon="calendar-today"
                            v-model="item.date"
                            :value="date = item.date">
                        </b-datepicker>
                    </b-field>
                    <b-button @click="saveDataRealtor" type="is-danger">Сохранить изменения</b-button>
                    <b-button type="is-danger" icon-right="delete" @click="deleteRealtor" />
                </div>
            </div>
        </div>
        <section>
    </section>
    </div>
</template>
<script lang="ts">
import Vue from 'vue'
import {mapGetters, mapActions} from 'vuex'
export default Vue.extend({
    props: {
        resultRealtor: Array
    },
    name:'listrealtor',
    data() {
        return {
            isUpdate: this.$route.params.id ? true : false,
            id: '',
            guid: '',
            firstname: <String>'',
            lastname: <String>'',
            subdivision: <String>'',
            date: [],
            timeRedirect: 2000
        }
    },
    methods: {
        ...mapActions(['setRealtors', 'updateRealtor', 'removeRealtor', 'getArraySubdivisions']),

        async saveDataRealtor() {
            
            this.updateRealtor({
                id: this.id,
                guid: this.guid,
                firstname: this.firstname,
                lastname: this.lastname,
                subdivision: this.subdivision,
                date: Date.parse(String(this.date))
            })
            .then(res => {
                this.$buefy.dialog.alert('Данные успешно изменены!')

                setTimeout(() => {
                    window.location.href = '/listrealtor'
                }, this.timeRedirect)
            })
            .catch(e => {
                this.$buefy.dialog.alert({
                    title: 'Ошибка',
                    message: 'Не удалось внести изменения, попробуйте позжу!',
                    type: 'is-danger',
                    hasIcon: true,
                    icon: 'times-circle',
                    iconPack: 'fa',
                    ariaRole: 'alertdialog',
                    ariaModal: true
                })
            })
        },

        async deleteRealtor() {
            this.removeRealtor(this.id)
            .then(async res => {
                await this.setRealtors(this.getRealtors)
            })
            .catch(e => {
                console.log(e)
            })
        }
    },
    computed:{
        ...mapGetters(['getRealtors', 'getSubdivisions']),
    },
    async mounted() {
        this.getArraySubdivisions()
    }
})
</script>
<style lang="scss" scoped>
    .listrealtor-component {
        &__column {
            width: 48%;
            div {
                text-align: left;
            }
        }

        button {
            margin-right: 10px;
            &:last-of-type {
                margin-right: 0;
            }
        }
    }

    .inputUpdateRealtor {
        width: 100%;
    }
</style>