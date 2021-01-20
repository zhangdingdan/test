<template>
     <nav>
        <v-app-bar app flat>
            <div class="d-flex align-center">
                <v-img
                alt="Siix Agt"
                class="shrink"
                contain
                min-width="100"
                src="./logo.webp"
                width="200"
                />
            </div>

            <v-spacer></v-spacer>
            <v-btn :to="{name:'Home'}" id="home" text color="indigo">
                <v-icon>mdi-home</v-icon>
                <span>HOME</span>
            </v-btn>

            <v-spacer></v-spacer>
            <v-btn :to="{name:'RobotControl'}" id="robotcontrol" text color="indigo">
                <v-icon>mdi-cursor-move</v-icon>
                <span>Robot</span>
            </v-btn>

            <v-spacer></v-spacer>
            <v-btn :to="{name:'User'}" id="user" text color="indigo">
                <v-icon>mdi-account</v-icon>
                <span>USER</span>
            </v-btn>

          <!--  <v-spacer></v-spacer>
            <v-btn :to="{name:'Map'}" id="map" text color="indigo">
                <v-icon>mdi-map</v-icon>
                <span>MAP</span>
            </v-btn>
            -->
            <v-spacer></v-spacer>
            <v-icon color="indigo lighten-2">{{batteryIcon}}</v-icon>{{battery}}%
        </v-app-bar>
    </nav>
</template>

<script>
export default {
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
