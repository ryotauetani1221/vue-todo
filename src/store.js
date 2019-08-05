import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // todolistとして表示させる配列の宣言
    // ↓のような配列の構造になってます。
    // tasks:[
    //   {
    //     id: 0,
    //     comment: 'コメント名1',
    //     status: '作業中1'
    //   },
    //   {
    //     id: 1,
    //     comment: 'コメント名2',
    //     status: '作業中2'
    //   }
    // ]
    tasks: [
    ]
  },
  mutations: {
    // タスクを配列に追加
    storeAddTodo: function (state, task) {
      const addTask = {
        id: state.tasks.length,
        comment: task,
        status: '作業中'
      };
      state.tasks.push(addTask);
    },
    // タスクの状態を変更するモジュール
    storeChangeStatus: function (state, index) {
      switch (state.tasks[index].status) {
        case '作業中':
          state.tasks[index].status = '完了';
          break;
        case '完了':
          state.tasks[index].status = '作業中';
          break;
        default:
          break;
      }
    },
    // タスクを削除するモジュール
    storeRemoveTask: function (state, index) {
      state.tasks.splice(index, 1);
      // idの振り直し
      state.tasks.forEach(function (item, itemIndex) {
        item.id = itemIndex;
      });
    },
  },
  actions: {
  },
  getters: {
    // 表示するタスクデータのソート。表示させるためのv-forは全てここで取得した配列をfor分で回しています。
    storeGetTasks: (state) => (nowStatus) => {
      if (nowStatus === 'すべて') {
        return state.tasks;
      } else {
        return state.tasks.filter(item => item.status === nowStatus);
      }
    }
  }
})
