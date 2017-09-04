/** 
 Simple interface to the ARDrone using the ROS realisation of 
 TU Munich (tum) and the Autonomy Lab
 
 @author Winterfeldt
 @version 0.1
 
 */

/**
 * Realisation of a drone interface for the ArDrone
 * of the TUM ROS simulator
 * @type type
 */
class drone {

    constructor(dname) {
        /** Name of the drone required for the tobpic!!
         */
        this.name = dname;
        /**
         * Command to take of called from takeoff
         * Empty message
         */
        this.cmdTakeOff = new ROSLIB.Topic({
            ros: ros,
            name: '/' + dname + '/ardrone/takeoff',
            messageType: 'std_msgs/Empty'
        });
        
        this.cmdTakeOffSim = new ROSLIB.Topic({
            ros: ros,
            name: '/' + dname + '/takeoff',
            messageType: 'std_msgs/Empty'
        });
        
        this.cmdLand = new ROSLIB.Topic({
            ros: ros,
            name: '/' + dname + '/takeoff',
            messageType: 'std_msgs/Empty'
        });

        /**
         * Command to land called from land
         * Empty message
         */
        this.cmdLandSim = new ROSLIB.Topic({
            ros: ros,
            name: '/' + dname + '/land',
            messageType: 'std_msgs/Empty'
        });

        /**
         * Empty Message required by some programs
         */
        this.emptyMes = new ROSLIB.Message({

        });

        /**
         * Command to fly the drone direction passed using Twist message
         */
        this.cmdVel = new ROSLIB.Topic({
            ros: ros,
            name: '/' + dname + '/cmd_vel',
            messageType: 'geometry_msgs/Twist'
        });

        this.forwardMes = new ROSLIB.Message({
            linear: {
                x: 1.0,
                y: 0.0,
                z: 0.0
            },
            angular: {
                x: 0.0,
                y: 0.0,
                z: 0.0
            }
        });

        this.backwardMes = new ROSLIB.Message({
            linear: {
                x: -1.0,
                y: 0.0,
                z: 0.0
            },
            angular: {
                x: 0.0,
                y: 0.0,
                z: 0.0
            }
        });

        
        this.hoverMes = new ROSLIB.Message({
            linear: {
                x: 0.0,
                y: 0.0,
                z: 0.0
            },
            angular: {
                x: 0.0,
                y: 0.0,
                z: 0.0
            }
        });

        this.downMes = new ROSLIB.Message({
            linear: {
                x: 0.0,
                y: 0.0,
                z: -1.0
            },
            angular: {
                x: 0.0,
                y: 0.0,
                z: 0.0
            }
        });
        
        this.rightMes = new ROSLIB.Message({
            linear: {
                x: 0.0,
                y: 1.0,
                z: 0.0
            },
            angular: {
                x: 0.0,
                y: 0.0,
                z: 0.0
            }
        });

        this.leftMes = new ROSLIB.Message({
            linear: {
                x: 0.0,
                y: -1.0,
                z: 0.0
            },
            angular: {
                x: 0.0,
                y: 0.0,
                z: 0.0
            }
        });
        
        this.turnLeftMes = new ROSLIB.Message({
            linear: {
                x: 0.0,
                y: 0.0,
                z: 0.0
            },
            angular: {
                x: -1.0,
                y: 0.0,
                z: 0.0
            }
        });
        
        this.turnRightMes = new ROSLIB.Message({
            linear: {
                x: 0.0,
                y: 0.0,
                z: 0.0
            },
            angular: {
                x: 1.0,
                y: 0.0,
                z: 0.0
            }
        });
        
        this.upMes = new ROSLIB.Message({
            linear: {
                x: 0.0,
                y: 0.0,
                z: 1.0
            },
            angular: {
                x: 0.0,
                y: 0.0,
                z: 0.0
            }
        });
        
        this.task;
    }

    /**
     * Command to tell teh drone to take off
     * The drone will hover after taking off
     * @returns {undefined}
     */
    takeoff() {
        this.cmdTakeOff.publish(this.emptyMes);
        this.cmdTakeOffSim.publish(this.emptyMes);
        console.log("Take off send to drone");
    } 

    /**
     * Command to tell the drone to land
     * @returns {undefined}
     */
    land() {
        this.hover()
        clearInterval(this.task);
        this.cmdLand.publish(this.emptyMes);
        this.cmdLandSim.publish(this.emptyMes);
        console.log("Landing send to drone");
    }

    /**
     * Move the drone forward
     * Behavior will stop all other behaviors 
     * @returns {undefined}
     */
    forward() {
        clearInterval(this.task);
        this.task = setInterval(this.publishFor(), 200);
        console.log("Forward signals send to drone");

    }

    publishFor() {
        this.cmdVel.publish(this.forwardMes);
    } 

    /**
     * Move the drone backward
     * Behavior will stop all other behaviors 
     * @returns {undefined}
     */
    backward() {
        clearInterval(this.task);
        this.task = setInterval(this.publishBack(), 200);
        console.log("Backward signals send to drone");
    }

    publishBack() {
        this.cmdVel.publish(this.backwardMes);
    } 

    left() {
        clearInterval(this.task);
        this.task = setInterval(this.publishLeft(), 200);
        console.log("Goleft signals send to drone");
    }
    
    publishLeft(){
        this.cmdVel.publish(this.leftMes);
    }
    

    right() {
        clearInterval(this.task);
        this.task = setInterval(this.publishRight(), 200);
         console.log("GoRight signals send to drone");
    }
    
    publishRight(){
         this.cmdVel.publish(this.rightMes);
    }

    turnRight() {
        clearInterval(this.task);
        this.task = setInterval(this.publishTurnRight(), 200);
        console.log("TurnRight signals send to drone");
    }
    
    publishTurnRight(){
         this.cmdVel.publish(this.turnRightMes);
    }
    

    turnLeft() {
        clearInterval(this.task);
        this.task = setInterval(this.publishTurnLeft(), 200);
        console.log("Turnleft signals send to drone");

    }
    
    publishTurnLeft(){
        this.cmdVel.publish(this.turnLeftMes);
        
    }

    hover() {
        clearInterval(this.task);
        this.task = setInterval(this.publishHover(), 200);
        console.log("Hover signals send to drone");
    }

    publishHover() {
        this.cmdVel.publish(this.hoverMes);
    }
    
    up(){
       clearInterval(this.task);
        this.task = setInterval(this.publishUp(), 200); 
         console.log("Up signals send to drone");
    }

    publishUp(){
        this.cmdVel.publish(this.upMes);
    }
    
    down(){
        clearInterval(this.task);
        this.task = setInterval(this.publishDown(), 200);
         console.log("Down signals send to drone");
    }
    
    publishDown(){
        this.cmdVel.publish(this.downMes);
    }
    
}
