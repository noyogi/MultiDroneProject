###Starting with the multidrone environment
##Multidrone Project
The project aims to write a simple control editor for multidrone environments. The control application is intended to work with a simulator and real drones and robots. 

##Initalisation
Please follow the instructions in the docs folder and install ROS-indigo, the gazebo environment and the multidrone environment of TUM. You can then launch the mulitdrone project.

...
source ./devel/setup.bash
roscore&
roslaunch cvg_sim_gazebo testworld_with_three_ardrone.launch&
roslaunch rosbridge_server rosbridge_websocket.launch&
...

You may want to cleanup the startup world in launch testworld.

##Setup the development environment
You can use any editor that support javascript, html and css. Later we will port the application to nodesjs. You may think of that when following our project.


You can then start the sample application. Testing works with the simple example file (example.html). I will add more snippets to the file.

Problems: goetz.winterfeldt@th-deg.de