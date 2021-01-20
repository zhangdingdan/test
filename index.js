// ========== NPM Package ==========
const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const path = require('path');
const rosnodejs = require('rosnodejs');


// ========== ROS Package ==========
const std_msgs = rosnodejs.require('std_msgs').msg;


// ========== Utils ==========
global.appRoot = path.resolve(__dirname);
const { logger, getLogs } = require('./utils/logger');
const {rosConfig, names, timer} = require('./utils/config');


// ========== Variables ==========
let battery = 100;


// ========== Init express and socket.io ==========
const app = express();
const server = http.Server(app);
const io = socketio(server);

// Set static folder for frontend
app.use(express.static(path.join(__dirname, 'frontend/dist')));

// Listen on a port
const PORT = process.env.PORT || 5030;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
const WSPORT = process.env.WSPORT || 5031;
server.listen(WSPORT, () => console.log(`WS started on port ${WSPORT}`));


// ========== Setup ROS ==========
rosnodejs.initNode(rosConfig.rosNode).then(() => {
    console.log('ROS node started');
});
const nh = rosnodejs.nh;
  
// Create ROS message object
const ROS_BOOL = new std_msgs.Bool();
const ROS_UINT8 = new std_msgs.UInt8();

// Subscriber and advertiser
const rosPauseResumeRobot = nh.advertise(rosConfig.pauseResumeRobot[0], rosConfig.pauseResumeRobot[1]);
const rosStatusMessage = nh.subscribe(rosConfig.statusMessage[0], rosConfig.statusMessage[1], (data) => {
  broadcastStatusMessage(data.data);
});
// const rosRobotPosition = nh.subscribe(rosConfig.robotPosition[0], rosConfig.robotPosition[1], (data) => {
//   broadcastRobotPosition(data.data);
// });
const rosBatteryLevel = nh.subscribe(rosConfig.batteryLevel[0], rosConfig.batteryLevel[1], (data) => {
  broadcastBatteryLevel(data.data);
});


// ========== Socket.io ==========
io.on('connection', (socket) => {
    io.emit('status-message', 'Hello');

    socket.on('pause-robot', () => pauseRobot());
    socket.on('resume-robot', () => resumeRobot());
    socket.on('abort-robot', () => abortRobot());
    socket.on('charge', () => toCharge());
    socket.on('disconnect', () => clientDisconnected(socket.id));
  });
setInterval(() => {
  io.emit('battery', battery);
}, 2000);


// ========== Functions ==========

function broadcastStatusMessage(msg) {
  io.emit('status-message', msg);
}

// function broadcastRobotPosition(pos) {
//   io.emit('robot-pos', pos);
// }

function broadcastBatteryLevel(bat) {
  battery = bat;
}

function pauseRobot() {
  ROS_UINT8.data = 2;
  rosPauseResumeRobot.publish(ROS_UINT8);
}

function resumeRobot() {
  ROS_UINT8.data = 3;
  rosPauseResumeRobot.publish(ROS_UINT8);
}

function abortRobot() {
  locks = {
    ...locks,
    opIsLocked: true,
    robotIsLocked: true,
    stationsIsLocked: false
  };
  io.emit('locks', {locks: locks, timer: false});
  ROS_UINT8.data = 4;
  rosPauseResumeRobot.publish(ROS_UINT8);
}

function toCharge() {
  ROS_UINT8.data = 5;
  rosGoToStation.publish(ROS_UINT8);
}

function clientDisconnected(id) {
  clients.filter(client => client.id !== id);
  io.emit('clients', clients);
}
