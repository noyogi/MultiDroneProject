/* 
 * Functionsto read from the database and display the results on the main
 * page. We are not working with objects, but request JSON from the indexed 
 * Database of our browser.
 * 
 * @version v.0.1
 * @author Winterfeldt
 * 
 */
/**
 * Block to initialize the database (redundant once we have a db class)
 * 
 */

var project1; //Gloabl project we are dealing with

/**
 * Function to toggle rendering of page 1
 * @returns {undefined}
 */
function togglePage1() {
    $("#page1").toggle();

}

/**
 * Function to toggle rendering of page 2
 * @returns {undefined}
 */
function togglePage2() {
    $("#page22").toggle();
}

/**
 * Function to toggle rendering of page 3
 * @returns {undefined}
 */
function togglePage3() {
    $("#page33").toggle();
}

/**
 * Function for the table display at the first pages of our application
 */
/**
 * @type Array
 */
const projectData = [
    {
        iid: "00-01", name: "SimpleTest", version: 0.1,
        timelines:
                [{name: "com", object: "ardrone_1", commands: [
                            {id: "00-01", name: "takeoff", period: 3000, object: "ardrone_1"},
                            {id: "00-02", name: "hover", period: 3000, object: "ardrone_1"},
                            {id: "00-03", name: "up", period: 1000, object: "ardrone_1"},
                            {id: "00-04", name: "land", period: 3000, object: "ardrone_1"}
                        ]},
                    {name: "com2", object: "ardrone_2", commands:
                                [{id: "00-01", name: "takeoff", period: 1000, object: "ardrone_2"},
                                    {id: "00-02", name: "hover", period: 2000, object: "ardrone_2"},
                                    {id: "00-03", name: "backward", period: 1000, object: "ardrone_2"},
                                    {id: "00-04", name: "up", period: 1000, object: "ardrone_2"},
				    {id: "00-05", name: "forward", period: 1000, object: "ardrone_2"},
                                    {id: "00-04", name: "land", period: 1000, object: "ardrone_2"},

                                ]}
                ]}
];


/**
 * Open our database. Change name if another db is used.
 */
var db;
var request = window.indexedDB.open("projectDatabase", 1);

$(document).ready(function () {
    togglePage2();
    togglePage3();
});
//prefixes of implementation that we want to test
window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

//prefixes of window.IDB objects
window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;

if (!window.indexedDB) {
    window.alert("Your browser doesn't support a stable version of IndexedDB.");
}

request.onerror = function (event) {
    console.log("error: ");
};

request.onsuccess = function (event) {
    db = request.result;
    console.log("success: " + db);

};

request.onupgradeneeded = function (event) {
    db = event.target.result;
    var objectStore = db.createObjectStore("projects", {keyPath: "iid"});

    for (var i in projectData) {
        objectStore.add(projectData[i]);
    }
};

/**
 * Function to retrieve project info from db and add the information
 * to table
 * @returns {undefined}
 */
function loadDB() {
    var objectStore = db.transaction("projects").objectStore("projects");

    objectStore.openCursor().onsuccess = function (event) {
        var cursor = event.target.result;

        if (cursor) {
            $("#jsGrid").jsGrid("insertItem", {iid: cursor.value.iid, Name: cursor.value.name, Version: cursor.value.version, Object: 2});
            console.log("Name for id " + cursor.key + " is " + cursor.value.name + ", Version: " + cursor.value.version);
            cursor.continue();
        } else {
            console.log("no more entries!");
        }
    };
}

function read(id) {

    var transaction = db.transaction(["projects"]);
    var objectStore = transaction.objectStore("projects");
    var request = objectStore.get(id); //mustbe id

    request.onerror = function (event) {
        alert("Unable to retrieve data from database!");
    };

    request.onsuccess = function (event) {
        // Do something with the request.result!
        if (request.result) {
            var currentProject = request.result;
            project1 = new Project(currentProject.name, currentProject.version, currentProject.iid);
            project1.loadFromJson(currentProject);
            console.log(currentProject);
            togglePage1();
            togglePage2();
            loadProjectInGrid(project1);
        } else {
            alert("Project couldn't be found in your database!");
        }
    };
}

function add(iid) {
    if (typeof project1 !== "undefined") {
        project1.iid = iid;
        var projectJson = project1.toJson();
        var projectDB = JSON.parse(projectJson);
        var request = db.transaction(["projects"], "readwrite")
                .objectStore("projects")
                .add(projectDB);

        request.onsuccess = function (event) {
            alert("Project has been added to your database.");
        };

        request.onerror = function (event) {
            put(iid);
        };
    }
}


function put(iid) {
    if (typeof project1 !== "undefined") {
        project1.iid = iid;
        var projectJson = project1.toJson();
        var projectDB = JSON.parse(projectJson);
        var request = db.transaction(["projects"], "readwrite")
                .objectStore("projects")
                .put(projectDB);

        request.onsuccess = function (event) {
            alert("Project has been updated to your database.");
        };

        request.onerror = function (event) {
            alert("Unable to modify data\r\nProject was deleted.");
        };
    }
}



function remove(id) {
    var request = db.transaction(["projects"], "readwrite")
            .objectStore("projects")
            .delete(id);

    request.onsuccess = function (event) {
        console.log("Project entry has been removed. " + id);
    };
}

/**
 * Functions to work with own dialogs. Dialogs are used to collect user data
 * @type Boolean
 */
var dialogOpen = false,
        lastFocus, dialog, okbutton, pagebackground;

function showDialog(el) {
    lastFocus = el || document.activeElement;
    toggleDialog('show');
}

function hideDialog(el) {
    toggleDialog('hide');
}



function saveData() {
    var data = document.getElementById("PName").value;
    //$("#jsGrid").jsGrid("insertItem", {Name: data, Version: "v.1", Object: 2});
    project1 = new Project(data,"v 0.0",$('#jsGrid').data( 'JSGrid' ).data.length);
    toggleDialog('hide');
    togglePage1();
    togglePage2();
}

function toggleDialog(sh) {
    dialog = document.querySelector('dialog');
    okbutton = document.getElementById('ok');
    pagebackground = document.getElementById('bg');

    if (sh == 'show') {
        dialogOpen = true;
        // show the dialog  
        dialog.setAttribute('open', 'open');
        // after displaying the dialog, focus an element inside it
        //okbutton.focus();
        // only hide the background *after* you've moved focus out of the content that will be "hidden"
        //pagebackground.setAttribute('aria-hidden', 'true');
    } else {
        dialogOpen = false;
        dialog.setAttribute('open', 'false');
        //pagebackground.setAttribute('aria-hidden', 'false');
        //lastFocus.focus();
    }
}
document.addEventListener('focus', function (event) {
    var d = document.querySelector('dialog');
    if (dialogOpen && !d.contains(event.target)) {
        event.stopPropagation();
        d.focus();
    }
}, true);

document.addEventListener('keydown', function (event) {
    if (dialogOpen && event.keyCode === 27) {
        toggleDialog('hide');
    }
}, true);

function loadProjectInGrid(project) {
    //check if the project is not empty
    if (project.iid !== "undefined") {
        console.log("Loading project into grid");
        for (var i = 0; i < project.timelines.length; i++) {
            for (var j = 0; j < project.timelines[i].commands.length; j++) {
                var com = project.timelines[i].commands[j];
                var num = i + 2;
                var gName = "#jsGrid" + num;
                $(gName).jsGrid("insertItem", {Command: lookupCom1[com.name],
                    Time: com.period}).done(function () {
                    console.log("Insert " + com.name + " into " + num);
                });
            }
            $(gName).jsGrid("render").done(function () {
                console.log("rendering completed and data loaded");
            });
        }
    } else {
        console.log("Nothing to Load");
    }

}

/**
 * Looping over all grids. Checking if the grid is active and creating a timeline 
 * with commands from active grids. 
 * We are saving the project into our database. The resulting project can be played.
 * @param {type} project
 * @returns {undefined}
 */
function saveGridToProject(project) {
    
    var projectName="";
    if(project1.name !== "undefined"){
        projectName= project1.name;
    }
    else{
        projectName="tmpProj";
    }
    
    var tmpProject = new Project(projectName,"v 0.0","00-001");
    /*
     * Looping over all of our grids. We skip the robot for now
     */
   for(var i = 1; i< 7;i++){
       
     var num = i;
     var gName = "#jsGrid" + num; 
     var checkName ="#check"+i;
     var eventName ="event"+i;
     
        //if Grid is active
        if($(checkName).prop('checked')){
            //Robot is one
	    var num = i-1;
            var dronename = "ardrone_"+num;
            var tmpdrone = new drone(dronename); 
            var tline=new timeline(eventName,tmpdrone);
            //runing over the grid and create commands to be added to the timeline
            for(var ii=0;ii<$(gName).data( 'JSGrid' ).data.length;ii++){
                console.log($(gName).data( 'JSGrid' ).data[ii]);
                var nn = $(gName).data( 'JSGrid' ).data[ii].Command;
                var mm = $(gName).data( 'JSGrid' ).data[ii].Time;
                console.log("Name "+nn+" Time "+mm+" "+ getKey(nn));
                var com=commandMap[getKey(nn)](tmpdrone,mm);
                tline.commands.push(com);
            }
            tmpProject.timelines.push(tline);
        } else {
            console.log("Nothing to Load");
        }
    }
    project1=tmpProject;
    add($('#jsGrid').data( 'JSGrid' ).data.length+1);
}
