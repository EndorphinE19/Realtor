<template>
  <div id="app">
    <topPanel />
    <div id="nav">
      <div class="wrapper">
        <router-view/>
      </div>
    </div>
  </div>
  
</template>
<script>
import firebase from 'firebase/app'
import topPanel from './components/topPanel'
import {mapActions} from 'vuex'
export default {
  data() {
    return {
        firstnames: [],
        a: null
    }
  },
  methods:mapActions(['getArrayRealtors']),
  async mounted(){
    this.getArrayRealtors()
    /*var date = new Date();
    var f = [
      {lastname:'Foo', subdivision:'Москва', date: date.setFullYear(2020, 7, 12)},
      {lastname:'Bar', subdivision:'Сочи', date: date.setFullYear(2020, 6, 1)},
      {lastname:'Sam', subdivision:'Ростов', date: date.setFullYear(2020, 7, 2)},
      {lastname:'Smit', subdivision:'Крансодар', date: date.setFullYear(2020, 4, 3)},
      {lastname:'Smit', subdivision:'Лондон', date: date.setFullYear(2020, 4, 4)},
      {lastname:'Foo', subdivision:'Ростов', date: date.setFullYear(2020, 2, 5)},
      {lastname:'Foo', subdivision:'Сочи', date: date.setFullYear(2020, 7, 12)},
      {lastname:'Bar', subdivision:'Москва', date: date.setFullYear(2020, 12, 17)},
      {lastname:'Bar', subdivision:'Краснодар', date: date.setFullYear(2020, 1, 29)},
      {lastname:'Andr', subdivision:'Ростов', date: date.setFullYear(2020, 3, 8)},
      {lastname:'Andr', subdivision:'Лондон', date: date.setFullYear(2020, 4, 9)},
      {lastname:'Main', subdivision:'Москва', date: date.setFullYear(2020, 4, 9)},
      {lastname:'Main', subdivision:'Сочи', date: date.setFullYear(2020, 5, 15)},
      {lastname:'Foo', subdivision:'Краснодар', date: date.setFullYear(2020, 8, 1)},
      {lastname:'Foo', subdivision:'Лодон', date: date.setFullYear(2020, 8, 2)}
    ];
    for (var i = 0; i <= f.length; i++) {
      firebase.database().ref('/realtors').child(i).set({
            date: f[i]['date'],
            firstname: 'John',
            guid: i,
            id: i,
            lastname: f[i]['lastname'],
            subdivision: f[i]['subdivision']
          });
    }*/
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
            margin: 15px 0;
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
}

#nav {

  a {
    font-weight: bold;
    color: #2c3e50;
  }
}


</style>
