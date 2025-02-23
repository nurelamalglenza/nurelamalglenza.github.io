var components = {};




/////////////////////////////////////////////////////////////////////////

// Desktop Menu Bar

//
// components.OSHeader = function() {
//   /////////
//   // create OS Bar container
//   var bar = createElement('header',undefined, 'OSHeader');
//       // // create OS icon
//       // var OSIcon = createElement('div', undefined, 'OS-Icon');
//       //
//       // // create OS Logo
//       // var OSMark = createElement('div', undefined, 'OS-Mark');
//   /////////
//         //Make menus container
//         var OSIcon = createElement('div', undefined, 'OS-Icon');
//
//   ///////////Hierarchy
//   //Append everything to DOM
//   file.appendChild(fileIcon);
//   file.appendChild(fileLabel);
//   fc.appendChild(file);
//   //////
// }
//
//
//
// <header id="OSHeader">
//
//   <div class="logo" id="OS-logo">
//     <div id="OS-Icon"></div>
//     <div class="mark" id="OS-mark">
//       nur E.A Glenza
//     </div>
//   </div>
//
//   <ul class="OS-Header" id="appMenu">
//     <li id="App-Name">eOS</li>
//     <li>File</li>
//     <li>Edit</li>
//     <li>View</li>
//   </ul>
//
// </header>




/////////////////////////////////////////////////////////////////////////

// Desktop Icon Component


components.desktopIcon = function(i, properties,fc, size) {
  /////////
  var a = properties;
  console.log(a.info.name.id);
  var id = a.info.name.id;
  var fileFormat = '.svg';


  var margin = {
    left:Math.floor(Math.random() * 60)+15 +'px',
    bottom:Math.floor(Math.random() * 10)+15 +'px',
  }

  var iconSize = '';
  if (size === 'Large') {
    iconSize = 'Large';
    margin.left = '0px';
    margin.bottom = '0px';
    fileFormat = '.jpg';
  }

  // create app file container
  var file = createElement('div','file'+iconSize, 'file-'+a.info.name.id);

  //Humanize icons position
  file.style.marginLeft = margin.left;
  file.style.marginBottom = margin.bottom;
      // create app icon
      var fileIcon = createElement('div',('file-icon'+iconSize), (a.info.name.id + "-icon"));
      console.log(a.root+id+fileFormat);
      fileIcon.style.backgroundImage = 'url("'+a.root+id+fileFormat+'")';

      // create app label
      var fileLabel = createElement('div','file-label'+iconSize, undefined, a.info.name.file);
  /////////

  ///////////Hierarchy
  //Append everything to DOM
  file.appendChild(fileIcon);
  file.appendChild(fileLabel);
  fc.appendChild(file);
  //////
}


/////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////

// Hidden(headless) Icon Component


components.headlessIcon = function(i, properties,fc, size) {
  /////////
  var a = properties;
  console.log(a.info.name.id);
  var id = a.info.name.id;
  var fileFormat = '.svg';



  // create app file container
  var file = createElement('div','fileHeadless', 'file-'+a.info.name.id);

      // // create app icon
      // var fileIcon = createElement('div',('file-iconHeadless'), (a.info.name.id + "-iconHeadless"));
      // fileIcon.style.backgroundImage = 'url("'+a.root+id+fileFormat+'")';
      //
      // // create app label
      // var fileLabel = createElement('div','file-label'+iconSize, undefined, a.info.name.file);
  /////////

  ///////////Hierarchy
  //Append everything to DOM
  // file.appendChild(fileIcon);
  // file.appendChild(fileLabel);
  fc.appendChild(file);
  //////
}


/////////////////////////////////////////////////////////////////////////

///Default window frame controls

components.controlButtons =
      '<li class="close" id="red"></li>'+
      '<li class="minimise" id="yellow"></li>'+
      '<li class="maximise" id="green"></li>';


/////////////////////////////////////////////////////////////////////////

////Window Frame Component

components.windowFrame = function(i, properties, wc) {

/////////
  var a = properties;
  // console.log(a);
  // console.log(idName);

// create app frame
  var appFrame = createElement('div','app-frame', ("frame-"+a.info.name.id));

      // create app toolbar
      var appToolbar = createElement('div','app-toolbar', 'toolbar-temp');
          // create app toolbar controls
          var appControls = createElement('ul','app-controls', ("cntrls-"+a.info.name.id));
              //Add window control buttons
              appControls.insertAdjacentHTML( 'beforeend', components.controlButtons );
          // create app toolbar title
          var appTitle = createElement('div','app-title', undefined, a.info.name.file);

      // create app canvas
      var appCanvas = createElement('div',('canvas'+" "+a.appearance.color), (a.info.name.id+"-canvas"));
      appCanvas.style.width = a.appearance.size.width + 'px';
      appCanvas.style.height = a.appearance.size.height + 'px';


      var appPlaceholderContainer = createElement('div','app-placeholderContainer', 'app-Loading', undefined);

      var appPlaceholderImage = createElement('div','app-placeholderImage', undefined, undefined);
      appPlaceholderImage.style.backgroundImage = "url("+a.root+a.info.name.id+".svg)";

      var appPlaceholderLoading = createElement('div','app-placeholderLoading', undefined, undefined);

/////////


///////////Hierarchy

  appToolbar.appendChild(appControls);
  appToolbar.appendChild(appTitle);

  appFrame.appendChild(appToolbar);
  appFrame.appendChild(appCanvas);

  appCanvas.appendChild(appPlaceholderContainer);
    appPlaceholderContainer.appendChild(appPlaceholderImage);
    appPlaceholderContainer.appendChild(appPlaceholderLoading);

  wc.appendChild(appFrame);
/////////

}


/////////////////////////////////////////////////////////////////////////



////Thumbnail in folder Component  ??????????????? TO DO??????

components.folderThumbnail = function(i, properties, fc) {

  /////////
  var a = properties;
  console.log(a.info.name.id);

  // create app file container
  var file = createElement('div','file', a.info.name.id);
  file.style.left = ''+ (100*i)+'px';
      // create app icon
      var fileIcon = createElement('div',('file-icon'+" "+a.appearance.color), (a.info.name.id + "-icon"));

      // create app label
      var fileLabel = createElement('div','file-label', undefined, a.info.name.file);
  /////////

  ///////////Hierarchy
  //Append everything to DOM
  file.appendChild(fileIcon);
  file.appendChild(fileLabel);
  fc.appendChild(file);
  //////

}


/////////////////////////////////////////////////////////////////////////

///BE AWARE THAT IMAGE LOADING NOW WAITS 3 SECONDS FOR TESTING PURPOSES ONLY!!!!!!!
////Thumbnail in folder Component  ??????????????? TO DO??????

components.image = function(style, desc, src, fc) {

  /////////
  var image = document.createElement("img");
  image.setAttribute("alt", desc);
  image.classList.add(style);
  image.draggable = false;
  //

  var imageSrc = new Image();

  imageSrc.onload = function(){
    var loadedSrc = this.src;
      image.src = loadedSrc;
      //image.srcset = loadedSrc;
      if (style === 'centered' || style === 'centeredSpaced') {
        image.style.maxWidth = image.naturalWidth + "px";
      }else if (style === 'centered-retina' || style === 'centered-retinaSpaced' ) {
        image.style.maxWidth = (image.naturalWidth/2) + "px";
      }
  };

  imageSrc.src = src;


  ///////////Hierarchy
  //Append everything to DOM
  fc.appendChild(image);

  //////

}


components.spacer = function(c){
  var spacer = createElement('div','imageSpacer', undefined, undefined);
  c.appendChild(spacer);
}







/////////////////////////////////////////////////////////////////////////



////////Header title

components.osHeaderTitle = function(container, type){

    var p = 'system';
    var label = 'Nūr E.A Glenza'

    //Make dropdown container
    var menuListContainer = createElement('div','menuListContainer', undefined);

    //Header on click behaviour
    menuListContainer.onmouseover = OSMenuBehaviour(menuListContainer, p);


    container.appendChild(menuListContainer);

    //Make column header
    var columnHeader = createElement('div','columnHeader', 'systemHeader', '<span id="systemHeader-mainLogo"></span>Nūr E.A Glenza');

    columnHeader.onclick = openOsMenu(columnHeader, p);

    menuListContainer.appendChild(columnHeader);

    //Make list container
    var dropdownContent = createElement('div','dropdownContent', p+'-dropdown');
    //make list

    ///!!!!!!
    var menuList = systemDropdown;
    for (var i = 0; i < menuList.length; i++) {
      if (menuList[i] !== '-') {
        var l = createElement('a',undefined, undefined, menuList[i][0]);
        l.onclick = bindMenuAction('appMenu', menuList[i][1], menuList[i][0],);
      }else {
        var l = createElement('div','dropdownContentDivider', undefined, undefined);
      }
      dropdownContent.appendChild(l);
    }
    menuListContainer.appendChild(dropdownContent);


}


/////////////////////////////////////////////////////////////////////////


//OS Info dropdown

components.infoMenu = function(){
  var OSHeader = document.getElementById('OSHeader');
    var osInfoMenu = document.getElementById('osInfo');
    osInfoMenu.onclick = toggleOSMenu();

    //Add CLOCK
 //   components.clock(osInfoMenu);

}

/////////////////////////////////////////////////////////////////////////





//OS Info dropdown

components.tooltipHelper = function(imageURL, text, waitTime, stayTime, position, container){

  var  tooltipContainer = createElement('div', 'tooltipContainer', undefined, undefined);
  tooltipContainer.onclick = function(){
    container.removeChild(tooltipContainer);
  }

  tooltipContainer.style.left = position[0];
  tooltipContainer.style.top = position[1];


  var  tooltipImage = createElement('div', 'tooltipImage', undefined, undefined);
  tooltipContainer.appendChild(tooltipImage);
  tooltipImage.style.backgroundImage = "url('"+imageURL+"')";

  var  tooltipText = createElement('div', 'tooltipText', undefined, text);
  tooltipContainer.appendChild(tooltipText);

  var  tooltipBG = createElement('div', 'tooltipBG', undefined, undefined);
  tooltipContainer.appendChild(tooltipBG);

  setTimeout(function () {
    container.appendChild(tooltipContainer);
    TweenLite.from(tooltipContainer, 0.4,{from:-100,ease:Power3.easeOut});
    setTimeout(function () {
      container.removeChild(tooltipContainer);
    }, stayTime);
  }, waitTime);


}

/////////////////////////////////////////////////////////////////////////



//OS Scroll down tooltip

components.tooltipScroll = function(color, container){

  var stationary = true;
  var  tooltipContainer = createElement('div', 'tooltipScroll tooltip-'+color, undefined, undefined);
  container.appendChild(tooltipContainer);

  container.onscroll = function() {
    if (container.contains(tooltipContainer)) {
      container.removeChild(tooltipContainer);
      console.log("SCROLLED");
      stationary = false;
    }
  }


}

/////////////////////////////////////////////////////////////////////////




//Clock
components.clock = function(DOMcontainer){
  var menuListContainer = createElement('div','menuListContainer', 'clockContainer');
  menuListContainer.onmouseover = OSMenuBehaviour(menuListContainer, 'clock');
  DOMcontainer.appendChild(menuListContainer);
    var columnHeader = createElement('div','columnHeader', 'clockHeader', '00:00:00');

    columnHeader.onclick = openOsMenu(columnHeader, 'clock');

    menuListContainer.appendChild(columnHeader);

    var dropdownContent = createElement('div','dropdownContent', 'clock-dropdown');
    menuListContainer.appendChild(dropdownContent);

      var clockFaceContainer = createElement('div',undefined, 'clockFaceContainer', undefined);
      dropdownContent.appendChild(clockFaceContainer);


      //Make clock description container
      var clockDecriptionContainer = createElement('div',undefined, 'clockDecriptionContainer', undefined);

      //Make Clock description
      var clockDescriptionHeader = createElement('div','calendarInfo clockDescriptionHeader', undefined, 'WTF is this?');
      clockDecriptionContainer.appendChild(clockDescriptionHeader);
      var copy =  "The clock, reshaped over a typical day in human life.<br /><br /> \n"+
                "The day is split into 150 hours. (-25 to 125)<br /><br /> \n"+
                "Each hour is weighted differenttly depending on how it is perceived.";

      var clockDescriptionBody = createElement('div','calendarInfo', 'clockDescriptionBody', copy);
      clockDecriptionContainer.appendChild(clockDescriptionBody);




      //Make clock year status
      dropdownContent.appendChild(clockDecriptionContainer);



        var clockYearHeading = createElement('div','calendarInfo clockDescriptionHeader', 'clockYearHeading' , 'Year Phase');
        var clockPercentage = createElement('div','calendarInfo', 'clockPercentage', '...');
        var clockDays = createElement('div','calendarInfo', 'clockDays', '...');
        clockDecriptionContainer.appendChild(clockYearHeading);

        var yearPercentageGroup = createElement('div',undefined, 'yearPercentageGroup', undefined);
        clockDecriptionContainer.appendChild(yearPercentageGroup);
        yearPercentageGroup.appendChild(clockPercentage);



        //Make Solar system
        var solarSystemContainer = createElement('div',undefined, 'solarSystemContainer', undefined);
        yearPercentageGroup.appendChild(solarSystemContainer);

        //Make earth
        var earthContainer = createElement('div',undefined, 'earthContainer', undefined);
        solarSystemContainer.appendChild(earthContainer);



        var earthShape = createElement('div',undefined, 'earthShape', undefined);
        earthContainer.appendChild(earthShape);

        var solarSystemCanvas = createElement('canvas',undefined, 'solarSystemCanvas', undefined);
        solarSystemContainer.appendChild(solarSystemCanvas);
        solarSystemCanvas.width = 100;
        solarSystemCanvas.height = 100;

        //Make solarSystemCanvas
        var ssCxt = solarSystemCanvas.getContext('2d');

        var solarSystemSettings = {
          position:{x: solarSystemCanvas.width / 2, y:solarSystemCanvas.height / 2},
          strokeWidth:2,
          radius : 40,
          orientation : 360/4*(3),
          degPI : Math.PI/180,
          onePercent : 360 / 100,
          colors:['#0004FF','#00FFC5','#FFF200']
        }


        function makeSolarSystem(degrees){

            ssCxt.clearRect( 0, 0, solarSystemCanvas.width, solarSystemCanvas.height );
            //Make Base Line
            ssCxt.beginPath();
            ssCxt.arc( solarSystemSettings.position.x, solarSystemSettings.position.y, solarSystemSettings.radius, solarSystemSettings.degPI * solarSystemSettings.orientation, solarSystemSettings.degPI * (solarSystemSettings.orientation + 360) );
            ssCxt.strokeStyle = solarSystemSettings.colors[0];
            ssCxt.lineWidth = solarSystemSettings.strokeWidth;
            ssCxt.stroke();

            //Make highlighted Line
            ssCxt.beginPath();

            ssCxt.strokeStyle = solarSystemSettings.colors[1];
            ssCxt.lineWidth = solarSystemSettings.strokeWidth;
            ssCxt.arc( solarSystemSettings.position.x, solarSystemSettings.position.y, solarSystemSettings.radius, solarSystemSettings.degPI * solarSystemSettings.orientation, solarSystemSettings.degPI * (solarSystemSettings.orientation + degrees) );
            ssCxt.stroke();

            //Make sun
            ssCxt.beginPath();
            ssCxt.strokeStyle = undefined;
            ssCxt.lineWidth = undefined;
            ssCxt.fillStyle = solarSystemSettings.colors[2];
            ssCxt.arc( solarSystemSettings.position.x, solarSystemSettings.position.y, 12, 0, 2*Math.PI );
            ssCxt.fill();
        }

        function getDegreesFromPercentage(percentage){
          return solarSystemSettings.onePercent * percentage;
        }

        //Add Clock days
        clockDecriptionContainer.appendChild(clockDays);




        var dayViewHeader = createElement('div','calendarInfo', 'dayViewDescriptionHeader', 'Day Breakdown');
        clockFaceContainer.appendChild(dayViewHeader);




      ///Make Day View
        var blocksContainer = createElement('div',undefined, 'blocksContainer', undefined);
        clockFaceContainer.appendChild(blocksContainer);


        //Make day labels
        var morning = createElement('div','clockFaceVerticalLabels', 'clockLabelA', 'Morning');
        var afternoon = createElement('div','clockFaceVerticalLabels', 'clockLabelB', 'Afternoon');
        blocksContainer.appendChild(morning);
        blocksContainer.appendChild(afternoon);

        var blockRows = [
          [25],
          [10, 5, 5, 10, 20],
          [5, 5, 10, 20, 10],
          [25]
        ];

        var rowsGroups = [ 1, 5, 5, 1 ];

          //Make all rows
        var timeStamp = -25;
        //Make Sections
        for (var s = 0; s < blockRows.length; s++) {
          var blocksSection = createElement('div','blocksSection', undefined, undefined);
          blocksContainer.appendChild(blocksSection);

          //Make rows into the group
          //make number of rows speciified in the current rowsGroup array
          for (var i = 0; i < blockRows[s].length; i++) {
            //make row
            var row = createElement('div','blocksRow', undefined, undefined);

            var currentRowSize;
            blocksSection.appendChild(row);
              currentRowSize = blockRows[s][i];
              for (var j = 0; j < currentRowSize; j++) {
                //make block
                var block = createElement('div','block block'+currentRowSize, 'time_'+timeStamp, undefined);
                row.appendChild(block);
                timeStamp++;
              }

            var faceNumber = createElement('div','clockFaceNumberLabels', 'number'+currentRowSize, timeStamp);
            row.appendChild(faceNumber);
          }
        }





    //Clock Logic

    function getCurrentTimeInMilliseconds(midnightTime, nowTime) {
      var m = midnightTime.getTime();
      var n = nowTime.getTime();
      var diff = n - m;
      return diff;
    }

    function zeroPad(number) {
      var isNegative = false;
      var n = number.toString();
      //Check if number is negative
      if (n[0] === '-') {
        isNegative = true;
        //remove minus sign
        n = n.substr(1);
      }
      //Check if number has less than 2 characters
      if (n.length < 2) {
        n = "0" + n;
      }
      //if number was negative, add the minus sign back in
      if (isNegative ? n = '-'+n : n);
      return n;
    }
    var now;
    var habitour_flooredShift;
    var habituts_floored;
    var habitonds_floored;

    setInterval(function(){
    var millisecondsInADay = 1000*60*60*24;
    now = new Date();
    //shifDayStartingPoint
    now.setHours(now.getHours()-2);
    var midnight = new Date(now.getFullYear(), now.getMonth() ,now.getDate());
    //Calculate current time in milliseconds, in regular format
    var regularTimeInMilliseconds = getCurrentTimeInMilliseconds(midnight, now);

    //Convert regular format milliseconds to habit format hours
    var habitour = regularTimeInMilliseconds/millisecondsInADay*150;
    var habitour_floored = Math.floor(habitour);
    habitour_flooredShift = habitour_floored-25;
    //Get minutes from hours
    var habituts = habitour*100-(habitour_floored*100);
    habituts_floored = Math.floor(habituts);
    //Get seconds from minutes
    var habitonds = habituts*100 - (habituts_floored*100);
    habitonds_floored = Math.floor(habitonds);


    columnHeader.innerHTML = zeroPad(habitour_flooredShift) + ":" + zeroPad(habituts_floored) + ":" + zeroPad(habitonds_floored);

    updateFace(habituts_floored, habitonds_floored);
    }, 57.6);

    var allBlocks;
    var currentTimeContainer;
    var currentTimeContainerID;
    var minutesSignal;
    var secondsSignal;

    //Clock face behaviour
    function initFace(){
      console.log(habitour_flooredShift);
      console.log(habituts_floored);
      console.log(habitonds_floored);

      var clockPercentageDOM = document.getElementById('clockPercentage');
      var clockDaysDOM = document.getElementById('clockDays');


      var revolutionCalendar = getRevolutionCalendar();
      console.log(revolutionCalendar.percentage);

      var degrees = getDegreesFromPercentage(revolutionCalendar.percentage);
      earthContainer.style.transform = "rotate("+(degrees+90)+"deg)";
      makeSolarSystem(degrees);

      clockPercentageDOM.innerHTML = revolutionCalendar.percentage+"%";
      clockDaysDOM.innerHTML = revolutionCalendar.days;




      allBlocks = document.getElementsByClassName('block');

      //Black out passed time
      for (var i = 0; i < habitour_flooredShift+25; i++) {
        allBlocks[i].classList.add('blockGone');
      }

      //Set current time block as active
      currentTimeContainer = document.getElementById('time_'+habitour_flooredShift);
      currentTimeContainer.classList.add('blockCurrent');
      currentTimeContainerID = habitour_flooredShift;

      //Create Minutes and seconds blocks inside current hour time

      //Make seconds
      secondsSignal = createElement('div',undefined, 'secondsSignal', undefined);
      currentTimeContainer.appendChild(secondsSignal);
      //Make minutes
      minutesSignal = createElement('div',undefined, 'minutesSignal', undefined);
      currentTimeContainer.appendChild(minutesSignal);


    }
    setTimeout(initFace, 57.6);

    function updateFace(minutes, seconds){
      // if (goneBlocks !== ) {
      //
      // }
      if (secondsSignal !== undefined) {
        //move clockSignals to current hour(if hour updates)
        if (currentTimeContainerID !== habitour_flooredShift) {



          clearFace();
          //Reset old time to normal block
          currentTimeContainer.classList.remove('blockCurrent');
          //Mark old time as passed
          currentTimeContainer.classList.add('blockGone');

          //Select the new time block
          currentTimeContainer = document.getElementById('time_'+habitour_flooredShift);
          //Make it current
          currentTimeContainer.classList.add('blockCurrent');

          //Append seconds and minutes to new time block
          currentTimeContainer.appendChild(secondsSignal);
          currentTimeContainer.appendChild(minutesSignal);

          //Update currentTimeContainerID for the next tick
          currentTimeContainerID = habitour_flooredShift;

        }

        secondsSignal.style.transform = 'scale('+seconds/100+')';
        //Set minumum size to 10
        minutesSignal.style.transform = 'scale('+Math.max(10/100, minutes/100)+')';
      }
    }


    function clearFace(){
      //Clear all
      currentTimeContainer.classList.remove('blockCurrent');
      for (var i = 0; i < 150; i++) {
        allBlocks[i].classList.remove('blockGone');
      }
      for (var i = 0; i < habitour_flooredShift+25; i++) {
        allBlocks[i].classList.add('blockGone');
      }
    }

    function getRevolutionCalendar(){
      //Get day of the Year
      now = new Date();
      //shifDayStartingPoint
      now.setHours(now.getHours()-2);
      var start = new Date(now.getFullYear(), 0, 0);
      var diff = (now - start) + ((start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000);
      var oneDay = 1000 * 60 * 60 * 24;
      var day = Math.floor(diff / oneDay);
      console.log('Day of year: ' + day);

      var calendar = {
        percentage:Math.floor((day/365)*100),
        days:day+"/365"
      }
      return calendar;
    }
}
