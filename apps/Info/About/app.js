var aboutExe = {}
aboutExe.uniqueAppID = 'about';

aboutExe.root = 'apps/Info/About/';
// //TEST ONLY
// aboutExe.root = '';


//// MENU LIST
//Use the same as the finder

//Using external menus, unaccessible from debug, so wrap this special menus into a Check
//to determine if they come from eOS or Debug
if (typeof installedApps != 'undefined') {
installedApps[aboutExe.uniqueAppID].OsMenu = OSDefaultMenu;

///// MENU actions
//Use the same as the finder
aboutExe.menuActions = finderExe.menuActions;
//

}


aboutExe.css = new CssComponent(aboutExe.uniqueAppID);


aboutExe.css.set('id', aboutExe.uniqueAppID+'-canvas',{
  'display' : 'flex',
  'width': '100%',
'height': '100%',
'align-items': 'center',
'font-size': '12px',
'letter-spacing': '0.3px',
'line-height': '16px'
});



aboutExe.css.set('id', aboutExe.uniqueAppID+'-container',{
  'display': 'flex',

});


aboutExe.css.set('class', aboutExe.uniqueAppID+'-imageContainer',{
  'display': 'flex',
  'height': '325px',
  'width': '50%',
  'align-items': 'center',
  //'justify-content':'center',
  'box-sizing': 'border-box',
  'padding': '5%',
  'padding-bottom': '0'

});



aboutExe.css.set('class', aboutExe.uniqueAppID+'-imageBackground',{
  'display': 'flex',
  //'background':'var(--blue)',
  //'width': '56%',
  'height':'100%',
  'position':'relative',

});


aboutExe.css.set('class', aboutExe.uniqueAppID+'-imagePhoto',{
  'background-image':"url('"+aboutExe.root+"img/noor.jpg')",
  'width': '255px',
  'height':'267px',
  'position':'absolute',
  'background-repeat': 'no-repeat',
  'background-size': 'cover',
  'border-radius': '100%'
});

aboutExe.css.set('class', aboutExe.uniqueAppID+'-imagePhoto2',{

//  'background-image':"url('"+aboutExe.root+"img/qrcode.jpg')",
  'width': '150px',
  'height': '150px',
  'top': '246px',
  'position': 'absolute',
  'background-repeat': 'no-repeat',
  'background-size': 'cover'

});





aboutExe.css.set('class', aboutExe.uniqueAppID+'-textContainer',{
  'display': 'flex',
  'height': '100%',
  'width': '60%',
  'align-items': 'flex-start',
  //'justify-content':'center',
  'box-sizing': 'border-box',
  'padding': '5%',
  'flex-direction':'column',
  'color':'white'
});


aboutExe.css.set('id', aboutExe.uniqueAppID+'-textHeading',{
  'text-transform': 'uppercase',
  'font-size': '14px',
  'letter-spacing': '2px',
  'line-height': '21px'

});


aboutExe.css.set('id', aboutExe.uniqueAppID+'-textSpan',{
  'background-color': 'var(--white)',
  'color':'black',
  'font-size': '33px',
  'letter-spacing': '4.7px',
  'padding': '14px 0px 8px 8px',
  'margin-left': '-11px',
  'margin-top': '4px',
  'margin-bottom': '34px',
  'padding': '12px'
});





aboutExe.start = function(applicant) {
  if (applicant !== 'OS') {
    aboutExe.root = '';
  }


  var folderContainer = document.getElementById(aboutExe.uniqueAppID+'-canvas');



/////////////////////////////////////////////
  //Make Content
  /////////////////////////////////////////////

  /////////Left side
  var imageContainer = createElement('div',aboutExe.uniqueAppID+'-imageContainer', undefined, undefined);
  folderContainer.appendChild(imageContainer);

  var imageBackground = createElement('div',aboutExe.uniqueAppID+'-imageBackground', undefined, undefined);
  imageContainer.appendChild(imageBackground);

  var imagePhoto= createElement('div',aboutExe.uniqueAppID+'-imagePhoto', undefined, undefined);
  imageBackground.appendChild(imagePhoto);


/////////Right side
  var textContainer = createElement('div',aboutExe.uniqueAppID+'-textContainer', undefined, undefined);
  folderContainer.appendChild(textContainer);

  var headingCopy = "My name is Nūr El Amal Glenza,<br>"+
                      "But everyone calls me ,";
  var textHeading = createElement('div',undefined, aboutExe.uniqueAppID+'-textHeading', headingCopy);
  textContainer.appendChild(textHeading);

  var textSpan = createElement('div',undefined, aboutExe.uniqueAppID+'-textSpan', ' Nūr');
  textContainer.appendChild(textSpan);






  var bodyCopy =
              "  I am a software engineer by profession, a creator by passion, and a designer by obsession..<br>"+
                  "<br>";

  var textBody = createElement('div', undefined, undefined, bodyCopy);
  textContainer.appendChild(textBody);






}
