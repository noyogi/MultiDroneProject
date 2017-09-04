/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
class Project {
    
    /**
     * Constructor of the project containing a timeline for each object to be controlled
     * @param {type} nname
     * @param {type} vversion
     * @returns {Project}
     */
    constructor(nname, vversion, id) {
        this.iid = id;
        this.name = nname;
        this.version = vversion;
        this.timelines = [];
    }
    
    /**
     * Add a new timeline to the project. Timeline is created outside the method
     * @param {type} timeline
     * @returns {undefined}
     */
    addtimeLine(timeline){
        this.timelines.push(timeline);
    }
    
    /**
     * Remove a timeline at the given index
     * @param {type} index at in timelines
     * @returns true if successful
     */
    removetimeLine(index){
        
    }
    
    /**
     * Method to start all timelines of the project
     * @returns null
     */
    play(){
        for(var i =0;i< this.timelines.length;i++){
            this.timelines[i].load(20);
            this.timelines[i].play();
        }
    }
    
    /**
     * Method to merge the object into a Json object that can be dumped into a database
     * @returns {String} JSON String (not object9
     */
    toJson(){
        var jsonTimeLines='[';
        for(var i = 0; i<this.timelines.length;i++){
            jsonTimeLines = jsonTimeLines+this.timelines[i].toJson();
            if(i<this.timelines.length-1)
                jsonTimeLines= jsonTimeLines+',';
        }
        jsonTimeLines=jsonTimeLines+']';
        var projectJson = '{"iid":"'+this.iid+'","name":"'+this.name+'","version":"'+this.version+'","timelines":'+jsonTimeLines+'}';
        return projectJson;
    }
    
    /**
     * Function to create a timeline object inclusing commands from json definition object
     * @param Json Object jobj - object must have predifined fields
     * @returns {undefined}
     */
    loadFromJson(jobj){
        this.name = jobj.name;
        this.version = jobj.version;
        this.iid = jobj.iid;
        for(var i=0;i<jobj.timelines.length;i++){
            var tline0 = new timeline(jobj.timelines[i].name, jobj.timelines[i].object);
            var d0 = new drone(jobj.timelines[i].object);
            for(var j=0;j<jobj.timelines[i].commands.length;j++){
                var com = commandMap[jobj.timelines[i].commands[j].name];
                tline0.commands.push(com(d0,jobj.timelines[i].commands[j].period));
            }
            this.addtimeLine(tline0);
        }    
    }    
}
