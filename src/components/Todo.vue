<template>
  <div class="todo">
    <h1>ToDoリスト</h1>
    <p id="js-todo-tab">
      <label id="js-tab-input-label">
        <input type="radio" value="すべて" v-model="todoFilter" />すべて
      </label>
      <label id="js-tab-input-label">
        <input type="radio" value="作業中" v-model="todoFilter" />作業中
      </label>
      <label id="js-tab-input-label">
        <input type="radio" value="完了" v-model="todoFilter" />完了
      </label>
    </p>

    <table id="js-todo-list">
      <thead id="js-todo-thead">
        <tr>
          <th>ID</th>
          <th>コメント</th>
          <th>状態</th>
        </tr>
      </thead>
      <tbody id="js-todo-tbody">
        <tr v-for="(item) in this.$store.getters.storeGetTasks(this.todoFilter)" :key="item.id">
          <td>{{item.id}}</td>
          <td>{{item.comment}}</td>
          <td>
            <button @click="changeStatus(item.id)">{{item.status}}</button>
            <button @click="removeTask(item.id)">削除</button>
          </td>
        </tr>
      </tbody>
    </table>
    <h2>新規タスクの追加</h2>
    <input type="text" v-model="inputTaskText" @keydown.enter="enterAddTodo" />
    <button @click="addTodo">追加</button>
  </div>
</template>

<script>
export default {
  name: "Todo",
  data: function() {
    return {
      inputTaskText: "",
      todoFilter: "すべて"
    };
  },
  methods: {
    // エンターでもタスクの追加ができるように
    enterAddTodo: function(event) {
      if (event.keyCode !== 229) {
        this.addTodo();
      }
    },
    // 「追加」ボタンを押して、タスクの追加をする
    addTodo: function() {
      if (this.inputTaskText) {
        this.$store.commit("storeAddTodo", this.inputTaskText);
        this.inputTaskText = "";
      }
    },
    // storeにあるタスクを削除する関数を実行
    removeTask: function(index) {
      this.$store.commit("storeRemoveTask", index);
    },
    // storeにあるタスクの状態を変更する関数を実行
    changeStatus: function(index) {
      this.$store.commit("storeChangeStatus", index);
    }
  }
};
</script>

<style scoped>
</style>
