var OS = {
  "ActivityMonitor":{
      "installed":[],
      "running":[],
      "displayInstalled": function(){
        var i = this.installed;
        console.log("Installed apps: " + this.utils.ListApps(i));
      },
      "displayRunning": function(){
        var r = this.running;
        console.log("Running apps: " + this.utils.ListApps(r));
      },
      "displayFocus":function(){
        var r = this.running;
        var previous;
        var current;
        //Set the current app on focus if an app on focus exist
        (r[0] !== undefined ? current = r[0].id : current = undefined);
        //Set the previous app on focus if an app on previously on focus existed
        (r[1] !== undefined ? previous = r[1].id : previous = undefined);
        console.log((current !== undefined ? "On Focus is " + current  : "Nothing on Focus") + (previous !== undefined ? "Previously was " + previous  : ""));
        return current;
      },
      "getFocus":function(){
        //
      },
      "selectApp":function(obj){
        var r = this.running;
        //search for selected obj index and move it first while making the previous focused one on idle

        //makes sense only if you have at least 2 apps running
        if(r.length > 1){
            for (var i=1; i<r.length;i++){
              if(r[i].name === obj.name){
                console.log("Found Index of " + obj.name + ". It was at " + i);
                r[0].Status.idle();
                r.move(i,0);
                break;
              }

            };
            console.log(r[0].name + " is now on focus.");
        }
      },
      "openApp":function(obj){
        var r = this.running;
        //When opening an app, this one is set to be first and on focus by default
        r.insert(0,obj);
        //We put the previous focused app on idle, only if at least one app existed before
        if(r.length > 1){
          r[1].Status.idle();
        }
      },
      "closeApp":function(obj){
        var r = this.running;
        //Looks for the element in the array of running Apps that matches the name of the app that requested to be closed
          for (var i=0; i<r.length;i++){
            //If the name matches, we remove it. Then we set the focus on the app that is now first. Note that this function will
            //do nothing if the focused app doesn't change (eg. If we close an app that was idling)
            if(r[i].name === obj.name){
                //Send message to app that we are closing interval
                window[r[i].id+'Exe'].menuActions.closingApp();
                //remove the app from the running array
                r.remove(i);
                //we set the focus on the next app only if, after closing the app, another app to select exists.
                //Otherwise all apps are closed.
                if (r[0] !== undefined) {
                  r[0].Status.silentFocus();
                }else {
                  //Set finder OS menu
                  console.log("All apps are now closed");
                  updateOsHeader(OSDefaultMenu, 'finder');
                }
                (r[0] !== undefined ? r[0].Status.silentFocus() : console.log("All apps are now closed"));
                console.log(obj.name + " have been closed");
                break;
            }
          }
      },
      //Some utilities to help debugging the apps
      "utils":{
        "ListApps":function(a) {
          //temp array
          var list = [];
          //The function to perform on on the loop on each App object inside the Apps Array.
          //We pass the App object as a parameter to be used to get each app name
          function saveAppToList (item) {
             list.push(item.id)
          };
          //run the loop
          a.forEach(saveAppToList);
          //return completed App list
          return list;
        },
        "getAllAppsStatus":function(){
          function showStatus (item) {
             console.log(item.name + " status is " + item.getStatus());
          };
            OS.ActivityMonitor.installed.forEach(showStatus);
        }
      }

  },
  "Settings":{
    "performance":"Fast",
    "device":"Desktop"
  }
};

//App Class
function App(i, a, fileType) {
    var self = this;
    var am = OS.ActivityMonitor;
    this.name = a.info.name.full;
    this.id = a.info.name.id;
    this.frame = "frame-" + self.id;
    this.file = "file-" + self.id;
    this.properties = a;
    this.created = false;
    this.loaded = false;
    this.install = function(){
      self.buildStructure(i,self, fileType);
      self.created = true;
      am.installed.push(this);
    }

    if (!self.created) {
      this.install();
    }

    this.Status = Logic.machine({
          'isClosed': {
            'open':
              function(){
                ///do things
                //am.running.push(self);
                //console.log("Instead is " + ("frame-" + self.id) +" and "+ self.id);
                if (!self.loaded) {
                  self.loadDependencies(self);
                }
                windowAnimationController(self.frame, self.file, revealWindowAnimation);

                //Update ActivityMonitor
                am.openApp(self);
                //Check if app already loaded once before updating the header
                if (self.OsMenu !== undefined) {
                  //self.updateOsHeader(self);
                  updateOsHeader(self.OsMenu, self.id);
                }

                //am.displayFocus();
                return 'isOpen';

              }
          },
          'isIdling': {
            'close':
              function(){
                ///do things
                windowAnimationController(self.frame, self.file, closeWindowAnimation, function(){
                  console.log('window animation done');
                  //Update ActivityMonitor
                  am.closeApp(self);
                });

                return 'isClosed';
              },
            'focus':
              function(){
                ///do things
                focusWindowAnimation(self.frame);
                console.log('FOCUSING');
                //self.updateOsHeader(self);
                updateOsHeader(self.OsMenu, self.id);
                //Update ActivityMonitor
                am.selectApp(self);
                return 'isOpen';
              },
            'silentFocus':
              function(){
                ///do things
                //Update ActivityMonitor
                silentFocusWindowAnimation(self.frame);
                //self.updateOsHeader(self);
                updateOsHeader(self.OsMenu, self.id);
                am.selectApp(self);
                return 'isOpen';
              }

          },
          'isOpen': {
            'close':
              function(){
                ///do things
                windowAnimationController(self.frame, self.file, closeWindowAnimation, function(){
                  console.log('window animation done');
                  //Update ActivityMonitor
                  am.closeApp(self);
                });
                //am.displayActivity();
                //am.displayFocus();
                return 'isClosed';
              },
            'minimise':
              function(){
              
                //Track use of minimise
                ga('send', 'event', 'Apps', 'minimise', self.id);

                windowAnimationController(self.frame, self.file, minimiseWindowAnimation, function(){
                  console.log('window animation done');
                  var appCanvas = document.getElementById(self.id+'-canvas');
                  var overlay = createElement('div','minimisedOverlay', undefined, undefined);
                  appCanvas.appendChild(overlay);

                  var frameDOM = document.getElementById(self.frame);

                  addDraggable(frameDOM, overlay, function(){
                    //Focus on window on click
                    self.Status.silentFocus();
                    previousSelectedMenu = undefined;
                    headerIsOpen = false;
                  });
                  //Update ActivityMonitor
                  am.closeApp(self);
                });
                //am.displayActivity();
                //am.displayFocus();
                return 'isMinimised';
              },
            'maximise':
              function(){
                ///do things
                windowAnimationController(self.frame, self.file, closeWindowAnimation, function(){
                  console.log('window animation done');
                  //Update ActivityMonitor
                  am.closeApp(self);
                });
                //am.displayActivity();
                //am.displayFocus();
                return 'isClosed';
              },
            'idle':
              function(){
                ///to implement maybe in the future
                return 'isIdling';
              },
            'focus':
              function(){
                ///focus app already open
                focusWindowAnimation(self.frame);
                //self.updateOsHeader(self);
                updateOsHeader(self.OsMenu, self.id);
                am.selectApp(self);
                console.log('FOCUSING');
                return 'isOpen';
              },
              'silentFocus':
                function(){
                  ///do things
                  //Update ActivityMonitor
                  silentFocusWindowAnimation(self.frame);
                  //self.updateOsHeader(self);
                  updateOsHeader(self.OsMenu, self.id);
                  am.selectApp(self);
                  return 'isOpen';
                }
          },
          'isMinimised': {
            'open':
              function(){
                var appCanvas = document.getElementById(self.id+'-canvas');
                appCanvas.removeChild(appCanvas.lastChild);
                windowAnimationController(self.frame, self.file, restoreWindowAnimation, function(){

                  var frameDOM = document.getElementById(self.frame);
                  var toolbar = frameDOM.querySelectorAll(".app-toolbar");

                  addDraggable(frameDOM, toolbar, function(){
                    //Focus on window on click
                    self.Status.silentFocus();
                    previousSelectedMenu = undefined;
                    headerIsOpen = false;
                  });

                });

                //Update ActivityMonitor
                am.openApp(self);
                //Check if app already loaded once before updating the header
                if (self.OsMenu !== undefined) {
                  //self.updateOsHeader(self);
                  updateOsHeader(self.OsMenu, self.id);
                }

                //am.displayFocus();
                return 'isOpen';

              }
          }

      });

      this.getStatus = function() {
        var status = this.Status.getMachineState();
        console.log(status);
        console.log(this.id);
        return status;
      };

};





//Create icon and window of an app
//Takes array position and app properties as parameters
App.prototype.buildStructure = function (i, self, type) {
  //Get conetainers
  console.log(type);
  var p = self.properties;
  //switch if create the app in the desktop or in a folder
  var location = 'files';
  if (p.location !== 'desktop') {
    location = p.location + '-container';
  }
    var filesContainer = document.getElementById(location);
    var windowsContainer = document.getElementById('windows');
  //Make Compoents
    if (type !== 'headless') {
      components.desktopIcon(i, p, filesContainer, type);
    }else{
      components.headlessIcon(i, p, filesContainer, type);
    }

    self.setFileInteraction(self);
    components.windowFrame(i, p, windowsContainer);
    self.setWindowInteraction(self);

}








App.prototype.loadDependencies = function(self){


    var p = self.properties;
    var appNamespace = p.info.name.id;
    console.log("Loading "+ p.info.name.full + " dependencies");

    var totalDepartments = 3;
    var totalDepartmentsLoaded = 0;

    //LOAD SCRIPTS
    var loadScripts = new ScriptLoader();
    loadScripts.require(p.dependencies.scripts, p.root,
        function() {
            // Callback
            totalDepartmentsLoaded++;
            //Update Header now
            updateOsHeader(self.OsMenu, self.id);
            //Try launch
            if (totalDepartmentsLoaded === totalDepartments) {
              startApp(self, appNamespace, 'OS');
            }
        });

    //LOAD IMAGES
    var loadImages = new ImageLoader();
    loadImages.require(p.dependencies.images, p.root,
        function() {
            // Callback
            totalDepartmentsLoaded++;
            //Try launch
            if (totalDepartmentsLoaded === totalDepartments) {
              startApp(self, appNamespace, 'OS');
            }
        });



    //LOAD FONTS
    var loadFonts = new FontLoader();
    loadFonts.require(p.dependencies.fonts, p.root,
        function() {
            // Callback
            totalDepartmentsLoaded++;
            //Try launch
            if (totalDepartmentsLoaded === totalDepartments) {
              startApp(self, appNamespace, 'OS');
            }
        });




      ///START APP
      function startApp(self, appName, applicant){
        console.log('All Scripts Loaded, App Ready');
        self.loaded = true;
        //Simulate loading time
        setTimeout(function(){
          //Remove loader
          console.log("START~!!!!!!!!!");
          var c = document.getElementById(appName+'-canvas');
          c.removeChild(c.firstChild);
          window[appName+'Exe'].start('OS');
          //Track app
          ga('send', 'event', 'Apps', 'open', appName);
        },400);

      };



};



App.prototype.setFileInteraction = function(self){
  var file = document.getElementById('file-'+self.id);

  var interactionType = "dblclick";
  if (device.input === 'touch') {
    interactionType = 'click'
  }
  file.addEventListener(interactionType, function(e){
    openWindowOnDblClick(self);
    e.stopPropagation();
  }, false);

  file.addEventListener("mousedown", function(e){
    highlightIconOnClick(file);
  }, false);
}



App.prototype.setWindowInteraction = function(self){

  var frameDOM = document.getElementById(self.frame);
  var toolbar = frameDOM.querySelectorAll(".app-toolbar");
  //Initiate drag

  addDraggable(frameDOM, toolbar, function(){
    //Focus on window on click
    self.Status.silentFocus();
    previousSelectedMenu = undefined;
    headerIsOpen = false;
  });


  //Listen for clicks on the window frames and perform OS actions with windowUtitiliesController
  frameDOM.addEventListener("click", windowUtitiliesController, false);
  //frameDOM.addEventListener("mousedown", windowUtitiliesControllerDownOnly, false);
  frameDOM.addEventListener("mousedown", function(e){
    console.log('DOWN');
    //Focus on window on click (this also happens in the onPress() function in the app toolbar)
    self.Status.silentFocus();
    previousSelectedMenu = undefined;
    headerIsOpen = false;
  }, false);

}



var headerIsOpen = false;
var previousSelectedMenu;


function toggleOSMenu() {
  return function(){
    if (headerIsOpen) {
      console.log("CLICKED ON MENU");
      closeAllMenus();
      headerIsOpen = false;
    }else{
      headerIsOpen = true;
    }
  }
}


///// CLEAN UP AND COMMENT

function OSMenuBehaviour(el, idName) {
  return function(){
    //If header is open, show drowpdowns on hover
    if (headerIsOpen) {
      if (previousSelectedMenu !== undefined) {

        previousSelectedMenu.previousSibling.classList.remove("selectedHeader");
        previousSelectedMenu.classList.remove("show");
        //var previouslySelectedMenuDOM = document.getElementById(previousSelectedMenu+'-dropdown');
        //previouslySelectedMenuDOM.previousSibling.classList.remove("selectedHeader");
        //previouslySelectedMenuDOM.classList.remove("show");
      }

      var dropdown = document.getElementById(idName+'-dropdown');
      dropdown.classList.add('show');
      el.firstChild.classList.add("selectedHeader");



      //set this item as currently open
      //previousSelectedMenu = idName;
      previousSelectedMenu = dropdown;
    }
  }
}



function openOsMenu(header, idName) {
  return function(){
      var dropdown = document.getElementById(idName+'-dropdown');
      //Check if currently hovered item was open

        //If the item was closed, check if another item is currently open
        if (previousSelectedMenu !== undefined) {
          previousSelectedMenu.classList.remove("show");
          // var previouslySelectedMenuDOM = document.getElementById(previousSelectedMenu+'-dropdown');
          // previouslySelectedMenuDOM.classList.remove("show");
        }
        dropdown.classList.add('show');
        header.classList.add("selectedHeader");
        console.log('OPENING '+ idName);
        //set this item as currently open
        previousSelectedMenu = dropdown;
        //previousSelectedMenu = idName;

  }
}







OS.Status = Logic.machine({
'Running': {
  'Sleep':
    function(){
      ///do things
      return 'Sleeping';
    }
},


'Stuck': {
  'Reload':
    function(){
      ///do things
      return 'Running';
    }
},


'Sleeping': {
  'Wake':
    function(){
      ///do things
      return 'Running';
    }
}

});
