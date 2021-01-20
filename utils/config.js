const rosConfig = {
  rosNode: 'IMDA',
  pauseResumeRobot: ['/ui_robot_pra', 'std_msgs/UInt8'],
  batteryLevel: ['/robot_battery_percent', 'std_msgs/Float64']
};

module.exports = {rosConfig};
