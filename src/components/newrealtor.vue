<template>
    <div class="flex">
        <div class="listrealtor-component__column">
            <div class="inputNewRealtor">
                <b-field label="Имя">
                    <b-input required type="text" v-model="firstname"></b-input>
                </b-field>
                <b-field label="Фамилия">
                    <b-input required type="text" v-model="lastname"></b-input>
                </b-field>
                <b-field label="Подразделение">
                    <b-select placeholder="Подразделение" v-model="subdivision">
                        <option v-for="item in getSubdivisions" :key="item.id" :value="item.name">{{item.name}}</option>
                    </b-select>
                </b-field>
                <b-field label="Дата">
                    <b-datepicker
                        placeholder="Type or select a date..."
                        icon="calendar-today"
                        v-model="date"
                        >
                    </b-datepicker>
                </b-field>
                <b-button @click="saveDataRealtor" type="is-danger">Сохранить изменения</b-button>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import Vue from 'vue'
import {mapGetters, mapActions} from 'vuex'
export default Vue.extend({
    name: 'newrealtor',
    data:() => ({
        id: '',
        guid: '',
        firstname: <String>'',
        lastname: <String>'',
        subdivision: <String>'',
        date: [],
        timeRedirect: 2000
    }),
    methods: {
        ...mapActions(['createRealtor', 'getArraySubdivisions']),

        // добавляем нового риэлтора
        async saveDataRealtor() {

            if (this.firstname && this.lastname && this.subdivision && this.date) {
                
                this.createRealtor({
                    firstname: this.firstname,
                    lastname: this.lastname,
                    subdivision: this.subdivision,
                    date: Date.parse(String(this.date))
                })
                .then(res => {
                    this.$buefy.dialog.alert('Риэлтор успешно добавлен!')

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
            }
        }
    },
    computed: {
        ...mapGetters(['getSubdivisions'])
    },
    async mounted() {
        this.getArraySubdivisions()
    }
})
</script>
<style lang="scss" scoped>
 .listrealtor-component {
        
        &__column {
            max-width: 576px;
            width: 100%;
            div {
                text-align: left;
            }
        }
    }
    .inputNewRealtor {
            width: 100%;
    }
</style>