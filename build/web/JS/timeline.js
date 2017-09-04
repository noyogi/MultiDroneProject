/**
 * Timeline containing all commands for an object to be controlled by the 
 * programm.
 */

class timeline{
    
    /**
     * Constructor of the timeline
     * @param {type} name unique name that is bound to trigger events
     * @param {type} oobject object to be controlled
     * @returns {timeline}
     */
    constructor(name, oobject){
        this.object=oobject;
        this.eventName=name;
        this.commands = [];
        this.event = new Event(this.eventName);
        this.position = 0;
        this.length= [];
        this.totaltime =0;
        this.listenSet = false;
        this.loadSet = false;
    }
    
    /**
     * Method to return a json string of the objects
     * @returns {vis.Timeline.toJson.jsonTimeline|timeline.toJson.jsonTimeline|String}
     */
    toJson(){
        var commandjson='[';
        for(var i=0;i<this.commands.length;i++){
            commandjson=commandjson+this.commands[i].toJson();
            if(i<this.commands.length-1)
                commandjson=commandjson+',';
        }
        commandjson=commandjson+']';
        
        var jsonTimeline='{"name":"'+this.eventName+'", "object":"'+this.object+'", "commands":'+commandjson+'}';
        return jsonTimeline;
        
    }
    
    /**
     * Add a command to the timeline- The command hold all information about the object
     * @param {type} com
     * @returns {undefined}
     */
    addCommand(com){
        this.commands.push(com);
    }
    
    
    removeCommand(com){
        console.log("not implemented");
    }
    
    nextCommand(){
        console.log("Execute "+ this.position);
        this.commands[this.position].execute();
        
        //Reset timeline at end of simulation
        if(this.position==this.commands.length-1){
            this.position=0;
             
        }
        else
            this.position= this.position+1;
    }
    
    startListen(){
        var self =this;
        if(this.listenSet == false){
            addEventListener(this.eventName, function () { 
                self.nextCommand();
            }, false);      
            this.listenSet = true;
        }
        console.log("Start Listening");
        this.position=0;
    }
    
    load(go){
        
        if(this.loadSet==false){
         var self = this;
         
         this.length[0] = 1000;
         this.totaltime = 1000;
   //calculating start times for actions and totaltime
         for(var i=0;i<this.commands.length;i++){
            this.totaltime = this.totaltime + this.commands[i].period;
            this.length[i+1] = this.totaltime;
         }
         this.loadSet = true;
        }
        
    }
    
    play(){
         
         var self = this;
         
   //Scheculing events     
         for(var i=0;i<this.commands.length;i++){
            setTimeout(function(){dispatchEvent(self.event);},
            self.length[i]);
           } 
   //Start the scheduler
        this.startListen();
    }
}

