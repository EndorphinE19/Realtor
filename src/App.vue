<template>
  <div id="app">
    <topPanel />
    <div id="nav">
      <div class="wrapper">
        
        <router-view :realtors="getRealtors"></router-view>
      </div>
    </div>
  </div>
  
</template>
<script>
import firebase from 'firebase/app'
import topPanel from './components/topPanel.vue'
import {mapActions, mapGetters} from 'vuex'
export default {
  data() {
    return {
        firstnames: [],
        a: null
    }
  },
  methods:mapActions(['getArrayRealtors']),
  computed:mapGetters(['getRealtors']),
  async mounted(){
    this.getArrayRealtors()
    /*var date = new Date();
    var f = [
      {id: 0, guid: 0, firstname:"John", lastname:'Foo', subdivision:'Москва', date: date.setFullYear(2020, 7, 12)},
      {id: 1, guid: 1, firstname:"John", lastname:'Bar', subdivision:'Сочи', date: date.setFullYear(2020, 6, 1)},
      {id: 2, guid: 2, firstname:"John", lastname:'Sam', subdivision:'Ростов', date: date.setFullYear(2020, 7, 2)},
      {id: 3, guid: 3, firstname:"Anton", lastname:'Smit', subdivision:'Крансодар', date: date.setFullYear(2020, 4, 3)},
      {id: 4, guid: 4, firstname:"Sara", lastname:'Smit', subdivision:'Лондон', date: date.setFullYear(2020, 4, 4)},
      {id: 5, guid: 5, firstname:"Tom", lastname:'Foo', subdivision:'Ростов', date: date.setFullYear(2020, 2, 5)},
      {id: 6, guid: 6, firstname:"Дима", lastname:'Foo', subdivision:'Сочи', date: date.setFullYear(2020, 7, 12)},
      {id: 7, guid: 7, firstname:"Алексей", lastname:'Bar', subdivision:'Москва', date: date.setFullYear(2020, 12, 17)},
      {id: 8, guid: 8, firstname:"Иван", lastname:'Bar', subdivision:'Краснодар', date: date.setFullYear(2020, 1, 29)},
      {id: 9, guid: 9, firstname:"Кирилл", lastname:'Andr', subdivision:'Ростов', date: date.setFullYear(2020, 3, 8)},
      {id: 10, guid: 10, firstname:"Katya", lastname:'Andr', subdivision:'Лондон', date: date.setFullYear(2020, 4, 9)},
      {id: 11, guid: 11, firstname:"Oleg", lastname:'Main', subdivision:'Москва', date: date.setFullYear(2020, 4, 9)},
      {id: 12, guid: 12, firstname:"Misha", lastname:'Main', subdivision:'Сочи', date: date.setFullYear(2020, 5, 15)},
      {id: 13, guid: 13, firstname:"Tom", lastname:'Foo', subdivision:'Краснодар', date: date.setFullYear(2020, 8, 1)},
      {id: 14, guid: 14, firstname:"Karl", lastname:'Foo', subdivision:'Лодон', date: date.setFullYear(2020, 8, 2)}
    ];
    
    firebase.database().ref('/realtors').set(f);*/
    
  },
  components: {
    topPanel
  }
}
</script>
<style lang="scss">

@mixin flexbox($flex, $align, $js, $fd, $fw) {
    display: $flex;
    align-items: $align;
    justify-content: $js;
    flex-direction: $fd;
    flex-wrap: $fw;
}

* {
  margin: 0;
  padding:0;
}

$main-color:#EF4937;
$w:white;

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

  .wrapper {
    margin: 0 auto;
    max-width: 1200px;
    width: 100%;
  }

  .top-panel {
    background: $main-color;
    color: $w;
  }

  .menu {

    ul {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: nowrap;
    }

    a {
      color: $w;
      &:hover {
        color: $w;
      }
    }

    .dropdown-item span {
        color: $main-color;
    }
  }

  .flex {
    @include flexbox(flex, flex-start, space-between, row, wrap);
  }

  .listrealtor-component {
        &__column {
            margin: 15px;
            border: 1px solid $main-color; 
            padding: 15px;
            @include flexbox(flex, center, center, column, wrap);
            transition: .3s ease;
        }
        &__column:hover {
          cursor: pointer;
          box-shadow: 1px 1px 10px 1px #DFDFDF;
        }
    }

    @media screen and (max-width:767px) {
        .menu {
            &__mobile-menu {
                display: block;
            }
            &__desktop {
              display: none;
            }
        }

        .mobile ul {
                flex-direction: column;
                align-items: flex-start;
            }
            .mobile ul li:first-of-type {
              margin: 0 auto 0 0;
            }
            .mobile ul li {
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                text-align: left;
            }

    }
}

#nav {

  a {
    font-weight: bold;
    color: #2c3e50;
  }
}


</style>
