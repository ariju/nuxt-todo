<template>
  <div>
    <!-- {{ todos }} -->
    <!-- todoリストの表示 -->
    <ul>
      <li v-for="todo in todos" :key="todo.id">
        <!-- {{ todo }} -->
        <!-- 完了、未完了のチェックBOX実装 -->
        <input 
        type="checkbox"
        v-bind:checks="todo.done"
        @change="toggle=(todo)">
        <!-- 取消線の実装 -->
        <span v-bind:class="{ done: todo.done }">
          {{ todo.name }} {{ todo.created.toDate() | dateFilter}}
        </span>
        <!-- データの削除機能 -->
        <button v-on:click="remove(todo.id)">x</button>
      </li>
    </ul>
    <div class="form">
      <!-- v-on:submitでボタンが押された時にaddメソッドを呼ぶ -->
      <!-- preventはsubmitイベントによってページがリロードされない様にする -->
      <!-- inputはタスク名の入力欄nameとデータバインディングしている -->
      <form v-on:submit.prevent="add">
        <input v-model="name">
        <button>Add</button>
      </form>
    </div>
  </div>
</template>

<script>
  import moment from 'moment'
  export default {
    data: function() {
      return {
        name: '',
        done: false
      }
    },
    // トゥドゥのデータを一時的に格納しておくデータを用意
    // createdのタイミングでdispatchメソッドでtodos.jsのアクションの
    // initを読み込んでfirebaseの初期化を行う
    created: function() {
      this.$store.dispatch('todos/init')
    },
    // addメソッドstoreのtodos.jsのアクションの呼び出し引数にtodoにつける名前を渡す
    methods: {
      add() {
        this.$store.dispatch('todos/add', this.name)
        this.name = ''
      },
      remove(id) {
        this.$store.dispatch('todos/remove', id)
      },
      toggle(todo) {
        this.$store.dispatch('todos/toggle', todo)
      }
    },
    computed: {
      todos() {
        return this.$store.state.todos.todos
      }
    },
    filters: {
      dateFilter: function(date) {
        return moment(date).format('YYYY/MM/DD HH:mm:ss')
      }
    }
  }
</script>

<style>
/* 取消線を実装 */
li > span.done {
  text-decoration: line-through;
}
</style>