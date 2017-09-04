/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/*
            db.projects.clear();
            db.timeline.clear();
            db.command.clear();

            class project {
                constructor(nname, iid) {
                    this.name = nname;
                    this.iid = iid;
                    this.timelines = [];
                    this.numtimelines = 0;
                }

                addtimeline(ttimeline) {
                    var tmptimeline = ttimeline;
                    tmptimeline.setProjectID(this.iid);
                    this.timelines.push(tmptimeline);
                    this.numtimelines = this.timelines.length;
                }

                load(iid) {
                    var self = this;
                    db.projects.where('iid').equals(iid).first(
                            function (result) {

                                self.name = result[0].name;
                                self.iid = iid;
                                //console.log("Friend number 2: " + JSON.stringify(friend));

                            });

                    db.timeline.where('projectid').equals(iid).toArray().then(function (result) {
                        for (var i = 0; i < result.length; i++) {
                            var t = new Timeline(null, null, null);
                            t.load(result[i].id);
                            this.timelines.push(t);
                        }
                    });

                }

                save() {
                    var self = this;
                    db.projects.update(this.iid, {name: this.name}).then(function (updated) {
                        if (updated) {
                            console.log("Updated Project");
                            db.timeline.where("projectid").equals(self.iid).delete();
                            for (var i = 0; i < self.timelines.length; i++) {
                                self.timelines[i].save();
                            }
                            console.log("Existing project was updated");
                        } else {
                            db.projects.add([{iid: self.iid, name: self.name}]);
                            for (var i = 0; i < self.timelines.length; i++) {
                                self.timelines[i].save();
                            }
                            console.log("New project was stored");
                        }
                    });
                    console.log("saved project");
                }

                debug() {
                    console.log("Projekt ID " + this.id);
                    console.log("Projekt Name " + this.name);
                    for (var i = 0; i < this.timelines.length; i++) {
                        this.timelines[i].debug();
                    }
                }
            }

            class Timeline {
                constructor(oobject, oobjectname, iid, ppid) {
                    this.object = oobject;
                    this.objectname = oobjectname;
                    this.iid = iid;
                    this.projectid = ppid;
                    this.commands = [];
                    this.numcommands = 0;
                }

                setProjectID(pID) {
                    this.projectid = pID;
                }

                load(iid) {
                    var self = this;
                    db.timeline.get(iid).then(function (result) {
                        self.object = result[0].object;
                        self.objectname = result[0].objectname;
                        self.projectid = result[0].objectname;
                        self.iid = result[0].iid;
                        db.command.where('timelineid').equals(this.iid).toArray().then(function (result) {
                            for (var i = 0; i < result.length; i++) {
                                var c = new command(null, null, null);
                                c.load(result[i].iid);
                                this.commands.push(t);
                            }
                        });

                    });
                }

                save() {
                    db.timeline.add([{iid: this.iid, object: this.object,
                            name: this.objectname, projectid: this.projectid}]);
                    db.command.where("timelineid").equals(this.iid).delete();
                    for (var i = 0; i < this.commands.length; i++) {
                        this.commands[i].save();
                    }
                    console.log("saved timeline");
                }  

                addCommand(ccommand) {
                    var tmpcommand = ccommand;
                    tmpcommand.setTimelineID(this.iid);
                    this.commands.push(tmpcommand);
                    this.numcommands = this.commands.length;
                }

                debug() {
                    console.log("Timeline ID " + this.iid);
                    console.log("Objectname " + this.objectname);
                    for (var i = 0; i < this.commands.length; i++) {
                        this.commands[i].debug();
                    }
                }
            }

            class command {
                constructor(nname, ttime, ttimelineid) {
                    this.name = nname;
                    this.time = ttime;
                    this.timelineid = ttimelineid;
                    this.id = 0;
                }

                load() {
                    var self = this;
                    db.command.get(id).then(function (result) {
                        self.name = result[0].name;
                        self.time = result[0].time;
                        self.timelineid = result[0].timelineid
                        self.id = result[0].id;
                    });
                }

                save() {
                    db.command.add([{iid: this.iid, name: this.name, time: this.time, timelineid: this.timelineid}]);
                }

                setTimelineID(timeID) {
                    this.timelineid = timeID;
                }

                debug() {
                    console.log("Command ID " + this.id);
                    console.log("Commandname " + this.name);
                }

            }

            function create()
            {
                var myproject = new project("Play it again", 37);
                var tt = new Timeline('drone', 'ardrone_1', 12, myproject.iid);
                var cc = new command('left', 200);
                tt.addCommand(cc);
                cc = new command('up', 200);
                tt.addCommand(cc);
                myproject.addtimeline(tt);
                var tt = new Timeline('drone', 'ardrone_2', 13, myproject.iid);
                cc = new command('left', 200);
                tt.addCommand(cc);
                cc = new command('up', 200);
                tt.addCommand(cc);
                myproject.addtimeline(tt);
                var tt = new Timeline('drone', 'ardrone_3', 14, myproject.iid);
                cc = new command('up', 200);
                tt.addCommand(cc);
                myproject.addtimeline(tt);
                myproject.save();
                myproject.debug();
            }
            */
           

