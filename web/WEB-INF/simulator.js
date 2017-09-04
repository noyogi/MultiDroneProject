/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



class MainTest {

    constructor()
    {
        this.project = new Project("Test","V1");
        var tline0 = new timeline('com3');
        var d0 = new drone("ardrone_1");
        tline0.addCommand(new ctakeoff(d0, 1000));
        tline0.addCommand(new chover(d0, 600));
        tline0.addCommand(new cbackward(d0, 3000));
        tline0.addCommand(new cup(d0, 3000));
        tline0.addCommand(new cdown(d0, 3000));
        tline0.addCommand(new cforward(d0, 3000));
        tline0.addCommand(new chover(d0, 600));
        tline0.addCommand(new cland(d0, 1000));
        this.project.addtimeLine(tline0);

        var tline1 = new timeline('com2');
        var d1 = new drone("ardrone_2");
        tline1.addCommand(new ctakeoff(d1, 1000));
        tline1.addCommand(new chover(d1, 600));
        tline1.addCommand(new cbackward(d1, 3000));
        tline1.addCommand(new cup(d1, 3000));
        tline1.addCommand(new cdown(d1, 3000));
        tline1.addCommand(new cforward(d1, 3000));
        tline1.addCommand(new chover(d1, 600));
        tline1.addCommand(new cland(d1, 1000));
        this.project.addtimeLine(tline1);

        var tline2 = new timeline('com1');
        var d2 = new drone("ardrone_3");
        tline2.addCommand(new ctakeoff(d2, 1000));
        tline2.addCommand(new chover(d2, 600));
        tline2.addCommand(new cbackward(d2, 3000));
        tline2.addCommand(new cup(d2, 3000));
        tline2.addCommand(new cdown(d2, 3000));
        tline2.addCommand(new cforward(d2, 3000));
        tline2.addCommand(new chover(d2, 600));
        tline2.addCommand(new cland(d2, 1000));
        this.project.addtimeLine(tline2);
    }
    
    play(){
        this.project.play();
    }

    load(job){
        this.project = new Project(job.name,job.version);
        this.project.loadFromJson(job);
    }
    
}