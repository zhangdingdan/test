<template>
    <div class="robotcontrol">

        <div sticky>
            <h3>Robot Connection: <v-icon slot="icon" :color="connection ? 'success' : 'error'" size="36">mdi-access-point</v-icon>{{status}}</h3>
        </div><v-banner />

        <h3>Select Floor: </h3>
        <div class="d-flex flex-wrap justify-space-around pb-4 pt-4">
            <v-btn dark color="indigo" id="five" height="50px" min-width="150px" x-large >5F</v-btn>
            <v-btn dark color="indigo" id="six" height="50px" min-width="150px" x-large >6F</v-btn>
        </div>
        <v-banner />

        <h3>Robot Control: </h3>
        <div class="d-flex flex-wrap justify-space-around pb-4 pt-4" >
            <v-card @click="abortRobot" height="80px" min-width="150px" x-large color="error" class="pa-2 ma-2 d-flex justify-center align-center flex-column action">
                <v-icon style="font-size:2rem;">mdi-cancel</v-icon>
                Abort
            </v-card>
            <v-card @click="resumeRobot" height="80px" min-width="150px" x-large color="green lighten-3" class="pa-2 ma-2 d-flex justify-center align-center flex-column action">
                <v-icon style="font-size:2rem;">mdi-play</v-icon>
                Robot Resume
            </v-card>
            <v-card height="80px" min-width="150px" x-large color='yellow lighten-2' class="pa-2 ma-2 d-flex justify-center align-center flex-column action">
                <v-icon style="font-size:2rem;">mdi-pause</v-icon>
                Robot Pause
            </v-card>
        </div><v-banner />

        <h3>Map: </h3>
        <div class="d-flex justify-center">
            <div class="mapCanvas" id="map"></div>
        </div>

    </div> 
</template>

<script>

export default {
    data: () => {
        return {       
            status: ''
        };
    },
    mounted() {
        this.socket.subscribe('status-message', msg => {
            this.status = msg;
        })
    },
    methods: {
        goToCharge() {
            this.$socket.emit('charge');
        },
        pauseRobot() {
            this.$socket.emit('pause-robot');
        },
        resumeRobot() {
            this.$socket.emit('resume-robot');
        },
        abortRobot() {
            this.$socket.emit('abort-robot');
        },
        actionHandler(method) {
            this[method]();
        },
    initMap() {
      var ros = new ROSLIB.Ros({
          url:  'ws://' + window.location.hostname + ':9090'
      });
      var viewer = new ROS2D.Viewer({
          divID: 'map',
          width: 600,
          height: 500
      });
      var gridClient = new ROS2D.OccupancyGridClient({
          ros: ros,
          rootObject: viewer.scene,
          continuous: true
      });
      gridClient.on('change', function () {
          viewer.scaleToDimensions(gridClient.currentGrid.width, gridClient.currentGrid.height);
          viewer.shift(gridClient.currentGrid.pose.position.x * 1, gridClient.currentGrid.pose.position.y);
      });
      var robotMarker = new ROS2D.NavigationArrow({
          size: 0.05,
          strokeSize: 0.5,
          pulse: true,
          strokeColor: createjs.Graphics.getRGB(254, 0, 0),
          fillColor: createjs.Graphics.getRGB(254, 0, 0)
      });
      var poseTopic = new ROSLIB.Topic({
          ros: ros,
          name: '/amcl_pose',
          messageType: 'geometry_msgs/PoseWithCovarianceStamped'
      });
      poseTopic.subscribe(function (posewithc) {
          var pose = posewithc.pose.pose;
          robotMarker.x = pose.position.x;
          robotMarker.y = -pose.position.y;
      });
      gridClient.rootObject.addChild(robotMarker);
    }
    },
}
</script>

<style>
.card-disabled {
  background-color: rgba(0, 0, 0, .12)!important;
  color: rgba(0, 0, 0, .26)!important;
}
.mapCanvas {
  overflow: auto;
}
</style>
