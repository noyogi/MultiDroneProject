/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//prefixes of implementation that we want to test
window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

//prefixes of window.IDB objects
window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;

if (!window.indexedDB) {
    window.alert("Your browser doesn't support a stable version of IndexedDB.");
}

const projectData = [
    {
        iid: "00-01", name: "SimpleTest", version: 0.1,
        timelines:
                [{name: "com", object: "ardrone_1", commands: [
                            {id: "00-01", name: "takeoff", period: 30, object: "ardrone_1"},
                            {id: "00-02", name: "hover", period: 30, object: "ardrone_1"},
                            {id: "00-03", name: "takeoff", period: 30, object: "ardrone_1"},
                            {id: "00-04", name: "hover", period: 30, object: "ardrone_1"}
                        ]},
                    {name: "com2", object: "ardrone_2", commands:
                                [{id: "00-01", name: "takeoff", period: 30, object: "ardrone_2"},
                                    {id: "00-02", name: "hover", period: 30, object: "ardrone_2"},
                                    {id: "00-03", name: "takeoff", period: 30, object: "ardrone_2"},
                                    {id: "00-04", name: "hover", period: 30, object: "ardrone_2"}

                                ]}
                ]}
];


var project1;
var db;
var request = window.indexedDB.open("projectDatabase", 1);

request.onerror = function (event) {
    console.log("error: ");
};

request.onsuccess = function (event) {
    db = request.result;
    console.log("success: " + db);
};

request.onupgradeneeded = function (event) {
    var db = event.target.result;
    var objectStore = db.createObjectStore("projects", {keyPath: "iid"});

    for (var i in projectData) {
        objectStore.add(projectData[i]);
    }
};

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


        } else {
            alert("Project couldn't be found in your database!");
        }
    };
}

function readAll() {
    var objectStore = db.transaction("projects").objectStore("projects");

    objectStore.openCursor().onsuccess = function (event) {
        var cursor = event.target.result;

        if (cursor) {
            alert("Name for id " + cursor.key + " is " + cursor.value.name + ", Version: " + cursor.value.version);
            cursor.continue();
        } else {
            alert("No more entries!");
        }
    };
}

function add(obj) {
    if (typeof project1 !== "undefined") {
        project1.iid = obj;
        var projectJson = project1.toJson();
        var projectDB = JSON.parse(projectJson);
        var request = db.transaction(["projects"], "readwrite")
                .objectStore("projects")
                .add(projectDB);

        request.onsuccess = function (event) {
            alert("Project has been added to your database.");
        };

        request.onerror = function (event) {
            alert("Unable to add data\r\nProject aready exists in your database! ");
        };
    }
}

function remove(id) {
    var request = db.transaction(["projects"], "readwrite")
            .objectStore("projects")
            .delete(id);

    request.onsuccess = function (event) {
        alert("Project entry has been removed. " + id);
    };
}
