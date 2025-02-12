var memeExe = {}
memeExe.uniqueAppID = 'meme';

memeExe.optimalImageRadius = 450;



if (typeof installedApps !== 'undefined') {


  installedApps[memeExe.uniqueAppID].OsMenu = {
    [installedApps[memeExe.uniqueAppID].name] : [['Quit','quitApp']],
    'View': [['Minimize','minimizeApp'], ['Zoom','zoomApp'], '-', ['Enter Full Screen','enterFullScreen']]

  }

}





//////////////////////////////
////MENU ACTIONS///////
//////////////////////////////
memeExe.menuActions = {};

memeExe.menuActions.quitApp = appMenuExe.menuActions.quitApp;

memeExe.menuActions.openImage = function(){

  memeExe.dom.memeUploadInput.click();

}

memeExe.menuActions.exportImage = function(){

  memeExe.downloadImage();

}


memeExe.menuActions.shareFB = appMenuExe.menuActions.shareFB;

memeExe.menuActions.shareTwitter = appMenuExe.menuActions.shareTwitter;


memeExe.menuActions.minimizeApp = appMenuExe.menuActions.minimizeApp;

memeExe.menuActions.zoomApp = appMenuExe.menuActions.zoomApp;

memeExe.menuActions.enterFullScreen = appMenuExe.menuActions.enterFullScreen;

memeExe.menuActions.reportBug = appMenuExe.menuActions.reportBug;


memeExe.menuActions.closingApp = function(){
  console.log("Closing App");
}

//////////////////////////////
//////////////////////////////



memeExe.css = new CssComponent(memeExe.uniqueAppID);



memeExe.css.set('id', memeExe.uniqueAppID+'-canvas',{
  'background-color' : 'var(--aqua)',
});



memeExe.css.set('class', 'memeViewportWrapper',{
  // 'background-color': 'var(--blue)',
  'display': 'flex',
  'height': '540px',
  'position': 'relative',
  'z-index': '0'
});

memeExe.css.set('class', 'memeImageWrapper',{
  // 'background-color': 'pink',
  'flex-grow': '1',
  'display': 'flex',
  'justify-content': 'center',
  'align-items': 'center'
});

memeExe.css.set('class', 'imageContainer',{
  // 'background-color': 'red',
  'position': 'relative',
  'width': memeExe.optimalImageRadius+'px',
  'height': memeExe.optimalImageRadius+'px',
  'border': 'solid black 2px'
});


memeExe.css.set('id', 'memeExeInputs input',{
  'text-align': 'center'
});


memeExe.css.set('class', 'memeHandlers',{
  'font-family': 'Impact',
  'font-size': '25px',
  'margin':'0',
  'padding': '0',
  'text-transform': 'uppercase',
  'width': '400px',
  'color': '#ffffff',
  'background-color': 'transparent',
  'border':'none',
  'left': '20px'
});


memeExe.css.set('class', 'memeHandlers:focus',{
  'outline': 'none',
  'border-bottom': '1px #ffffff solid',
  'margin-bottom': '-2px',
  'border': '2px solid var(--yellow)',
  'padding': '10px',
  'margin': '-12px'
});

memeExe.css.set('id', 'memeHandler-top',{
  'position': 'absolute',
  'top': '20px'
});

memeExe.css.set('id', 'memeHandler-bottom',{
  'position': 'absolute',
  'bottom': '20px'
});


memeExe.css.set('id', 'presetsContainer',{
  // 'background-color': 'yellow',
  'width' : '270px',
  'overflow-y': 'scroll',
  'display': 'flex',
  'flex-wrap': 'wrap',
  'padding-top': '35px',
  'align-items': 'center',
  'direction': 'rtl'
});


memeExe.css.set('id', 'memeRender',{
  'background': 'var(--black)',
  'width': memeExe.optimalImageRadius+'px',
  'height': memeExe.optimalImageRadius+'px',
  'position':'relative',
  'z-index':'0'
});



memeExe.css.set('id', 'memeDownload',{
    'background': 'var(--yellow)',
    'color': 'var(--black)'
});




memeExe.css.set('class', 'thumb',{
    'width': '110px',
    'height': '110px',
    'background': 'var(--black)',
    'margin-left': '10px',
    'margin-right': '10px',
    'margin-bottom': '20px',
    'background-size': 'cover',
    'background-position': 'center',
    'cursor': 'pointer',
    'position':'relative',
    'box-shadow': '0 0 0 1px var(--black)'
});



memeExe.css.set('class', 'thumb.active',{
    'box-shadow': '0 0 0 3px var(--yellow)'

});








memeExe.root = 'apps/MemeGenerator/';


memeExe.start = function (applicant) {
  if (applicant !== 'OS') {
    memeExe.root = '';
  }


  //startAPP
  memeExe.makeView();
  memeExe.makeLogic();

}






/////////////////////////////////////////////////////////////////
///App View//////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
memeExe.makeView = function(){

  var a = memeExe;


  a.db = [
    "dicaprio",
    "aliens",
    "facepalm",
    "brian",
    "futurama",
    "mother",
    "no",
    "skepticalKid",
    "toystory",
    "wat",
    "wonka",
    "yoda",
    "onlyone",
    "oprah"
  ];

  a.selectedDOMThumbnail;




  a.dom = {};

  a.dom.windowContainer = document.getElementById(memeExe.uniqueAppID+'-canvas');

  //Make App header
  a.dom.appHeader = createElement('div','appHeader dark-illegalTeal', undefined, undefined);
  a.dom.windowContainer.appendChild(a.dom.appHeader);

    a.dom.memeUploadButton = createElement('a','appHeaderButton uploadButton', 'memeUpload', 'Upload Image');
    a.dom.appHeader.appendChild(a.dom.memeUploadButton);

          a.dom.memeUploadInput = document.createElement("input");
          a.dom.memeUploadInput.setAttribute("id", "memeUploadInput");
          a.dom.memeUploadInput.setAttribute("type", "file");
          a.dom.memeUploadButton.appendChild(a.dom.memeUploadInput);



    a.dom.memeDownloadButton = createElement('a','appHeaderButton', 'memeDownload', 'Download this piece');
    a.dom.appHeader.appendChild(a.dom.memeDownloadButton);





  /////////////////////////////////////////////////////////////////
  //Make Viewport Wrapper
  a.dom.memeViewportWrapper = createElement('div','memeViewportWrapper', undefined, undefined);
  a.dom.windowContainer.appendChild(a.dom.memeViewportWrapper);




  /////////////////////////////////////////////////////////////////
  //Presets container

  a.dom.presetsContainer = createElement('div',undefined, 'presetsContainer', undefined);
    //Add thumbnails presets
    for (var i = 0; i < a.db.length; i++) {
      var preset = createElement('div', 'thumb', a.db[i], undefined);
      var imageSrc = memeExe.getImgPath(a.db[i], 'cssFormat');
      preset.style.backgroundImage = "url(" + imageSrc + ")";
      //Save the first child as selected
      if (i === 0) {
        preset.classList.add('patternedShadow-Large');
        preset.classList.add('active');
        a.selectedDOMThumbnail = preset;
      }
      a.dom.presetsContainer.appendChild(preset);
    }
  a.dom.memeViewportWrapper.appendChild(a.dom.presetsContainer);


  /////////////////////////////////////////////////////////////////
  //Make Viewport Wrapper
  a.dom.memeImageWrapper = createElement('div','memeImageWrapper', undefined, undefined);
  a.dom.memeViewportWrapper.appendChild(a.dom.memeImageWrapper);

  /////////////////////////////////////////////////////////////////
  //Make Image container
  a.dom.imageContainer = createElement('div','imageContainer patternedShadow', undefined, undefined);
  a.dom.memeImageWrapper.appendChild(a.dom.imageContainer);

      //Make renderCanvas container
      a.dom.renderContainer = createElement('canvas',undefined, 'memeRender', undefined);
      a.dom.imageContainer.appendChild(a.dom.renderContainer);


      //Make Input container
      a.dom.inputsContainer = createElement('div',undefined, 'memeExeInputs', undefined);

          //Input top
          a.dom.inputTop = createElement('input','memeHandlers', 'memeHandler-top', undefined);
          a.dom.inputTop.setAttribute('autocomplete', 'off');
          a.dom.inputTop.setAttribute('type', 'text');
          a.dom.inputTop.setAttribute('value', "I made my own meme once");
          //Input bottom
          a.dom.inputBottom = createElement('input','memeHandlers', 'memeHandler-bottom', undefined);
          a.dom.inputBottom.setAttribute('autocomplete', 'off');
          a.dom.inputBottom.setAttribute('type', 'text');
          a.dom.inputBottom.setAttribute('value', "It was awful");

          a.dom.inputsContainer.appendChild(a.dom.inputTop);
          a.dom.inputsContainer.appendChild(a.dom.inputBottom);

      a.dom.imageContainer.appendChild(a.dom.inputsContainer);
  /////////////////////////////////////////////////////////////////

  a.dom.inputTop.focus();


}










memeExe.makeLogic = function(){
  var a = memeExe;

  a.ratio = 2;
  a.padding = 20;
  a.memeImage;
  a.currentImage;
  a.inputs;
  a.topText;
  a.bottomText;
  a.topFontSize;
  a.bottomFontSize;
  a.customImages = [];


  a.ctx = a.dom.renderContainer.getContext('2d');
  a.canvasDomWidth;
  a.canvasDomHeight;





  a.addListeners();
  a.loadMeme("dicaprio");





}



/////////////////////////////////////////////////////////////////
/////App Methods///////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////



memeExe.init = function() {
  memeExe.topText = memeExe.dom.inputTop.value;
  memeExe.bottomText = memeExe.dom.inputBottom.value;
};


/////



memeExe.getImgPath = function(imageName, format) {
  var apo = '';
  if (format === 'cssFormat') {
    apo = '"';
  }

  var path;

  if (imageName.search("custom") !== -1) {
    console.log("ITS A CUSTOM IMAGE");
    var extractedID = imageName.split('custom');
    console.log("IMAGE ID IS "+extractedID[1]);
    path = apo+ memeExe.customImages[extractedID[1]] +apo;
  }else {
    path = apo+memeExe.root+'img/memes/' + imageName +'.jpg'+apo;
  }


  return path
};


////


memeExe.setMemeSize = function(memeWidth,memeHeight) {


  var imageRatio = memeWidth/memeHeight;

  var optimalImageRadius = memeExe.optimalImageRadius;
  //Adapt height to width proportionally
  var computedImageWidth = optimalImageRadius;
  var computedImageHeight = optimalImageRadius/imageRatio;
  //If after computation the height is bigger than the optimalImageRadius
  //than adapt width to height
  if (computedImageHeight > optimalImageRadius) {
    computedImageHeight = optimalImageRadius;
    computedImageWidth = optimalImageRadius * imageRatio;
  }

  memeExe.dom.renderContainer.width = computedImageWidth * memeExe.ratio;
  memeExe.dom.renderContainer.height = computedImageHeight * memeExe.ratio;


  //Set the canvas size to match the image size/ratio
  memeExe.canvasDomWidth = memeExe.dom.renderContainer.width/memeExe.ratio;
  memeExe.canvasDomHeight = memeExe.dom.renderContainer.height/memeExe.ratio;

  //Set the canvas container to be the same as the canvas
  memeExe.dom.renderContainer.style.width = memeExe.canvasDomWidth + "px";
  memeExe.dom.renderContainer.style.height = memeExe.canvasDomHeight + "px";
  memeExe.ctx.scale(2, 2);


  //Set the imageContainer to be the same as the canvas
  memeExe.dom.imageContainer.style.width = memeExe.canvasDomWidth + "px";
  memeExe.dom.imageContainer.style.height = memeExe.canvasDomHeight + "px";

}




/////

memeExe.loadMeme = function(type){
  memeExe.memeImage = new Image();

  memeExe.memeImage.onload = function(){
      memeExe.draw(this, true);
  }
  memeExe.memeImage.src = memeExe.getImgPath(type, 'jsFormat');

}


/////


memeExe.drawMemeText = function(text, size, base) {

    var copy = text.toUpperCase();
    var fontSize = getFontSizeToFit(copy);
    var Ypos;
    switch (base) {
      case "top":
        Ypos = memeExe.padding;
        memeExe.topFontSize = fontSize;
        break;
      case "bottom":
        Ypos = memeExe.canvasDomHeight - memeExe.padding;
        memeExe.bottomFontSize = fontSize;
        break;
    }

    memeExe.ctx.font = fontSize +"px Impact";
    memeExe.ctx.textBaseline = base;
    memeExe.ctx.textAlign = 'center';
    memeExe.ctx.strokeStyle = '#000000';
    memeExe.ctx.lineCap="round";
    memeExe.ctx.lineJoin="round";
    memeExe.ctx.lineWidth = 6;
    memeExe.ctx.strokeText(copy, memeExe.canvasDomWidth/2, Ypos);
    memeExe.ctx.fillStyle = '#ffffff';
    memeExe.ctx.fillText(copy, memeExe.canvasDomWidth/2, Ypos);
    var m = memeExe.ctx.measureText(copy);


    function getFontSizeToFit(text){
    	var size = measureTextWidth(text, 10, 100);
    	return size;
    }


    function measureTextWidth(text, min, max) {
    	if (max-min < 1) {
    		return min;
    	}
    	var test = min+((max-min)/2);
    	memeExe.ctx.font=test+"px "+"Impact";
    	measureTest = memeExe.ctx.measureText(text).width;
    	if ( measureTest > memeExe.canvasDomWidth-(memeExe.padding*2)) {
    		var found = measureTextWidth(text, min, test)
    	} else {
    		var found = measureTextWidth(text, test, max)
    	}
    	return found;
    }

}




/////




memeExe.updateMeme = function(e) {
  setTimeout(function(){
    memeExe.topText = memeExe.dom.inputTop.value;
    memeExe.bottomText = memeExe.dom.inputBottom.value;
    memeExe.draw(memeExe.memeImage,true);
    memeExe.updateHandles();
  },1);
}

/////

memeExe.renderMeme = function(e) {
    memeExe.topText = memeExe.dom.inputTop.value;
    memeExe.bottomText = memeExe.dom.inputBottom.value;
    memeExe.draw(memeExe.memeImage,true);
}

/////

memeExe.draw = function(imageLink,render){
  memeExe.setMemeSize(imageLink.width, imageLink.height);
  memeExe.ctx.fillRect(0, 0, memeExe.dom.renderContainer.width, memeExe.dom.renderContainer.height);
  memeExe.ctx.drawImage(imageLink,0,0,memeExe.canvasDomWidth,memeExe.canvasDomHeight);
  memeExe.drawMemeText(memeExe.topText, 75, "top");
  memeExe.drawMemeText(memeExe.bottomText, 55, "bottom");
  if (!render) {
    memeExe.ctx.drawImage(imageLink,0,0);
    console.log("all empty");
  }
  memeExe.updateHandles();
};

/////



memeExe.changeImage = function(e) {

  var userSource = false;
  var t;
  if (typeof e.target === 'undefined') {
    //Setting image source to be from user
    userSource = true;
    t = e;
  }else {
    t = e.target.id;
  }

  if(t !== "presetsContainer"){
    //Clean previous selected item
    memeExe.selectedDOMThumbnail.classList.remove('active');
    memeExe.selectedDOMThumbnail.classList.remove('patternedShadow-Large');
    //Get new selected item
    memeExe.selectedDOMThumbnail = document.getElementById(t);
    memeExe.selectedDOMThumbnail.classList.add('patternedShadow-Large');
    memeExe.selectedDOMThumbnail.classList.add("active");
    console.log("Changing image to: " + t);

      memeExe.memeImage.onload = function(){
          memeExe.draw(this, true);
      }
      //console.log(memeExe.customImages);
      console.log(t);
      memeExe.memeImage.src = memeExe.getImgPath(t, 'jsFormat');
  }
  if (e.target) {

  }
  if (!userSource) {
    e.stopPropagation();
  }

}


/////

memeExe.downloadImage = function() {
  memeExe.renderMeme();
  var fileName = memeExe.topText + " - Made With nurdot com";

  memeExe.dom.renderContainer.toBlob(function(blob) {
    saveAs(blob, fileName);
  });
  memeExe.updateMeme();

  console.log("DONWLOADING IMAGE");

}


/////

memeExe.updateHandles = function(){

  var maxWidth = memeExe.canvasDomWidth-(memeExe.padding*2);

  memeExe.dom.inputTop.style.width =  maxWidth + "px";
  memeExe.dom.inputBottom.style.width =  maxWidth + "px";

  memeExe.dom.inputTop.style.fontSize = memeExe.topFontSize + "px";
  memeExe.dom.inputBottom.style.fontSize = memeExe.bottomFontSize + "px";

};

/////

memeExe.addListeners = function() {
    memeExe.dom.presetsContainer.addEventListener('click', memeExe.changeImage);

    memeExe.dom.inputsContainer.addEventListener('keydown', memeExe.updateMeme);
    memeExe.dom.inputsContainer.addEventListener('keyup', memeExe.updateMeme);
    memeExe.dom.inputsContainer.addEventListener('focusout', memeExe.renderMeme);
    memeExe.dom.memeDownloadButton.addEventListener('click', memeExe.downloadImage);
    //memeExe.dom.memeUploadButton.addEventListener('click', memeExe.uploadFile);
    memeExe.dom.memeUploadInput.addEventListener("change", handleFiles, false);
    memeExe.init();
};



/////


function handleFiles() {
  console.log('handleling');
  var file = this.files[0]; /* now you can work with the file list */

  var reader  = new FileReader();
    // it's onload event and you forgot (parameters)
    reader.onload = function(e)  {
      var customMemeID = memeExe.customImages.length;
      var newThumb = createElement('div', 'thumb', 'custom'+customMemeID);
      memeExe.dom.presetsContainer.insertBefore(newThumb, memeExe.dom.presetsContainer.firstChild );
        var image = document.createElement("img");

        memeExe.customImages.push(e.target.result);
        // the result image data
        //newThumb.style.backgroundImage = 'url("img/memes/futurama.jpg")';
        newThumb.style.backgroundImage = 'url("'+memeExe.customImages[customMemeID]+'")';
        // image.src = e.target.result;
        // document.body.appendChild(image);
        memeExe.changeImage('custom'+customMemeID);
     }
     // you have to declare the file loading
     reader.readAsDataURL(file);
}




memeExe.uploadFile = function() {
  var newThumb = createElement('div', 'thumb', 'custom'+Math.random(), undefined);
  memeExe.dom.presetsContainer.insertBefore(newThumb, memeExe.dom.presetsContainer.firstChild );
  var newImage = document.createElement("img");
  newThumb.appendChild(newImage);

  var file = document.querySelector('input[type=file]').files[0];
  var reader = new FileReader();

  reader.addEventListener("load", function () {
    console.log("Loaded");
    newImage.src = reader.result;
  }, false);

  if (file) {
    reader.readAsDataURL(file);
  }
}
