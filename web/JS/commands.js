/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

class command {

    constructor(oobject, duration)
    {
        ///Time the command is executed
        this.period = duration;
        this.object = oobject;
        this.com = null;
        this.name = 'unnamed';

    }

    execute() {}
    
    toJson() {
        var jname = '{"name":"'+ this.name+'", "period":'+ this.period +', "object":"'+ this.object.name+'"}';
        return jname;
    }
    
}

class ctakeoff extends command {
    constructor(oobject, duration) {
        super(oobject, duration);
        this.name = "takeoff";
    }

    execute() {
        this.object.takeoff();

    }
}

class cland extends command {
    constructor(oobject, duration) {
        super(oobject, duration);
        this.name = "land";
    }
    execute() {
        this.object.land();

    }
}


class cup extends command {
    constructor(oobject, duration) {
        super(oobject, duration);
        this.name = "up";
    }
    execute() {
        this.object.up();

    }
}

class cdown extends command {
    constructor(oobject, duration) {
        super(oobject, duration);
        this.name = "down";
    }
    execute() {
        this.object.down();

    }
}

class cforward extends command {
    constructor(oobject, duration) {
        super(oobject, duration);
        this.name = "forward";
    }
    execute() {
        this.object.forward();
    }
}

class cbackward extends command {
    constructor(oobject, duration) {
        super(oobject, duration);
        this.name = "backward";
    }
    execute() {
        this.object.backward();
    }
}

class cturnRight extends command {
    constructor(oobject, duration) {
        super(oobject, duration);
        this.name = "turnRight";
    }
    execute() {
        this.object.turnRight();
    }
}

class cturnLeft extends command {
    constructor(oobject, duration) {
        super(oobject, duration);
    }
    execute() {
        this.object.turnRight();
        this.name = "turnLeft";
    }
}

class chover extends command {
    constructor(oobject, duration) {
        super(oobject, duration);
        this.name = "hover";
    }
    execute() {
        this.object.hover();
    }
}

//commandMap[takeoff](drone,time);
var commandMap = {};
commandMap.takeoff = function (obj, time) {
    return new ctakeoff(obj, time);
};
commandMap.land = function (obj, time) {
    return new cland(obj, time);
};
commandMap.hover = function (obj, time) {
    return new chover(obj, time);
};
commandMap.up = function (obj, time) {
    return new cup(obj, time);
};
commandMap.down = function (obj, time) {
    return new cdown(obj, time);
};
commandMap.backward = function (obj, time) {
    return new cbackward(obj, time);
};
commandMap.forward = function (obj, time) {
    return new cforward(obj, time);
};
commandMap.turnRight = function (obj, time) {
    return new cturnRight(obj, time);
};
commandMap.turnLeft = function (obj, time) {
    return new cturnLeft(obj, time);
};

