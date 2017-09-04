Starting the environment

source ./devel/setup.bash
roscore&
roslaunch cvg_sim_gazebo testworld_with_three_ardrone.launch&
roslaunch rosbridge_server rosbridge_websocket.launch&

You may want to cleanup the startup world in launch testworld ...

You can then start the sample application. Testing works with the simple example file (example.html). I will add more snippets to the file.

Problems: goetz.winterfeldt@th-deg.de