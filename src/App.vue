<template>
<div>
    <v-app class="text-uppercase grey--text">
      <Navbar />
      <v-main class="grey lighten-4 mx-4">
        <router-view></router-view>
      </v-main>
    </v-app>
</div>
</template>

<script>
import Navbar from './components/Navbar';

export default {
  name: 'App',
  components: { Navbar },

  sockets: {
    connect() {
    },
  },
  mounted() {
    this.sockets.subscribe('battery', bat => {
      this.battery = bat;
    });
  },
  data: () => {
    return {
      battery: 100,
      batteryIcon: 'mdi-battery'
    }
  },
  watch: {
    battery() {
      if (this.battery === 100) {
        this.batteryIcon = 'mdi-battery'
      } else if (this.battery < 10) {
        this.batteryIcon = 'mdi-battery-outline';
      } else {
        this.batteryIcon = `mdi-battery-${Math.floor(this.battery/10)}0`
      }
    }
  }
};
</script>