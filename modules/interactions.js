function openWindowOnDblClick(app){

    //Tries to focus the app
    app.Status.focus();
    //If it didn't work, then
    //Tries to Open the app
    app.Status.open();
};



function closeAllMenus(){

  var dropdownContents = document.getElementsByClassName("dropdownContent");
  var i;
  var dropdownContent;
  for (var i = 0; i < dropdownContents.length; i++) {

    if (dropdownContents[i].classList.contains('show')) {
      var dropdownContent = dropdownContents[i];
      console.log(i);
      //Fade out menu before hiding it
      TweenLite.to(dropdownContent, 0.2,{opacity:0,ease:Power3.easeOut, onComplete:function(){
          //console.log("COMPLETE!!!");
          console.log(dropdownContent);
          dropdownContent.classList.remove('show');
          dropdownContent.previousSibling.classList.remove("selectedHeader");
          //Reset item opacity
          TweenLite.set(dropdownContent,{opacity:1});
        }
      });
      }
    }
  previousSelectedMenu = undefined;
  headerIsOpen = false;
}




function deselectAll(e){

  //Close menus
  if (!e.target.matches('.columnHeader')) {
    closeAllMenus();
  }

  //Deselect icons
  if (e.target === e.currentTarget) {
    if (previousSelectedFile !== undefined) {
      previousSelectedFile.classList.remove('selected');
    }
    previousSelectedFile = undefined;
  }
  //e.stopPropagation();
}




var previousSelectedFile;
function highlightIconOnClick(appFile){

    //Clear previousSelectedFile
    if (previousSelectedFile !== undefined) {
      previousSelectedFile.classList.remove('selected');
    }
    appFile.classList.add('selected');
    previousSelectedFile = appFile;


}


function selectFinder() {
  console.log("SELECTING FINDER");
  updateOsHeader(OSDefaultMenu, 'finder');
}


function getAppInfos(e){
  var infos = {};
  infos.clickID = e.target.id;
  //Gets the parent id
  infos.parentID = e.target.offsetParent.id;
  //splits the parent id to extract only the app name (eg. "keyboard", "music")
  //this name is used to identify the app ID
  infos.appID = infos.parentID.split("-")[1];
  //then generate the window frame ID
  infos.appFrame = "frame-" + infos.appID;

  return infos;
}



//Manage Os actions happening on the window frames
function windowUtitiliesController(e){

    switch(e.target.classList[0]) {
      //If click on the close icon, close the app frame
      case "close":
          var ai = getAppInfos(e);
          //Now use the window frame id to feed the animation
          installedApps[ai.appID].Status.close();
          //Stops the event listener propagation down to the DOM root
          e.stopPropagation();
          break;
      case "minimise":
          var ai = getAppInfos(e);
          //Now use the window frame id to feed the animation
          installedApps[ai.appID].Status.minimise();
          //Stops the event listener propagation down to the DOM root
          e.stopPropagation();
          break;
      case "maximise":
          var ai = getAppInfos(e);
          //Now use the window frame id to feed the animation
          installedApps[ai.appID].Status.minimise();
          //Stops the event listener propagation down to the DOM root
          e.stopPropagation();
          break;
      case "minimisedOverlay":

          console.log("PRESSED overlay");

          var appID = e.target.parentNode.id.split("-")[0];
          installedApps[appID].Status.open();
          e.stopPropagation();
          break;
      //If click on the window frame canvas, sets its zindex on top of all
      // case "app-toolbar", "app-title":
      //     console.log('FUNCIA FUNCIAZZA');
      //     break;
      // case "canvas":
      //     var clickID = e.target.id;
      //     //Gets the parent id
      //     var parentID = e.target.offsetParent.id;
      //     //Gets the app window frame from the DOM
      //     var appFrame = document.getElementById(parentID);
      //     //Sets its zIndex to be the highest
      //     var appID = parentID.split("-")[1];
      //     //installedApps[appID].Status.silentFocus();
      //
      //     //deselects highlighted files
      //     if (previousSelectedFile !== undefined) {
      //       previousSelectedFile.className = 'file';
      //     }
      //     previousSelectedFile = undefined;
      //     //Stops the event listener propagation down to the DOM root
      //     e.stopPropagation();
      //     break;
      default:
          //Stops the event listener propagation down to the DOM root
          e.stopPropagation();
    }
}



function windowUtitiliesControllerDownOnly(e) {
  console.log('funcia');
  var clickID = e.target.id;
  //Gets the parent id
  var parentID = e.target.offsetParent.id;
  //Sets its zIndex to be the highest
  var appID = parentID.split("-")[1];

  console.log(clickID);
  console.log(parentID);
  console.log(appID);
  if (appID !== undefined) {
    installedApps[appID].Status.silentFocus();
  }


  e.stopPropagation();

}

//Takes an element from the DOM and sets its zIndex to be the highest, while doing that, it also increases
//the Draggable.zIndex which stores the current highest zindex
function zBoost(element) {
    element.style.zIndex = Draggable.zIndex++;
  }



function dragMoveListener (event) {
    var target = event.target,
        // keeps the dragged position in the data-x/data-y attributes
        x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
        y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

    // translate the element
    target.style.webkitTransform =
    target.style.transform =
      'translate(' + x + 'px, ' + y + 'px)';

    // update the posiion attributes
    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
}






  //////////////////////////////////////////////////////////////////////////////
//Gets the window frame and icon from the DOM and animates its opening and closing
function windowAnimationController(frame, icon, animate, callback) {
  //Gets the app elements (window and icon) from the DOM
  var elements = getAppElements(frame, icon);

  //Analyse the App Frame
  var myframe = new AnalysedWindowFrame(elements.window,elements.icon);

  //get birth offset
  //var o = myframe.getBirthOffset();

  //get birth position
  var windowBirthPosition = myframe.birth;
  //console.log(o);

//get a random generated position to where spawn the object
  var windowSpawnPosition = myframe.getSpawnableArea();

  //Animate: opens or closes depending of which function is passed as animate()
  //could be revealWindowAnimation or closeWindowAnimation
  if (animate.name === 'revealWindowAnimation' || animate.name === 'closeWindowAnimation' ||  animate.name === 'restoreWindowAnimation' ) {
    animate(elements.window, windowBirthPosition.x, windowBirthPosition.y, windowSpawnPosition.x, windowSpawnPosition.y, callback);
  }else{
    //What to do with minimise
    var dockPosition = (getHeight() - ((myframe.size.height/2))-(myframe.size.height*0.4/2));
    animate(elements.window, windowBirthPosition.x, windowBirthPosition.y, windowSpawnPosition.x, dockPosition, callback);
  }

};


var speedCoefficient = 1.5;
//Set the window animation. Takes the App window dom element and
//the birth offset calculated by the WindowFrame class as parameters
function revealWindowAnimation(domElement, fromX, fromY, toX, toY, callback){

  zBoost(domElement);
  domElement.classList.add('visible');
  //Reset opacity to 1
  TweenLite.set(domElement,{opacity:1});
  //Aminimate from icon position to the randomly generated position by generateRandomPositionInsideArea() inside AnalysedWindowFrame

  //TweenLite.fromTo(domElement, 0.6, {left:fromX, top:fromY}, {bezier:{type:"quadratic", values:[{left:fromX, top:fromY}, {left:fromX, top:toY}, {left:toX, top:toY}], ease:Power4.easeOut}});

      //Manage the curve type based on different easing of X and Y
      if (fromY > toY) {
        //X
        TweenLite.fromTo(domElement, 0.4, {left:fromX}, {left:toX,ease:Power3.easeOut, onComplete:function(){console.log(domElement.id + " is open X");}});
        //Y
        TweenLite.fromTo(domElement, 0.7, {top:fromY}, {top:toY,ease:Power3.easeOut, onComplete:function(){
          console.log(domElement.id + " is open Y");
          if (callback !== undefined) {
            callback();
          }else {
            console.log('Cant find any callback');
          }
        }});
        // //scale
        TweenLite.fromTo(domElement, 0.6/speedCoefficient, {scale:0.1}, {scale:1,ease:Power3.easeOut});

      }else {
        //X
        TweenLite.fromTo(domElement, 0.7/speedCoefficient, {left:fromX}, {left:toX,ease:Power3.easeOut, onComplete:function(){
          console.log(domElement.id + " is open X");
          if (callback !== undefined) {
            callback();
          }else {
            console.log('Cant find any callback');
          }

        }});
        //Y
        TweenLite.fromTo(domElement, 0.4/speedCoefficient, {top:fromY}, {top:toY,ease:Power3.easeOut, onComplete:function(){console.log(domElement.id + " is open Y");}});
        // //scale
        TweenLite.fromTo(domElement, 0.6/speedCoefficient, {scale:0.1}, {scale:1,ease:Power3.easeOut});

      }


}

function closeWindowAnimation(domElement, toX, toY, undefined, undefined, callback){
  //Amimate potition back to the icon and scale

  TweenLite.to(domElement, 0.4/speedCoefficient,{left:toX,ease:Power3.easeOut});
  TweenLite.to(domElement, 0.6/speedCoefficient,{top:toY,scale:0.1,ease:Power3.easeOut, onComplete:function(){
    domElement.classList.remove('visible');
    if (callback !== undefined) {
      callback();
    }else {
      console.log('Cant find any callback');
    }
  }});
  //Dalay opacity to blend better its closling
  TweenLite.to(domElement,0.2/speedCoefficient,{delay:0.3/speedCoefficient,opacity:0});

}


function minimiseWindowAnimation(domElement, fromX, fromY, toX, toY, callback){
  //Amimate potition back to the icon and scale


  TweenLite.to(domElement, 0.5/speedCoefficient,{top:toY,scale:0.4,ease:Elastic.easeOut.config(1, 0.75), onComplete:function(){
    //domElement.classList.remove('visible');
    if (callback !== undefined) {
      callback();
    }else {
      console.log('Cant find any callback');
    }
  }});


}



function restoreWindowAnimation(domElement, fromX, fromY, toX, toY, callback){
  //Amimate potition back to the icon and scale

  zBoost(domElement);
  TweenLite.to(domElement, 0.5/speedCoefficient,{top:toY,scale:1,ease:Elastic.easeOut.config(1, 0.75), onComplete:function(){
    //domElement.classList.remove('visible');
    if (callback !== undefined) {
      callback();
    }else {
      console.log('Cant find any callback');
    }
  }});


}



function focusWindowAnimation(DOMframe){

  var element = document.getElementById(DOMframe);
  zBoost(element);
  TweenLite.fromTo(element, 0.1, {scale:1}, {scale:1.02,ease:Power2.easeInOut, onComplete:function(){
    TweenLite.fromTo(element, 0.3, {scale:1.02}, {scale:1,ease:Elastic.easeOut.config(1, 0.3)});
  }});
}



function silentFocusWindowAnimation(DOMframe){

  var element = document.getElementById(DOMframe);
  zBoost(element);
}



function showFinder() {
  console.log("SHOWING FINDER!");
}



function updateOsHeader (passedMenuList, passedAppID){
  var OSHeader = document.getElementById('OSHeader');
  var osMenu = document.getElementById('appMenu');
  //Menu on click behaviour
  osMenu.onclick = toggleOSMenu();
  //Clear contents
  osMenu.innerHTML = "";


  components.osHeaderTitle(osMenu, 'normal');


  //Make Menu
  var iter = 0
  for (property in passedMenuList) {
    var p = property;
    //Make dropdown container
    var menuListContainer = createElement('div','menuListContainer utils', undefined);




    osMenu.appendChild(menuListContainer);

    //Set style of of header (bold in case of first element/App name)
    var rowStyle;
    if (iter === 0 ? rawStyle = 'App-Name' : rawStyle = undefined);
    //Make column header
    var columnHeader = createElement('div','columnHeader', rawStyle, property);

    menuListContainer.appendChild(columnHeader);
//
    //Make dropdown menu
    var menuList = passedMenuList[property];

    //Make dropdown only if it has contents
    if (menuList.length > 0) {
      //Header on click behaviour
      menuListContainer.onmouseover = OSMenuBehaviour(menuListContainer, p);
      columnHeader.onclick = openOsMenu(columnHeader, p);

      //Make list container
      var dropdownContent = createElement('div','dropdownContent', property+'-dropdown');
      //make list

      for (var i = 0; i < menuList.length; i++) {
        if (menuList[i] !== '-') {
          var l = createElement('a',undefined, undefined, menuList[i][0]);
          l.onclick = bindMenuAction(passedAppID, menuList[i][1], menuList[i][0],);


        }else {
          var l = createElement('div','dropdownContentDivider', undefined, undefined);
        }
        dropdownContent.appendChild(l);

      }
      menuListContainer.appendChild(dropdownContent);
    }

    iter++;
  }
}


function bindMenuAction(passedAppID, functionName, fullName){
  return function(){
    console.log(window[passedAppID+'Exe']);
    console.log(passedAppID+'Exe'+'.'+'menuActions'+'.'+functionName);
    window[passedAppID+'Exe']['menuActions'][functionName](fullName, passedAppID);
  }
}







//AnalysedWindowFrame Class analyse Window and icon dom elements.
//Extracts all the relevant properties from them and calculaes the
//offset from which the window should animate
function AnalysedWindowFrame(w, i){
  // var st = window.getComputedStyle(w, null);
  // var matrix = st.getPropertyValue("transform");
  // values = matrix.match(/([-+]?[\d\.]+)/g);

  var appWindow = w;
  var icon = i;
  var appWindowOffsets = appWindow.getBoundingClientRect();
  var iconOffsets = icon.getBoundingClientRect();

  //Assign spawn position to the icon image, if it's an headless icon, use the container itself
  var iconSpawnObject;
  if (i.firstChild) {
    iconSpawnObject = i.firstChild;
  }else {
    iconSpawnObject = i;
  }

  var iconSize = {width:iconSpawnObject.offsetWidth,height:iconSpawnObject.offsetHeight};
  this.position = {
    "x":appWindowOffsets.left,
    "y":appWindowOffsets.top
  };
  //this.scale = values[0];
  this.size = {
    "width":appWindow.offsetWidth,
    "height":appWindow.offsetHeight
  },
  //The birth position is by defaut 0,0 at top left, sice we are scaling the object by its center we need
  //to calculate the position with the pivot at its center
  this.birth = {
    "x":iconOffsets.left + (iconSize.width/2) - (this.size.width/2),
    "y":iconOffsets.top + (iconSize.height/2) - (this.size.height/2)
  },
  this.getSpawnableArea = function(){
    //Spawn padding
    var margin = 140;
    //Get browser size
    var browser = {
      "width":getWidth(),
      "height":getHeight()
    };

    //Calculates the area where the windows can be spawn to
    var area = {
      "x":{
        "max":browser.width - this.size.width - margin,
        "min":margin
      },
      "y":{
        "max":browser.height - this.size.height - margin,
        "min":margin + 30
      }
    };

    function generateRandomPositionInsideArea(minX, maxX, minY, maxY){
      var rx = Math.floor(Math.random() * (maxX - minX + 1)) + minX;
      var ry = Math.floor(Math.random() * (maxY - minY + 1)) + minY;
      if(rx<0){rx=0};
      if(ry<26){ry=26};
      var randomPosition = {
        "x":rx,
        "y":ry
      }
      console.log(randomPosition);
      return randomPosition
    }
    return generateRandomPositionInsideArea(area.x.min, area.x.max, area.y.min, area.y.max)

  }
}

//Get window frame and icon from the DOM
function getAppElements(appWindow, appIcon){
  var w = document.getElementById(appWindow);
  var i = document.getElementById(appIcon);

  var elements = {
    "window":w,
    "icon":i
  };

  return elements;
}





//Bind key press to app
function bindKeyPressToApp(e){
  var currentApp = OS.ActivityMonitor.displayFocus();
  if (typeof window[currentApp+"Exe"] !== 'undefined' && typeof window[currentApp+"Exe"].keyCommands !== 'undefined') {
    window[currentApp+"Exe"].keyCommands(e);
  }

}
