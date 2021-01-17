<template>
  <div>
    <!-- {{ todos }} -->
    <ul>
      <li v-for="todo in todos" :key="todo.id">
        <!-- {{ todo }} -->
        {{ todo.done }} {{ todo.name }} {{ todo.created }}
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
      }
    },
    computed: {
      todos() {
        return this.$store.state.todos.todos
      }
    }
  }
</script>