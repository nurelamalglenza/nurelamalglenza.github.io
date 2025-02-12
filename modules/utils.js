Array.prototype.removeMatchingString = function() {
    var what, a = arguments, L = a.length, ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};

Array.prototype.move = function (old_index, new_index) {
    if (new_index >= this.length) {
        var k = new_index - this.length;
        while ((k--) + 1) {
            this.push(undefined);
        }
    }
    this.splice(new_index, 0, this.splice(old_index, 1)[0]);
    return this; // for testing purposes
};

Array.prototype.insert = function (index, item) {
  this.splice(index, 0, item);
};


Array.prototype.remove = function(item) {
    this.splice(item,1);
  };


///////////////////////////////////////////////////////////////////////////////
function addDraggable(subject, handle, onClick){
  Draggable.create(subject, {
    trigger: handle,
    type:"top,left",
    bounds:"content",
    edgeResistance:0.75,
    cursor:"pointer",
    throwProps:true,
    onPress: onClick
  });
}


///////////////////////////////////////////////////////////////////////////////


  //PREVENT DOUBLE TAP TO ZOOM ON IOS10
  var lastTouchEnd = 0;
  document.documentElement.addEventListener('touchend', function (event) {
    var now = (new Date()).getTime();
    if (now - lastTouchEnd <= 300) {
      event.preventDefault();
    }
    lastTouchEnd = now;
  }, false);

  //PREVENT PINCH ON IOS10
  document.documentElement.addEventListener('touchstart', function (event) {
    if (event.touches.length > 1) {
      event.preventDefault();
    }
  }, false);


///////////////////////////////////////////////////////////////////////////////



//GET BROWSER WIDTH

function getWidth() {
  if (self.innerWidth) {
    return self.innerWidth;
  }

  if (document.documentElement && document.documentElement.clientWidth) {
    return document.documentElement.clientWidth;
  }

  if (document.body) {
    return document.body.clientWidth;
  }
};


//GET BROWSER HEIGHT

function getHeight() {
  if (self.innerHeight) {
    return self.innerHeight;
  }

  if (document.documentElement && document.documentElement.clientHeight) {
    return document.documentElement.clientHeight;
  }

  if (document.body) {
    return document.body.clientHeight;
  }
};



/////////////////////////////////////////////////////////////////////////

//Easy insert DOM HTML string
function insertHTML(parent, position, html) {

    var div = document.getElementById(parent);

  div.insertAdjacentHTML( 'beforebegin', html );
}

/////////////////////////////////////////////////////////////////////////


//Load an image
function loadImage(imageSrc, successful, failed) {
    var img = new Image();
    img.onload = successful;
    img.onerror = failed;
    img.src = imageSrc;
};


//Load some heavy files in background
function loadVideo(url){

  var video = document.createElement('video');
  video.src = url;
  video.autoplay = true;
  video.load();

  video.onprogress = function(e) {
    //console.log(e);
  }
}

/////////////////////////////////////////////////////////////////////////

//Easy create DOM HTML object
function createElement(type, className, id, content) {
  var element = document.createElement(type);
  if (className !== undefined) {
    element.setAttribute("class", className);
  }

  if (id !== undefined) {
    element.setAttribute("id", id);
  }

  if (content !== undefined) {
    // var textNode = document.createTextNode(content);
    // element.appendChild(textNode);
    element.innerHTML = content;
  }

  return element;

}


function createSvg(className, id, url){
  var element = createElement('object', className, id, undefined);
  element.setAttribute("type","image/svg+xml");
  element.setAttribute("data", url);

  return element;
}


//Common Embeds

/////////////////////////////////////////////////////////////////////////
//Sketchfab embed
function createSketchfab(size, modelID){
  var sketchfabIframe = '<iframe width="'+size.width+'" height="'+size.height+'" src="https://sketchfab.com/models/'+modelID+'/embed?autostart=1&scrollwheel=0"></iframe>';
  var iframe = createElement('div','sketchfab-embed-wrapper', undefined, sketchfabIframe);
  return iframe;
}


//Vimeo embed
function createVimeo(size, videoID){
  var vimeoIframe = '<iframe src="https://player.vimeo.com/video/'+ videoID +'?loop=1&autoplay=1&color=c9ff23&title=0&byline=0&portrait=0" style="width:'+size.width+'px;height:'+size.height+'px;" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe><script src="https://player.vimeo.com/api/player.js"></script>';
  var iframe = createElement('div',undefined, undefined, vimeoIframe);
  return iframe;
}


//Vimeo embed
function createVideo(size, url){


  var video = document.createElement('video');

  video.src = url;
  video.autoplay = true;
  video.loop = true;
  video.style.width = size.width;
  video.style.display = 'block';
  // video.width = '100%';
  // video.height = size.height;
  return video;
}




/////////////////////////////////////////////////////////////////////////

//Load Scripts with callback
function ScriptLoader() { };
ScriptLoader.prototype = {
    require: function (scripts, root, callback) {
        if (scripts.length === 0) {
          callback();
          return
        }
        this.loadCount      = 0;
        this.totalRequired  = scripts.length;
        this.callback       = callback;

        var scriptRoot;
        var loadable;
        for (var i = 0; i < scripts.length; i++) {

          //if its a shared script
          if (scripts[i][0] === '%') {
            scripts[i] = scripts[i].substr(1);
            console.log(scripts[i]);
            scriptRoot = '';
            loadable = true;
            //Now check if this shared script was already loaded by another app
            //and prevent it from loading

            if (systemSharedDependencies.indexOf(scripts[i]) > -1) {
              loadable = false;
            }else {
              //If the shared script wasn't loaded before, let it load and save its status on systemSharedDependencies
              systemSharedDependencies.push(scripts[i]);
              console.log(systemSharedDependencies);
            }
          //If its a normal script
          }else {
            scriptRoot = root;
            loadable = true;
          }

          //Then load it(if it doesnt exist already)
          if (loadable) {
            this.writeScript(scriptRoot+scripts[i]);
          } else {
            console.log('Shared script already exists, using one already loaded');
            //Say loop to mark this as loaded
            this.loaded();
          }

        }
    },
    loaded: function (evt) {
        this.loadCount++;

        if (this.loadCount == this.totalRequired && typeof this.callback == 'function') this.callback.call();
    },
    writeScript: function (src) {
        var self = this;
        var s = document.createElement('script');
        s.type = "text/javascript";
        s.async = true;
        s.src = src;
        s.addEventListener('load', function (e) { self.loaded(e); }, false);
        var head = document.getElementsByTagName('head')[0];
        head.appendChild(s);
    }
}




/////////////////////////////////////////////////////////////////////////

//Load Scripts with callback
function ImageLoader() { }
ImageLoader.prototype = {
    require: function (images, root, callback) {
        if (images.length === 0) {
          callback();
          return
        }
        this.loadCount      = 0;
        this.totalRequired  = images.length;
        this.callback       = callback;

        for (var i = 0; i < images.length; i++) {
            this.writeImage(root+images[i]);
        }
    },
    loaded: function (evt) {
        this.loadCount++;
        if (this.loadCount == this.totalRequired && typeof this.callback == 'function') this.callback.call();
    },
    writeImage: function (src) {
        var self = this;
        var s = new Image();
        //s.async = true;
        s.src = src;
        s.addEventListener('load', function (e) { self.loaded(e); }, false);
        //var head = document.getElementsByTagName('head')[0];
        //head.appendChild(s);
    }
}







//TRYING TO HAVE A CALLBACK WHEN FONTS ARE LOADEEEDDDD!!!!!!!!!!!!!!!!!!!!!!!!!!
/////////////////////////////////////////////////////////////////////////






//Load Scripts with callback
function FontLoader() { }
FontLoader.prototype = {
  require: function (fonts, root, callback) {
    if (fonts.length === 0) {
      callback();
      return
    }
    WebFont.load({

      // google: {
      //   families: ['Droid Sans', 'Droid Serif', 'Oswald', 'Roboto'],
      // },
      custom: {
        families: fonts,
        urls: [root+'font/font.css']
      },

      classes:false,

      loading: function() {
        console.log("Loading");
      },
      active: callback,
      inactive: callback,
      fontloading: function(fontFamily, fontDescription) {
         console.log('fontloading: ' + fontFamily + ' (' + fontDescription + ')');
      },
      fontactive: function(fontFamily, fontDescription) {
         console.log('fontactive: ' + fontFamily + ' (' + fontDescription + ')');
      },
      fontinactive: function(fontFamily, fontDescription) {
         console.log('fontinactive: ' + fontFamily + ' (' + fontDescription + ')');
      }
    });
  }
}













/////////////////////////////////////////////////////////////////////////
//Make dynamic CSS
function CssComponent(name){
  var self = this;
  this.dom = document.createElement('style');
  self.dom.type = 'text/css';
  self.dom.innerHTML = '/*'+name+'*/';
  //self.dom.title = name;
  document.getElementsByTagName('head')[0].appendChild(self.dom);
}

CssComponent.prototype.set = function(type, styleName, style){
  var selector;
  switch (type) {
    case 'id':
      selector = '#';
      break;
    case 'class':
      selector = '.';
      break;
    case 'font':
      selector = '@';
      break;
    case 'keyframe':
      selector = '@';
      break;
    case 'free':
      selector = '';
      break;
    default:
      selector = ''

  }
  //if (type === 'id' ? selector = '#' : selector = '.');
  var styleString = JSON.stringify(style);
  styleString = styleString.replace(/"/g, '');
  styleString = styleString.replace(/,/g, ';');
  //console.log(styleString);
  //add style by breaking the line
  this.dom.innerHTML +=  '\n' + selector + styleName + styleString;
}


/////////////////////////////////////////////////////////////////////////

//Check path for debugging
function testDirForDebug(root, callback){
  var bait = new Image();
  bait.onerror = callback;
  //bait.onload = good;
  bait.src = root+'b.gif';

}



/////////////////////////////////////////////////////////////////////////

//Check path for debugging
function clampValue(value, knee, shoulder){
  var clampedValue = Math.min(value, shoulder);
  clampedValue = Math.max(clampedValue, knee);
  return clampedValue;
}

/////////////////////////////////////////////////////////////////////////

//Get progess of a number between two extremis
function getProgress(value, knee, shoulder){
  var length = shoulder-knee;
  absoluteValue = value-knee;
  var prercentage = (absoluteValue/length)*100;
  return prercentage;
}

/////////////////////////////////////////////////////////////////////////

//convert progress to value
function progressToValue(progressValue, newBottom, newTop){
  var segment = newTop-newBottom;
  var progress = ((progressValue/100)*segment)+newBottom;
  return progress;
}
