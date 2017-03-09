function loaddetails(){
  addListeners();
  initialiseKnobPositions();
  var xhr = new XMLHttpRequest();
  xhr.open("GET", '/docdetailslist', true);

  xhr.onreadystatechange = function() {
    if(xhr.readyState == 4 && xhr.status == 200) {
      var resp = JSON.parse(xhr.responseText);
      populateDocList(resp);
    }
  }
  xhr.send();
}

function populateDocList(detailsJSON){

  for(var i =0; i<detailsJSON.length; i++){
    var detailsUL = document.getElementById('docdetailsUL');

    var detailsli = document.createElement('li');
    detailsli.setAttribute("id", "detailsli");
    var detailswrapper = document.createElement('div');
    detailswrapper.className = "detailwrapper";
    var section1 = document.createElement('div');
    section1.className = "sec1";
    var img = document.createElement('div');
    img.className = "docimg";
    var imgelement = document.createElement('img');
      
    var docdetials = document.createElement('div');
    docdetials.className = "docdetials";
    var docname = document.createElement('h4');
    
    var roledetails = document.createElement('p');
    roledetails.setAttribute("id", "a");
    var appointmentdiv = document.createElement('div');
    appointmentdiv.className = "appointmentbutton";
    var appbutton = document.createElement("input");
    appbutton.type = "button";
    appbutton.name = "bookappointment";
    appbutton.id = "book";
    appbutton.value = "MAKE APPOINTMENT";
    var section1divide = document.createElement('div');
    section1divide.className = "sec1divide";
    var sec2wrapper = document.createElement('div');
    sec2wrapper.className = "sec2wrapper";
    var sec2 = document.createElement('div');
    sec2.className = "sec2";
    var clinic1 = document.createElement('h5');
    
    clinic1.setAttribute("id","clinicname")
    var address1 = document.createElement('p');
    address1.setAttribute("id", "a");
   
    var timings1 = document.createElement('div');
    timings1.className = "timings";
    
    var fee1 = document.createElement('div');
    fee1.className = "fee";
              
    var sec2divide = document.createElement('div');
    sec2divide.className = "sec2dividehorz";
    var sec3 = document.createElement('div');
    sec3.className = "sec3";
    var clinic2 = document.createElement('h5');
    
    clinic2.setAttribute("id","clinicname")
    var address2 = document.createElement('p');
    address2.setAttribute("id", "a");
    
    var timings2 = document.createElement('div');
    timings2.className = "timings";
    
    var fee2 = document.createElement('div');
    fee2.className = "fee";
              

    detailsUL.appendChild(detailsli);
    detailsli.appendChild(detailswrapper);
    detailswrapper.appendChild(section1);
    section1.appendChild(img);
    img.appendChild(imgelement);
    section1.appendChild(docdetials);
    docdetials.appendChild(docname);
    docdetials.appendChild(roledetails);
    section1.appendChild(appointmentdiv);
    appointmentdiv.appendChild(appbutton);
    detailswrapper.appendChild(section1divide);
    detailswrapper.appendChild(sec2wrapper);
    sec2wrapper.appendChild(sec2);
    sec2.appendChild(clinic1);
    sec2.appendChild(address1);
    sec2.appendChild(timings1);
    sec2.appendChild(fee1);
    sec2wrapper.appendChild(sec2divide);
    sec2wrapper.appendChild(sec3);
    sec3.appendChild(clinic2);
    sec3.appendChild(address2);
    sec3.appendChild(timings2);
    sec3.appendChild(fee2);

    // fill data  
    var docdata = detailsJSON[i];
    imgelement.setAttribute("src","images/"+docdata.profileimg+".png");
    docname.innerHTML = docdata.name;
    roledetails.innerHTML = formatRoleDetails(docdata.role,docdata.experience,docdata.qualification)
    clinic1.innerHTML = docdata.clinics[0].name;
    address1.innerHTML = docdata.clinics[0].address;
    timings1.innerHTML = formatTimings(docdata.clinics[0].weekdaytiming, docdata.clinics[0].weekendtiming);
    fee1.innerHTML = formatFee(docdata.clinics[0].fee);
    clinic2.innerHTML = docdata.clinics[1].name;
    address2.innerHTML = docdata.clinics[1].address;
    timings2.innerHTML = formatTimings(docdata.clinics[1].weekdaytiming, docdata.clinics[1].weekendtiming);
    fee2.innerHTML = formatFee(docdata.clinics[1].fee);
  }

  if(detailsJSON.length == 1){
    resultText = detailsJSON.length+ " Result Found"
  }
  else{
    resultText = detailsJSON.length+ " Results Found"
  }
  var resultText = 
  document.getElementById("resultcount").innerHTML = resultText;
}


function formatRoleDetails(role,experience,qualification){
  formattedDetails = role+ "<br>"+qualification+"<br>"+experience+" Years";
  return formattedDetails;
}

function formatTimings(weekdaytiming,weekendtiming){
  var formattedTiming = "Monday - Friday:  "+weekdaytiming+"<br>Saturday - Sunday:  "+weekendtiming;
  return formattedTiming;
}

function formatFee(fee){
  var formattedFee = fee.toString() + " INR/hours";
  return formattedFee;
}

function headerMenu() {
  var x = document.getElementById("headerNavs");
  if(x.className === "headerNavList"){
      x.className += " responsive";
  }
  else {
      x.className = "headerNavList";
  }
}

function setSliderValue(leftVal,rightVal) {
	var formattedtm=formattime(leftVal);
	$("#leftval").text(formattedtm);
	var formattedtmright=formattime(rightVal);
	$("#rightval").text(formattedtmright);
}

function formattime(time) {
	var appender="AM";
	var formattedtime;
	if(time > 12){
		appender="PM";
		time = time-12;
	}
	if(time == 12){
		appender="PM";
	}
	formattedtime = time.toString() + " "+appender;
	return formattedtime;
}

function searchDoc(){
  var xhr = new XMLHttpRequest();
  var searchString = document.getElementById("dentistsearch").value;
  console.log("search for "+searchString);
  var searchQuery = "searchString="+searchString
  xhr.open("GET", '/search?'+searchQuery, true);

  
  xhr.onreadystatechange = function() {//Call a function when the state changes.
      if(xhr.readyState == 4 && xhr.status == 200) {
          var resp = JSON.parse(xhr.responseText);
          var lis = document.querySelectorAll('#docdetailsUL li');
          for(var i=0; li=lis[i]; i++) {
              li.parentNode.removeChild(li);
          }
          populateDocList(resp);
      }
  }
  xhr.send();
}

function expandFilters(){
  var x = document.getElementById("filterwrapperdiv");
  if(x.className === "filterwrapper"){
      x.className += " expand";
      refreshKnobs();
  }
  else {
      x.className = "filterwrapper";
  }
}

function expandSort(){
  var elementid = document.getElementById("sortwrapper");
  if(elementid.className === "sortwrapperDiv"){
      elementid.className += " expand";
  }
  else {
      elementid.className = "sortwrapperDiv";
  }
}

function expandSearch(){
  var elementid = document.getElementById("searchwrapper");
  if(elementid.className === "searchwrapperdiv"){
      elementid.className += " expand";
  }
  else {
      elementid.className = "searchwrapperdiv";
  }
}

function initialiseKnobPositions(){
  var trackWidth = document.getElementById('slidertrackdiv').offsetWidth;
  var trackLeft = document.getElementById('slidertrackdiv').offsetLeft;
  var knobWidth = document.getElementById('knobimg1').offsetWidth;
  var knob1div = document.getElementById('knob1');
  var knob2div = document.getElementById('knob2');
  
  var minPos = trackLeft - knobWidth/2;
  var maxPos = trackLeft + trackWidth - knobWidth/2;
  
  knob1div.style.position = 'absolute';
  knob1div.style.left = minPos+ 'px';
  populateTimeValue("leftval",calculateTime(trackWidth,minPos,trackLeft))
  
  knob2div.style.position = 'absolute';
  knob2div.style.left = maxPos + 'px';
  populateTimeValue("rightval",calculateTime(trackWidth,maxPos,trackLeft))
  
  calculateRangeWidth();
}

function addListeners(){
  document.getElementById('knob1').addEventListener('mousedown', mouseDown, false);
  window.addEventListener('mouseup', mouseUp, false);

  document.getElementById('knob2').addEventListener('mousedown', knob2MouseDown, false);
  window.addEventListener('mouseup', knob2MouseUp, false);

  window.addEventListener("resize", refreshKnobs);
}

function mouseUp(){
  window.removeEventListener('mousemove', moveknob1, true);
}

function mouseDown(e){
  window.addEventListener('mousemove', moveknob1, true);
}

function knob2MouseUp(){
  window.removeEventListener('mousemove', moveknob2, true);
}

function knob2MouseDown(e){
  window.addEventListener('mousemove', moveknob2, true);
}

function moveknob1(e){
  var knobdiv = document.getElementById('knob1');
  var knobWidth = document.getElementById('knobimg1').offsetWidth;
  var trackWidth = document.getElementById('slidertrackdiv').offsetWidth;
  var minPos = document.getElementById('slidertrackdiv').offsetLeft - knobWidth/2;
  var maxPos = document.getElementById('knob2').offsetLeft;
  knobdiv.style.position = 'absolute';
  knobdiv.style.left = calculatePosition(minPos,maxPos, e.clientX ) + 'px';
  populateTimeValue("leftval",calculateTime(trackWidth,knobdiv.offsetLeft,minPos))
  calculateRangeWidth();
}

function moveknob2(e){
  var knobdiv = document.getElementById('knob2');
  var knobWidth = document.getElementById('knobimg1').offsetWidth;
  var trackWidth = document.getElementById('slidertrackdiv').offsetWidth;
  var trackLeft = document.getElementById('slidertrackdiv').offsetLeft;
  var minPos = document.getElementById('knob1').offsetLeft;
  var maxPos = trackLeft + trackWidth - knobWidth/2;
  knobdiv.style.position = 'absolute';
  knobdiv.style.left = calculatePosition(minPos,maxPos, e.clientX ) + 'px';
  populateTimeValue("rightval",calculateTime(trackWidth,knobdiv.offsetLeft,trackLeft));
  calculateRangeWidth();
}

function calculatePosition(minPos,maxPos,mousePos){
  var divPos = mousePos;
  if(mousePos <= minPos){
    divPos = minPos;
  }
  else if(mousePos >= maxPos){
    divPos = maxPos;
  }
  return divPos;
}

function calculateTime(trackWidth,knobPos,trackPos){
  var knobWidth = document.getElementById('knobimg1').offsetWidth;
  var blockNum = Math.floor((knobPos-trackPos+(knobWidth/2))/(trackWidth/12));
  var time = blockNum + 8;
  var formattedTime = formattime(time);
  return formattedTime;
}

function populateTimeValue(spanId,time){
  var element = document.getElementById(spanId);
  element.innerHTML = time;
}

function calculateRangeWidth(){
  var knob1Pos = document.getElementById('knob1').offsetLeft;
  var knob2Pos = document.getElementById('knob2').offsetLeft;
  var rangeWidth = knob2Pos - knob1Pos - 2;
  document.getElementById("slideRangeDiv").style.width = rangeWidth + 'px';
  
}

function refreshKnobs(){
  var trackWidth = document.getElementById('slidertrackdiv').offsetWidth;
  var knob1val = document.getElementById('leftval').innerHTML;
  var knob1 = extractTime(knob1val)//knob1val.replace(/\D/g, '');
  var knob2val = document.getElementById('rightval').innerHTML;
  var knob2 = extractTime(knob2val)//knob1val.replace(/\D/g, '');
  
  var knob1pos = calculateknobPos(knob1,trackWidth);
  var knob2pos = calculateknobPos(knob2,trackWidth);
  var knob1div = document.getElementById('knob1');
  var knob2div = document.getElementById('knob2');
  knob1div.style.position = 'absolute';
  knob1div.style.left = knob1pos+ 'px';
  
  knob2div.style.position = 'absolute';
  knob2div.style.left = knob2pos + 'px';

  calculateRangeWidth();
}

function calculateknobPos(knobValue,trackWidth){
  var knobWidth = document.getElementById('knobimg1').offsetWidth;
  var trackleft = document.getElementById('slidertrackdiv').offsetLeft;
  var pos = ((knobValue-8) * (trackWidth/12)) +trackleft - (knobWidth/2) ;
  return pos;
}

function extractTime(timeStr){
  var textStr = timeStr.split(' ');
  var time = parseInt(timeStr.replace(/\D/g, ''));
  if(textStr[1] == "PM"){
    time = time + 12;
  }
  return time;
}

function handleKeyPress(e){
  if(e.keyCode === 13){
      e.preventDefault(); 
      searchDoc();
  }
}