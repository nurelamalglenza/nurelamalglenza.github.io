var virtualVandalExe = {}
virtualVandalExe.uniqueAppID = 'virtualVandal';


if (typeof installedApps !== 'undefined') {

  installedApps[virtualVandalExe.uniqueAppID].OsMenu = {
    [installedApps[virtualVandalExe.uniqueAppID].name] : [['Quit','quitApp']],
    'File': [['Export Masterpiece','exportImage'],'-',['Share on fb','shareFB'], ['share on twitter','shareTwitter']],
    'Color': [['Use Magenta','setColor'],['Use Aqua','setColor'],['Use Blue','setColor'],['Use Yellow','setColor'],'-',['Clean Statue','cleanCurrentStatue']], //fill in later
    'View': [['Next Heritage >','nextHeritage'], '-',['Minimize','minimizeApp'], ['Zoom','zoomApp'], '-', ['Enter Full Screen','enterFullScreen']],
    'Help': [['Report a bug...','reportBug']]
  };


  //////////////////////////////
  ////MENU ACTIONS///////
  //////////////////////////////
  virtualVandalExe.menuActions = {};

  virtualVandalExe.menuActions.quitApp = appMenuExe.menuActions.quitApp;


    virtualVandalExe.menuActions.exportImage = function(){

      virtualVandalExe.downloadRender()

    }

  virtualVandalExe.menuActions.shareFB = appMenuExe.menuActions.shareFB;

  virtualVandalExe.menuActions.shareTwitter = appMenuExe.menuActions.shareTwitter;



  virtualVandalExe.menuActions.setColor = function(menuName){

    var color = menuName.split('Use ')[1].toLowerCase();
    console.log("SETTING "+color);

    setBrushColorGlobal(color);
    virtualVandalExe.animate();

  }

  virtualVandalExe.menuActions.cleanCurrentStatue = function(menuName){
    //
    console.log("CLEARING TEXTURES");
      virtualVandalExe.models[a.currentStatue].clearTextures();
      virtualVandalExe.animate();

  }



  virtualVandalExe.menuActions.nextHeritage = function(){

    virtualVandalExe.changeStatue();

  }

  virtualVandalExe.menuActions.minimizeApp = appMenuExe.menuActions.minimizeApp;

  virtualVandalExe.menuActions.zoomApp = appMenuExe.menuActions.zoomApp;

  virtualVandalExe.menuActions.enterFullScreen = appMenuExe.menuActions.enterFullScreen;

  virtualVandalExe.menuActions.reportBug = appMenuExe.menuActions.reportBug;


  virtualVandalExe.menuActions.closingApp = function(){
    console.log("Closing App");
  }

  //////////////////////////////
  //////////////////////////////


}



virtualVandalExe.css = new CssComponent(virtualVandalExe.uniqueAppID);



virtualVandalExe.css.set('id', virtualVandalExe.uniqueAppID+'-canvas',{
  'background-color' : 'var(--blue)'
});



virtualVandalExe.css.set('class', 'vandalViewportWrapper',{
  'background-color': 'var(--blue)',
  'display': 'flex',
  'align-items':'center',
  'height': '468px'
});


virtualVandalExe.css.set('class', 'vandalToolbar',{
  'background-color': 'var(--black)',
  'position': 'absolute',
  'display': 'flex',
  'width':'85px',
  'height': '330px',
  'justify-content': 'center',
  'flex-wrap': 'wrap',
  'align-content': 'space-evenly',
  'z-index':'1'
});

virtualVandalExe.css.set('class', 'vandalColorTool',{
  'width':'57px',
  'height': '57px',
  'display': 'flex',
  'justify-content': 'center',
  'align-items': 'center',
    'z-index':'1',
    'position':'relative'
});

virtualVandalExe.css.set('id', 'vandalStatueName',{
  'position':'absolute',
  'bottom':'40px',
  'right':'40px',
  'color':'white',
  'text-align':'right',
  'font-size':'10px',
  'text-transform': 'uppercase',
    'letter-spacing': '3px',
    'z-index':'1'
});


virtualVandalExe.css.set('class', 'selectedSprayCan',{
  // 'background-color': 'red',
  // 'color':'black'
});



virtualVandalExe.css.set('class', 'canIcon',{
  'pointer-events': 'none'
});


virtualVandalExe.css.set('class', 'vandalViewportWrapper .patternedShadow-Large::after',{
  'left': '0%'
});







virtualVandalExe.root = 'apps/VirtualVandal/';


virtualVandalExe.start = function (applicant) {
  if (applicant !== 'OS') {
    virtualVandalExe.root = '';
  }
  virtualVandalExe.makeView();
  virtualVandalExe.createScene();
}


//Make VIEW
virtualVandalExe.makeView = function() {
  var a = virtualVandalExe;

  a.palette = {
    'magenta':'255,0,237',
    'aqua':'0,255,197',
    'blue':'0,4,255',
    'yellow':'255,242,0'
  }

  a.db = [
    {
      "name":'The nur',
      "reference":'nur',
      'model':'nur.json',
      'normal':true
    },
    {
      "name":'The nur, again',
      "reference":'nur',
      'model':'nur.json',
      'normal':true
    },
    {
      "name":'The nur, yet again',
      "reference":'nur',
      'model':'nur.json',
      'normal':true
    },
  ];


  a.currentColor = 'magenta';
  a.currentStatue = 0;
  a.statueDistance = 4;

  a.dom = {};

  a.dom.windowContainer = document.getElementById(virtualVandalExe.uniqueAppID+'-canvas');

  components.tooltipHelper(a.root+'img/tooltip.gif', 'Drag outside to move around', 10000, 10000, ['555px','180px'], a.dom.windowContainer);

  /////////////////////////////////////////////////////////////////
  //Make App header
  a.dom.appHeader = createElement('div','appHeader dark-illegalBlue', undefined, undefined);
  a.dom.windowContainer.appendChild(a.dom.appHeader);

    a.dom.nextStatueButton = createElement('a','appHeaderButton blackButton', 'vandalUpload', 'Next Heritage');
    a.dom.appHeader.appendChild(a.dom.nextStatueButton);


    a.dom.statueDownloadButton = createElement('a','appHeaderButton yellowButton', 'vandalDownload', 'Download this piece');
    a.dom.appHeader.appendChild(a.dom.statueDownloadButton);


  /////////////////////////////////////////////////////////////////
  //Make Viewport Wrapper
  a.dom.vandalViewportWrapper = createElement('div','vandalViewportWrapper', undefined, undefined);
  a.dom.windowContainer.appendChild(a.dom.vandalViewportWrapper);


  /////////////////////////////////////////////////////////////////
  //Make Toobar
  a.dom.vandalToolbar = createElement('div','vandalToolbar patternedShadow-Large', undefined, undefined);
  a.dom.vandalViewportWrapper.appendChild(a.dom.vandalToolbar);

      a.dom.colorTools = {};
      for(property in a.palette){
        //Make spray can color tool
        var colorClass = 'vandalColorTool';
        var first = false;
        if (property === a.currentColor) {
          colorClass = 'vandalColorTool selectedSprayCan';
          first = true;
        }

        a.dom.colorTools[property] = createElement('div', colorClass, property+'Tool', undefined);
        var icon = createElement('object', 'canIcon', undefined, undefined);
        icon.setAttribute("type","image/svg+xml");
        icon.setAttribute("data", a.root+"img/canIcon-"+ property +".svg");
        a.dom.colorTools[property].appendChild(icon);
        a.dom.vandalToolbar.appendChild(a.dom.colorTools[property]);

        if (first) {
          var firstColor = property;
          //Wait for svg to be loaded before updating his stroke
          setTimeout(function(){
            updateIconColor(firstColor,"#FFFFFF");
          },100);
        }

        a.dom.colorTools[property].onclick = setBrushColor(property);
      }

      function setBrushColor(color){

        return function(){
          setBrushColorGlobal(color);
        }

      }

      function setBrushColorGlobal(color){
        //console.log(event);
        //event.stopPropagation();
        var a = virtualVandalExe;
        console.log("PRESSED "+ color);

        console.log(a.dom.colorTools);
        //Clean selection
        a.dom.colorTools[a.currentColor].classList.remove('selectedSprayCan');
        updateIconColor(a.currentColor,"#0004FF");

        //Update selection
        a.dom.colorTools[color].classList.add('selectedSprayCan');
        updateIconColor(color,"#FFFFFF");

        ///Update Can texture
        a.canAssets.material.map = virtualVandalExe.canAssets.images["albedo_"+color];
        a.canAssets.material.needsUpdate = true;

        //Update brush color
        a.brush.color = a.palette[color];

        a.currentColor = color;
      }



      function updateIconColor(icon, color){
        var a = virtualVandalExe;
        var svgElement = a.dom.colorTools[icon].childNodes[0].getSVGDocument();
        svgElement.getElementById("Body").setAttribute("stroke", color);
        svgElement.getElementById("Top").setAttribute("stroke", color);
      }

  a.dom.statueName = createElement('a',undefined, 'vandalStatueName', 'Loading...');
  a.dom.vandalViewportWrapper.appendChild(a.dom.statueName);




}


//CREATE 3D SCENE
virtualVandalExe.createScene = function() {

  var a = virtualVandalExe;

  a.scene = new THREE.Scene();
  a.scene.background = new THREE.Color( '#0004FF' );

  a.renderer = new THREE.WebGLRenderer({
                      antialias:true,
                      preserveDrawingBuffer: true
                    });
  a.renderer.toneMapping = THREE.ReinhardToneMapping;
  a.renderer.toneMappingExposure = 5;
  console.log(a.dom.vandalViewportWrapper.offsetWidth);
  a.renderer.setSize( a.dom.vandalViewportWrapper.offsetWidth, a.dom.vandalViewportWrapper.offsetHeight );
  //Append threejs automatically generated canvas
  a.dom.vandalViewportWrapper.appendChild( a.renderer.domElement );
  a.renderer.domElement.style.cursor = "none";
  a.renderer.domElement.style.position = "relative";
  a.renderer.domElement.style.zIndex = "0";

  a.wolrdCenterLocator = new THREE.Object3D();
  a.scene.add( a.wolrdCenterLocator );


  a.mouse = new THREE.Vector2();
  a.mouseCoordinates = {
    absolute:{
      x:0,
      y:0
    },
    local:{
      x:0,
      y:0
    }
  };
  a.mouseDelta = {
    x:0,
    y:0
  };
  a.raycaster = new THREE.Raycaster();
  a.brush = new a.Brush();


  a.canvasDiffuseTexture;
  a.canvasRoughnessTexture;
  a.diffuseTextureContext;
  a.roughnessTextureContext;

  a.textures = {
    diffuse:[],
    roughness:[]
  };

  a.loadCameras();

}




//LOAD CAMERAS
virtualVandalExe.loadCameras = function() {

  var a = virtualVandalExe;

  a.camera = new THREE.PerspectiveCamera( 10, a.dom.vandalViewportWrapper.offsetWidth / a.dom.vandalViewportWrapper.offsetHeight, 0.1, 1000 );
  a.camera.position.z = 13;
  a.camera.position.y = 0.2;


  a.loadLighting();
  a.addCursor();
  a.addBackground();

}

virtualVandalExe.addCursor = function(){

  //Locator
  virtualVandalExe.cursor = new THREE.Object3D();
  virtualVandalExe.scene.add( virtualVandalExe.cursor );
  virtualVandalExe.cursor.position.x=1.5;
  virtualVandalExe.cursor.position.y=0.5;


  ///LOAD TEXTURE
  virtualVandalExe.canAssets = {
    size:512,
    channels:['albedo','roughness','metalness','bump','lightMap'],
    images:{},
    maps:{}
  };
  var textureLoader = new THREE.TextureLoader();
  for (var i = 0; i <   virtualVandalExe.canAssets.channels.length; i++) {
    var channel =   virtualVandalExe.canAssets.channels[i];
    var extraInfo = "";
    if (channel === 'albedo') {
      //Update to first color
      extraInfo = '_'+virtualVandalExe.currentColor;
    }
      virtualVandalExe.canAssets.images[channel+extraInfo] = textureLoader.load( virtualVandalExe.root+"img/SprayCanTexture_"+ channel + extraInfo +   virtualVandalExe.canAssets.size+".jpg",function(texture){
      //Tell ThreeJS to updated the texture
        //virtualVandalExe.canAssets.images[channel+extraInfo].needsUpdate = true;
    } );
  }


  virtualVandalExe.canAssets.material = new THREE.MeshStandardMaterial(
    {
      map:virtualVandalExe.canAssets.images.albedo_magenta,
      roughnessMap:virtualVandalExe.canAssets.images.roughness,
      bumpMap:virtualVandalExe.canAssets.images.bump,
      bumpScale: 0.03,
      metalness: 1,
      metalnessMap:  virtualVandalExe.canAssets.images.metalness,
      envMap:virtualVandalExe.lights.reflectionMap,
      envMapIntensity:1,
      lightMap:virtualVandalExe.canAssets.images.lightMap,
      lightMapIntensity:1


    } );

  virtualVandalExe.canAssets.material.needsUpdate = true;



  //ONCE MODEL AND TEXTURE READY, LOAD OTHER COLORS
  for (key in virtualVandalExe.palette) {
    var color = key;
      virtualVandalExe.canAssets.images["albedo_"+color] = textureLoader.load( virtualVandalExe.root+"img/SprayCanTexture_albedo_" + color +   virtualVandalExe.canAssets.size+".jpg",function(texture){
      //Tell ThreeJS to updated the texture
        //virtualVandalExe.canAssets.images["albedo_"+color].needsUpdate = true;
    } );
  }


  //LOAD MODELS

  //CAN
  // instantiate a loader
  var loader = new THREE.JSONLoader();

  // load can
  loader.load(virtualVandalExe.root+'models/can.json',
  	// onLoad callback
  	function ( geometry ) {
      var geo = geometry;
      geo.scale(0.3,0.3,0.3);
  		var can = new THREE.Mesh( geo , virtualVandalExe.canAssets.material );
  		virtualVandalExe.cursor.add( can );
  	}
  );

  // load lid
  loader.load(virtualVandalExe.root+'models/canLid.json',
    // onLoad callback
    function ( geometry ) {
      var geo = geometry;
      geo.scale(0.3,0.3,0.3);
      var canLid = new THREE.Mesh( geo , virtualVandalExe.canAssets.material );
      virtualVandalExe.cursor.add( canLid );
    }
  );
}



//Create Background
virtualVandalExe.addBackground = function() {
  var a = virtualVandalExe;
  var textureLoader = new THREE.TextureLoader();

  //Make dotted circle


  //Make gradient circle
  gradientTexture = textureLoader.load( virtualVandalExe.root+"img/gradient.jpg");
  dottedTexture = textureLoader.load( virtualVandalExe.root+"img/dotted.jpg");


//Make Large circle
  var largeCircle = new THREE.CircleGeometry( 4, 64 );
  largeCircle.translate(3,0,-2);
  var gradientMaterial = new THREE.MeshBasicMaterial(
    { color: '#FF00ED', alphaMap:gradientTexture, transparent : true
  } );
  virtualVandalExe.gradientBG = new THREE.Mesh( largeCircle, gradientMaterial );
  virtualVandalExe.scene.add( virtualVandalExe.gradientBG );

//Make small circle
  var smallCircle = new THREE.CircleGeometry( 1, 64 );
  smallCircle.translate(1,0,-1.8);
  var dottedMaterial = new THREE.MeshBasicMaterial(
    { color: '#000000', alphaMap:dottedTexture, transparent : true
  } );
  virtualVandalExe.dottedBG = new THREE.Mesh( smallCircle, dottedMaterial );
  virtualVandalExe.scene.add( virtualVandalExe.dottedBG );
}



//LOAD LIGHTING
virtualVandalExe.loadLighting = function() {
  var a = virtualVandalExe;
  a.lights = {};

  //keyLight
  a.lights.key = new THREE.PointLight( 0xffffff, 1, 100 );
  a.lights.key.position.set( -20, 50, 50 );
  a.lights.key.castShadow = true;
  a.scene.add( a.lights.key );
  // // //
  // //
  //Rim light
  a.lights.rim = new THREE.PointLight( 0xffffff, 1, 100 );
  a.lights.rim.position.set( 50, -20, -50 );
  a.scene.add( a.lights.rim );
  // //
  // //Extra rim light for specularity
  // a.rimLightSpec = new THREE.PointLight( 0xffffff, 1, 100 );
  // a.rimLightSpec.position.set( -20, -20, -50 );
  // a.scene.add( a.rimLightSpec );
  //
  // //Directional Light
  // a.lights.directional = new THREE.DirectionalLight( 0xaabbff, 0.3 );
  // a.lights.directional.position.set( 300, 250, -500 );
  // a.lights.directional.castShadow = true;
  // a.scene.add( a.lights.directional );

  //
  // //Set up shadow properties for the light
  // a.lights.directional.shadow.mapSize.width = 512;  // default
  // a.lights.directional.shadow.mapSize.height = 512; // default
  // a.lights.directional.shadow.camera.near = 0.5;    // default
  // a.lights.directional.shadow.camera.far = 500;     // default

  //Ambient Light
  // a.lights.ambient = new THREE.AmbientLight( 0xffffff, 0.7 ); // soft white light
  // a.scene.add( a.lights.ambient );


  var textureLoader = new THREE.TextureLoader();
  a.lights.reflectionMap = textureLoader.load( a.root+"img/reflectionMap.png" );
  a.lights.reflectionMap.mapping = THREE.SphericalReflectionMapping;

  a.lights.lightMap = textureLoader.load( a.root+"img/lightMap.png" );


  //
  // a.loadModel(0, function(){
  //   virtualVandalExe.loadTextures();
  // });
  a.models = [];

  a.models[a.currentStatue] = new Statue(0, true, function(){
    //Callback after first model is rendered

    //Initiate all
    a.init();


    //Load all remaining objects
    loadModelsInBackground(1);

    //Load all other objects in background
    //Self call until all indexes are created
    function loadModelsInBackground(i){
      if (i < a.db.length) {
        a.models[i] = new Statue(i, true, function(){
          loadModelsInBackground(i+1)
        });
      }
    }


  });

}



//INIT  //OPTIMISE TO UPDATE ONLY ON INTERACTION!!!!!!!!!!!!!!!
virtualVandalExe.init = function() {
  console.log("INIT THE GOODNESS");
  virtualVandalExe.updateStatueName();
  virtualVandalExe.addListeners();
  virtualVandalExe.animate();
  //virtualVandalExe.render();
}




//RENDER
virtualVandalExe.render = function() {

  var a = virtualVandalExe;

  a.models[a.currentStatue].geometry.material.map.needsUpdate = true;
  a.models[a.currentStatue].geometry.material.roughnessMap.needsUpdate = true;
  //Update the ray with the camera and mouse position
	a.raycaster.setFromCamera( a.brush.position.current, a.camera );

  a.renderer.render( a.scene, a.camera );
}




//ANIMATION LOOP
virtualVandalExe.animate = function() {

  //requestAnimationFrame( virtualVandalExe.animate );
  virtualVandalExe.render();


}



//MOUSE STATES


//Mouse Move
virtualVandalExe.onMouseMove = function(event) {
  var a = virtualVandalExe;
  a.animate();
  //Get ray hit coordinates
  a.brush.touchedObject = a.raycaster.intersectObject( a.models[a.currentStatue].geometry  );

  //Get absolute coordinates
  a.mouseCoordinates.absolute.x = event.clientX;
  a.mouseCoordinates.absolute.y = event.clientY;





  //Get shift of window
  var shift = a.getDomElementPosition(a.dom.vandalViewportWrapper);
  //Calculate local coordinates
  a.mouseCoordinates.local.x = event.clientX-shift.x;
  a.mouseCoordinates.local.y = event.clientY-shift.y;



  // Convert Mouse Screen Coordinates to Cartesian Coordinates
  a.brush.position.current.x = ( a.mouseCoordinates.local.x / (a.dom.vandalViewportWrapper.offsetWidth) ) * 2 - 1;
  a.brush.position.current.y = -( a.mouseCoordinates.local.y / (a.dom.vandalViewportWrapper.offsetHeight) ) * 2 + 1;


  //Set cursor to mouse position
  a.brush.updateUtils();


  if (a.brush.touchedObject[0] !== undefined) {
    //console.log("START ANIM TO OBJ");
        a.brush.animatePosition(1, -0.45);

  }else {
    //console.log("START ANIM TO OBJ");
      //
      a.brush.animatePosition(4.5, 0);
  }

  //Apply position of mouse to cursor if not touching anything
  a.cursor.position.copy(a.brush.utils.position);
  a.cursor.lookAt(a.wolrdCenterLocator.position);
  a.cursor.rotation.z += a.brush.rotation;

  //a.cursor.position.z = 1;
  //Apply position of object if touching surface




  //Get delta
  a.brush.position.delta.x = a.brush.position.current.x-a.brush.position.previous.x;
  a.brush.position.delta.y = a.brush.position.current.y-a.brush.position.previous.y;


  //Slight movement on mouse move, maybe needs to be moved somewhere else
  a.models[a.currentStatue].locator.rotation.x += -a.brush.position.delta.y/30;
  a.models[a.currentStatue].locator.rotation.y += a.brush.position.delta.x/30;

  //Slight movement on mouse move, maybe needs to be moved somewhere else
  virtualVandalExe.gradientBG.rotation.x += -a.brush.position.delta.y/10;
  virtualVandalExe.gradientBG.rotation.y += a.brush.position.delta.x/10;

  //Slight movement on mouse move, maybe needs to be moved somewhere else
  virtualVandalExe.dottedBG.rotation.x += -a.brush.position.delta.y/5;
  virtualVandalExe.dottedBG.rotation.y += a.brush.position.delta.x/5;


  //Mouse behaviour
  if (a.brush.isPressed) {
    if (a.brush.pressedAction === 'paint') {
      if (a.brush.touchedObject[0] !== undefined) {
        a.brush.paint();

      }
    }else {
      a.brush.moveCamera();
    }
  }




  //Save previous brush position for next frame
  a.brush.position.previous.x = a.brush.position.current.x;
  a.brush.position.previous.y = a.brush.position.current.y;

}



//Mouse Down
virtualVandalExe.onMouseDown = function() {
  var a = virtualVandalExe;

  a.brush.isPressed = true;
  console.log(a.brush.isPressed);




  if (a.brush.touchedObject[0] !== undefined) {

    a.brush.pressedAction = 'paint';

    //paint
    a.brush.paint();
    virtualVandalExe.cursor.children[0].position.y = -0.025;
    virtualVandalExe.animate();


  }else {

    a.brush.pressedAction = 'move';
    //move camera

    a.brush.moveCamera();

  }


}




//Mouse Up
virtualVandalExe.onMouseUp = function() {
  var a = virtualVandalExe;

  a.brush.isPressed = false;
  console.log(a.brush.isPressed);
  virtualVandalExe.cursor.children[0].position.y = 0;
  virtualVandalExe.animate();


///FIX WHEN TO KICK MOMENTUM IN
  if (a.models[a.currentStatue].locator.rotation.x > a.brush.cameraSettings.x.bottom) {
    a.brush.resetOvershoot('down');
  }

  if (a.models[a.currentStatue].locator.rotation.x < a.brush.cameraSettings.x.top) {
    a.brush.resetOvershoot('up');
  }else if(a.brush.pressedAction !== 'paint') {
    a.brush.momentum();
  }


}

virtualVandalExe.resetStatuses = function(){
  virtualVandalExe.brush.isPressed = false;
  ///FIX WHEN TO KICK MOMENTUM IN
    if (virtualVandalExe.models[virtualVandalExe.currentStatue].locator.rotation.x > virtualVandalExe.brush.cameraSettings.x.bottom) {
      virtualVandalExe.brush.resetOvershoot('down');
    }

    if (virtualVandalExe.models[virtualVandalExe.currentStatue].locator.rotation.x < virtualVandalExe.brush.cameraSettings.x.top) {
      virtualVandalExe.brush.resetOvershoot('up');
    }
  console.log("LEFT AREAAAA");
}


virtualVandalExe.updateStatueName = function(){
  var statueName = virtualVandalExe.db[virtualVandalExe.currentStatue].name;
  virtualVandalExe.dom.statueName.innerHTML = statueName;
}


virtualVandalExe.changeStatue = function(){

  var a = virtualVandalExe;

  //Hide the current model

  var previousModelIndex = a.currentStatue;

  a.currentStatue++;
  //If max is reached, reset to 0;
  if (a.currentStatue === a.db.length) {
    a.currentStatue = 0;
  }

  a.updateStatueName();



  //Show the new selected model
  a.models[a.currentStatue].geometry.visible = true;
  console.log("Changing Statue");

  animateModelChange(a.currentStatue);


  function animateModelChange(i){
    console.log("ANIMATE MODEL CHANGE");
    TweenLite.to(a.models[previousModelIndex].locator.position, 0.5, {x:-a.statueDistance, ease:Expo.easeOut, onComplete:function(){
      a.models[previousModelIndex].locator.position.x = a.statueDistance;
      a.models[previousModelIndex].geometry.visible = false;
    }});
    TweenLite.to(a.models[i].locator.position,  0.5, {x:0, ease:Expo.easeOut, onUpdate:function(){
      a.animate();
    }});
  }


}




////IMPLEMENTING DOWNLOAD
virtualVandalExe.downloadRender = function() {
  // memeExe.renderMeme();
  var fileName = "My Masterpiece! Made on nurdot com";
  //
  virtualVandalExe.renderer.domElement.toBlob(function(blob) {
    saveAs(blob, fileName);
  });
  // memeExe.updateMeme();

  console.log("DONWLOADING IMAGE");

}








//ADD LISTENERS
virtualVandalExe.addListeners = function() {
  virtualVandalExe.dom.vandalViewportWrapper.addEventListener( 'mousemove', virtualVandalExe.onMouseMove, false );
  virtualVandalExe.dom.vandalViewportWrapper.addEventListener( 'mousedown', virtualVandalExe.onMouseDown, false );
  virtualVandalExe.dom.vandalViewportWrapper.addEventListener( 'mouseup', virtualVandalExe.onMouseUp, false );
  virtualVandalExe.dom.vandalViewportWrapper.addEventListener( 'mouseleave', virtualVandalExe.resetStatuses, false );

  virtualVandalExe.dom.nextStatueButton.addEventListener( 'click', virtualVandalExe.changeStatue, false );
  virtualVandalExe.dom.statueDownloadButton.addEventListener('click', virtualVandalExe.downloadRender);



}











///STATUE

function Statue(i, visibility, callback){
  var a = virtualVandalExe;

  var self = this;

  this.id = i;
  this.name = a.db[i].name;
  this.model = a.root+"models/"+a.db[i].model;
  this.resolution = 2048;
  this.hasNormal = a.db[i].normal;
  this.reference = a.db[i].reference;

  // var geoLoader = new THREE.ObjectLoader();
  // geoLoader.load(self.model, function( geometry ){
  //   //The geometry is passed as parameter once .js is loaded
  //   self.geometry = new THREE.Mesh(geometry);
  //   self.geometry.visible = visibility;
  //   self.geometry.castShadow = true;
  //   self.geometry.receiveShadow = true;
  //   self.loadTextures(self, i, callback);
  // });

  var geoLoader = new THREE.JSONLoader(true);
  geoLoader.load(self.model, function(geometry){
        //The geometry is passed as parameter once .js is loaded
        self.geometry = new THREE.Mesh(geometry);
        self.geometry.visible = visibility;
        self.geometry.castShadow = true;
        self.geometry.receiveShadow = true;
        self.loadTextures(self, i, callback);
      } );

  this.textures = {
    diffuse:{},
    roughness:{},
  };


}

Statue.prototype.loadTextures = function(self, i, callback){

  var a = virtualVandalExe;


      //Load Lightmap and Normalmap (if exists)
      var textureLoader = new THREE.TextureLoader();
      if (self.hasNormal) {
        self.textures.normal = textureLoader.load( virtualVandalExe.root+"img/"+self.reference+"_normal.jpg");
      }
      self.textures.lightMap = textureLoader.load( virtualVandalExe.root+"img/"+self.reference+"_lightMap.jpg",function(texture){
        console.log('LIGHTMAP READY');
        virtualVandalExe.animate();
      });


      //////////////////////




      //Generate diffuse and roughness maps to be used for painting
      self.textures.diffuse.canvas = document.createElement('canvas');
      self.textures.roughness.canvas = document.createElement('canvas');

      function setTextureSize(texture, size){
        texture.width = size;
        texture.height = size;
      }

      setTextureSize(self.textures.diffuse.canvas, self.resolution);
      setTextureSize(self.textures.roughness.canvas, self.resolution);

      /////////
      //get canvas context
      self.textures.diffuse.ctx = self.textures.diffuse.canvas.getContext('2d');
      self.textures.roughness.ctx = self.textures.roughness.canvas.getContext('2d');

      //PAINT TEXTURE
      self.textures.diffuse.ctx.fillStyle = "white";
      self.textures.diffuse.ctx.fillRect(0, 0, self.resolution, self.resolution);

      self.textures.roughness.ctx.fillStyle = "white";
      self.textures.roughness.ctx.fillRect(0, 0, self.resolution, self.resolution);

      /////////

      self.textures.diffuse.THREE = new THREE.Texture(self.textures.diffuse.canvas);
      self.textures.roughness.THREE = new THREE.Texture(self.textures.roughness.canvas);

      //Tell ThreeJS to updated the texture
      self.textures.diffuse.THREE.needsUpdate = true;
      self.textures.roughness.THREE.needsUpdate = true;

      //Create Material
      self.material = new THREE.MeshStandardMaterial(
        {
          map:self.textures.diffuse.THREE,
          //map:self.textures.roughness.THREE,
          roughnessMap: self.textures.roughness.THREE,
          bumpMap: self.textures.roughness.THREE,
          bumpScale: -0.03,
          //envMap:a.lights.reflectionMap,
          //envMapIntensity:1,
          lightMap:self.textures.lightMap,
          lightMapIntensity:1,
          normalMap:self.textures.normal,
          //aoMap:self.textures.lightMap,
          metalness: 0
        } );

      self.material.needsUpdate = true;


      //Apply material to geometry
      self.geometry.material = self.material;

      //Create a locator
      self.locator = new THREE.Object3D();
      a.scene.add( self.locator );
      //Parent the statue to the locator
      self.locator.add( self.geometry );

      if (self.id > 0) {
        self.locator.position.x = a.statueDistance;
      }



      //callback
      callback();

}


Statue.prototype.clearTextures = function(self, i, callback){
  //PAINT TEXTURE
  this.textures.diffuse.ctx.fillStyle = "white";
  this.textures.diffuse.ctx.fillRect(0, 0, this.resolution, this.resolution);

  this.textures.roughness.ctx.fillStyle = "white";
  this.textures.roughness.ctx.fillRect(0, 0, this.resolution, this.resolution);
}


















//BRUSH CONSTRUCTOR
virtualVandalExe.Brush = function(){
  var self = this;
  this.touchedObject = [];
  this.isPressed = false;
  this.isAnimating = false;
  this.opacity = 10;
  this.hardness = 80;
  this.radius = 35;
  this.color = virtualVandalExe.palette['magenta'];
  this.roughness = '30,30,30';

  this.rotation = 0;
  this.distance = 1.5;

  this.rotationTarget = 0;
  this.distanceTarget = 1.5;

  this.utils = {
    vector:new THREE.Vector3(0,0,0),
    dir:new THREE.Vector3(0,0,0),
    distance:new THREE.Vector3(0,0,0),
    position:new THREE.Vector3(0,0,0)
  }

  this.updateUtils = function(){
    self.utils.vector = new THREE.Vector3(self.position.current.x, self.position.current.y, 0.5);
    self.utils.vector.unproject( virtualVandalExe.camera );
    self.utils.dir = self.utils.vector.sub( virtualVandalExe.camera.position ).normalize();
    self.utils.distance = - virtualVandalExe.camera.position.z / self.utils.dir.z-virtualVandalExe.brush.distance;
    self.utils.position = virtualVandalExe.camera.position.clone().add( self.utils.dir.multiplyScalar( self.utils.distance ) );
  }

  // this.moveCloser = function(){
  //   extraRotation = -0.349066; //20 degrees
  //   extraDistance = 1;
  // }


  this.paint = function(){

    //Save Frame UV
    self.uv.current.x = self.touchedObject[0].uv.x;
    self.uv.current.y = self.touchedObject[0].uv.y;

    self.brushTip();

    //Save Frame UV
    self.uv.previous.x = self.touchedObject[0].uv.x;
    self.uv.previous.y = self.touchedObject[0].uv.y;

    console.log("Painting");
  };

  this.cameraSettings = {
    x:{
      top:-0.5,
      bottom:0.5
    }
  }
  this.moveCamera = function(){
    var deltaYDirection;
    //console.log(virtualVandalExe.brush.position.delta.y);
    if (virtualVandalExe.brush.position.delta.y > 0) {
      deltaYDirection = 'up';
    }else {
      deltaYDirection = 'down';
    }

    console.log(deltaYDirection);

    var rotationForce = {
      up:1,
      down:1
    }
    console.log(virtualVandalExe.models[virtualVandalExe.currentStatue].locator.rotation.x);
    if(virtualVandalExe.models[virtualVandalExe.currentStatue].locator.rotation.x < virtualVandalExe.brush.cameraSettings.x.top && deltaYDirection === 'up'){
      console.log("SLOW DOWN!!!");
      rotationForce.down = 10;
    }

    if(virtualVandalExe.models[virtualVandalExe.currentStatue].locator.rotation.x > virtualVandalExe.brush.cameraSettings.x.bottom && deltaYDirection === 'down'){

      rotationForce.down = 10;
    }

    var rotationY = virtualVandalExe.models[virtualVandalExe.currentStatue].locator.rotation.y + (virtualVandalExe.brush.position.delta.x*2);
    var rotationX = virtualVandalExe.models[virtualVandalExe.currentStatue].locator.rotation.x + (-virtualVandalExe.brush.position.delta.y*2)/rotationForce.down;

    virtualVandalExe.models[virtualVandalExe.currentStatue].locator.rotation.x = rotationX;
    virtualVandalExe.models[virtualVandalExe.currentStatue].locator.rotation.y = rotationY;

  }

  this.resetOvershoot = function(direction){

      var targetRotation = virtualVandalExe.brush.cameraSettings.x.top;
      if (direction === 'down') {
        targetRotation = virtualVandalExe.brush.cameraSettings.x.bottom;
      }

      console.log(targetRotation);

      TweenLite.to(virtualVandalExe.models[virtualVandalExe.currentStatue].locator.rotation, 0.4, {x:targetRotation, ease:Power3.easeOut, onUpdate:virtualVandalExe.animate});

  }

  this.animatePosition = function(pos,rot){
    if (self.distanceTarget === pos) return;
      // console.log("IS THE SAME DONT DO NOTHING");

      self.distanceTarget = pos;
      self.rotationTarget = rot;
      console.log("START ANIM TO OBJ");
      self.isAnimating = true;
      TweenLite.to(self, .5, {rotation:rot, ease:Power3.easeOut});
      TweenLite.to(self, .5, {distance:pos, ease:Power3.easeOut,
          onUpdate:function(){

          self.updateUtils();
          virtualVandalExe.cursor.position.copy(self.utils.position);
          virtualVandalExe.cursor.lookAt(virtualVandalExe.wolrdCenterLocator.position);
          virtualVandalExe.cursor.rotation.z += self.rotation;
          virtualVandalExe.animate();
        },
          onComplete:function(){
          self.isAnimating = false;
          console.log("DONE");
        }
      });

  }

  this.momentum = function(){

    var momentumDelta = {
      x:virtualVandalExe.brush.position.delta.x,
      y:virtualVandalExe.brush.position.delta.y
    }
    TweenLite.to(momentumDelta, 0.4, {y:0, ease:Power3.easeOut});
    TweenLite.to(momentumDelta, 0.4, {x:0, ease:Power3.easeOut, onUpdate:function(){
      virtualVandalExe.animate();
      var rotationY = virtualVandalExe.models[virtualVandalExe.currentStatue].locator.rotation.y + (momentumDelta.x*2);
      var rotationX = virtualVandalExe.models[virtualVandalExe.currentStatue].locator.rotation.x + (-momentumDelta.y*2);

      virtualVandalExe.models[virtualVandalExe.currentStatue].locator.rotation.x = rotationX;
      virtualVandalExe.models[virtualVandalExe.currentStatue].locator.rotation.y = rotationY;
    }});

  }


  this.position = {
    "current":new THREE.Vector2(),
    "previous":new THREE.Vector2(),
    "delta":new THREE.Vector2()
  }
  this.uv = {
    "current":new THREE.Vector2(),
    "previous":new THREE.Vector2()
  }

}



/////MAKING GRADIENT BRUSH!!!!!
virtualVandalExe.Brush.prototype.brushTip = function() {
  var a = virtualVandalExe;

  var x = a.brush.uv.current.x*a.models[a.currentStatue].textures.diffuse.canvas.width;
  var y = (Math.abs(a.brush.uv.current.y-1))*a.models[a.currentStatue].textures.diffuse.canvas.height

  var hardness = a.brush.hardness / 100;
  var opacity = Math.max(hardness, .2);
  //var opacity = Math.max(a.brush.opacity/100);


  paintOnTextures(a.models[a.currentStatue].textures.diffuse.ctx, a.brush.color, opacity);
  paintOnTextures(a.models[a.currentStatue].textures.roughness.ctx, a.brush.roughness, .1);


  function paintOnTextures(ctx, color, opacity){
    ctx.beginPath();
    var brushSettings = ctx.createRadialGradient(x, y, 1, x, y, a.brush.radius);
    brushSettings.addColorStop(0, 'rgba('+ color +','+ opacity +')');
    brushSettings.addColorStop(hardness, 'rgba('+ color +','+ opacity +')');
    brushSettings.addColorStop(1, 'rgba('+ color +',0)');

    ctx.fillStyle = brushSettings;
    ctx.arc(x, y, a.brush.radius, 0, Math.PI*2, false);
    ctx.fill();
    ctx.closePath();
  }

  //NEED TO GET THE UV BOUNDARIES, DUPLICATE THE STROKE ON THE OTHER SIDE TO SOLVE
  //UV PAINTING ISSUES ON SEAMS

}




/////////////////////////////////////////////////////////////////
///Utils//////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////

virtualVandalExe.getDomElementPosition = function(element) {
    var boundingBox = element.getBoundingClientRect();
    return {x:boundingBox.left, y:boundingBox.top};
}
