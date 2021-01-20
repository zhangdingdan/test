
<template>
  <v-app>
    <v-layout row justify-center>

      <v-dialog v-model="dialog" persistent max-width="290">
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="primary" x-large class="ma-2" dark v-bind="attrs" v-on="on" >5F</v-btn>
        </template>
        <v-card>
          <v-card-text>
            Confirm exucute mission at 5F?
          </v-card-text>
          <v-card-actions>
              <v-btn dark color="blue" @click="isdialog" class="mx-auto">Yes</v-btn>
            <v-btn dark color="blue" @click="back" class="mx-auto">No</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog v-model="dialog2" persistent max-width="290">
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="primary" x-large class="ma-2" dark v-bind="attrs" v-on="on" >6F</v-btn>
        </template>
        <v-card>
          <v-card-text>
            Confirm exucute mission at 6F?
          </v-card-text>
          <v-card-actions>
              <v-btn dark color="blue" @click="isdialog" class="mx-auto">Yes</v-btn>
            <v-btn dark color="blue" @click="back2" class="mx-auto">No</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

    </v-layout>
  </v-app>
</template>


<script>
export default {
  data() {
    return {
      dialog: false, //当页面打开时，对话框呈现打开状态并且开始倒计时
      dialog2: false
    };
  },

  //在这个钩子函数下效果只会实现一次，再次进入页面没有对话框
  // mounted() {
  //   this.dialog = true; //每次页面打开时，对话框随之打开
  //   this.countDown(); //设在该钩子函数下，表示，当页面打开时，开始倒计时
  // },

  // 在实际页面中，要在这个函数下，退出进入主页后，再次进入这个页面效果才会存在，若在mounted中，那只会实现一次，退出再次进入该页面后，对话框不会打开
  // beforeRouteEnter(to, from, next) {
    // next(vm => {
      // 通过 `vm` 访问组件实例
    //  vm.dialog = true; //每次页面打开时，对话框随之打开
    //  vm.countDown(); //设在该钩子函数下，表示，当页面打开时，开始倒计时
  //  });
  // },
  
  methods: {
    // countDown() {
      // let temp = setTimeout(this.countDown, 1000);
      // this.temp = setTimeout(this.countDown, 1000);
      // this.Num = this.Num - 1;
      // if (this.Num === 1) {
        // window.location.href = "https://github.com/"; //倒计时结束后，跳转到github
        // clearTimeout(temp); //关闭计时器
      // }
    // },

    //点击对话框中的退出时，触发的事件
    isdialog() {
      this.dialog = false; //对话框关闭
      //clearTimeout(this.temp);
        this.$router.go("/RobotControl");   //跳转到官网主页（设置过路由的）
      // window.location.href = "https://www.google.com"; //此处为了展示效果，退出后跳转到谷歌
    },
    back() {
        this.dialog = false;
    },
    back2() {
        this.dialog2 = false;
    }
  }
};
</script>

