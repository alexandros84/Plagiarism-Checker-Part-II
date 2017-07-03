 
		//
		//  Global variables key>> valueN- number of assignements,
		//						   ab- all input indices in one array,
		//						   ac- all strings in one array massive ds handle with care,
		//						   objectArray- array of objects {author: unknown1, string: mpla}
		//						   new_array- all possible couples in 2D form,
		//						   posel- one array that contains all the positions of target elements,
		//						   grid- replica of one twoDarr with slice(),	
		//						   threeD- replica of vecMap.
		//						   new_arrayCopy- massive array containing all output from contractor (i.e. e.data)
		//						   new_arrayCopy2- array containing info on whether a couple is red or white
		//						   connections- array containing for every element its red couples
		//
		
var valueN; 
var ab=[];
var ac=[];
var objectArray = [];
var objectArray2 = [];
var new_array =[];
var new_arrayCopy =[];
var new_arrayCopy2 =[];
var posel = [];	
var grid = [];
var threeD = []; 
var manager = new Worker('manager.js');
var contractor = new Worker('contractor.js');	
var counter=0;
var connections = [];
var connectionsV = [];	
var indexOfTargets = [];
var start=0;
var finish=0;
var numberL = 0;

     var linkRefL = [];
	 var linkRefR = [];
	 
	 var linkRefLcla = [];
	 var linkRefRcla = [];
	 
function createLinkL(){
	this.setAttribute("class", "targeted");
	var tidn = Number((/\d+/g).exec(this.id));
	
	(linkRefL[tidn]).forEach(function(x,y){
		numberL = Number(x)
		document.getElementById("Y").children[numberL].setAttribute("class", "targeted");	
		
	});
	
};

function removeLinkL(){
	var tidn = Number((/\d+/g).exec(this.id));	
	this.setAttribute("class", (linkRefLcla[tidn].slice(-1)[0]) );
	
	(linkRefL[tidn]).forEach(function(x,y){		
		numberL = Number(x)
		document.getElementById("Y").children[numberL].setAttribute("class", (linkRefRcla[numberL].slice(-1)[0]));	
		
	});
	
};

function createLinkR(){
	this.setAttribute("class", "targeted");
	var tidn = Number((/\d+/g).exec(this.id));
	
	(linkRefR[tidn]).forEach(function(x,y){
		numberL = Number(x)
		document.getElementById("X").children[numberL].setAttribute("class", "targeted");	
		
	});
	
};

function removeLinkR(){
	var tidn = Number((/\d+/g).exec(this.id));	
	this.setAttribute("class", (linkRefRcla[tidn].slice(-1)[0]) );
	
	(linkRefR[tidn]).forEach(function(x,y){		
		numberL = Number(x)
		document.getElementById("X").children[numberL].setAttribute("class", (linkRefLcla[numberL].slice(-1)[0]));	
		
	});
	
};

		var arrRand;
		var arrValue = [["a. "],["a. ", "a. ", "b. ", "c. ", "d. ", "e. "], ["g. ", "f. ", "g. ", "i. ", "j. "], ["k. ", "l. ", "m. ", "n. ", "o. "]]; 
		 
			function runS(){
				 
			var random = Math.floor(Math.random() * 6) + 1;
			arrRand = new Array(random);

			for(x=0; x<random; x++) { 
			arrRand.splice(x,1,arrValue[Math.floor(Math.random() * 3) + 1][Math.floor(Math.random() * 4) + 1]);
									};
				return arrRand.join(" ");
				
						}						

function takenumberMakeDivs(){
 
valueN = document.getElementById("number").value;

	for (i=1; i<=valueN; i++) {
		
		runS()
		
		var box = document.createElement("div");
		document.getElementById("D").appendChild(box);
		box.id="div"+i;
		box.setAttribute("class", "box");
		var text = document.createTextNode("Enter assignment no. "+i)
		var textA = document.createTextNode("of author no. "+i)
		box.appendChild(text);		
		var input = document.createElement("input");
		var inputA = document.createElement("input");
		inputA.id = "inputA"+i		
		input.id = "input"+i
		input.setAttribute("type", "text");
		input.setAttribute("class", "private");
		var stringValue = runS();
		input.setAttribute("value", stringValue);
		inputA.setAttribute("type", "text");
		inputA.setAttribute("class", "private");
		inputA.setAttribute("value", "Unknown"+i);
		box.appendChild(input);
		box.appendChild(textA);
		box.appendChild(inputA);
		
	}
 
};  
	
	//  The difference between valueN and numberO  is that the first is iterable array-wise (begins from 
	//  0), while numberO is numbering the assignements in a human friendly format (starts from 1).
	
function prep_ab(){
	
		for (i=0; i<valueN; i++){
		
			var numberO=(i+1);
			var elem = document.getElementById("input"+numberO);
			eval("var string"+i+"=elem.value;");
			eval("var elemA = document.getElementById(\u0022inputA"+numberO+"\u0022);");
			eval("var stringA"+i+"=elemA.value;");
			eval("ac.push(string"+i+");");
			eval("ab.push("+i+");");
			eval("objectArray.push({author: stringA"+i+", assignment: string"+i+"})");
			
		}
					
		wakeup_manager();
					
}		

function wakeup_manager(){

manager.postMessage([ab]);

}

		//
		//	Note that the way I ve structured the worker/main relationship now it is easy to 
		//  spawn another worker from main so to send one couple at the time using ab, ac in
		//  ex positioning.
		//

manager.onmessage = function(e){ 
		
		new_array = e.data;
		var test = document.createElement("div");
		test.id = "progressbar";
		test.setAttribute("class","nakeD")
		document.body.appendChild(test);
		var text = document.createTextNode(e.data);
		test.appendChild(text);	
		var br = document.createElement("br");
		test.appendChild(br);
		manager.terminate();
}   

function uploadProgressBar(){
	
	var box = document.createElement("div"); 
	box.id = "progressDiv";
	box.setAttribute("class", "nakeD" );
	var bar = document.createElement("progress");
	bar.id = "bar";
	bar.setAttribute( "value", "0" );
	bar.setAttribute( "max", new_array.length.toString() );
	document.body.appendChild(box);
	box.appendChild(bar);
	
}

function wakeup_contractor(x){
	
	if ( counter<(new_array.length) ) {

	counter++;
	/*
	if (counter==1) {
				
		start = getTime();
		var timer = document.createTextNode(getTime()-start);
		var span = document.
		var progress = document.getElementById("progressDiv");
		progress.appendChild(timer);
	
	}
	*/
	
	var numberA = new_array[x][0];
	var numberB = new_array[x][1];
	var criA = document.getElementById("CriA").value;
	var criB = document.getElementById("CriB").value;
	contractor.postMessage( [ ac[numberA], ac[numberB], numberA, numberB, criA, criB ] );
	
		}
		
	else {
		
		contractor.terminate;
		drawConnections()
		
		}
	
};

contractor.onmessage = function(e){
	
	
	new_arrayCopy.push(e.data);
	new_arrayCopy2.push(e.data[2]);
	document.getElementById("bar").value = new_arrayCopy.length.toString();
	var texture2 = document.createTextNode(e.data[2]);
	document.getElementById("progressbar").appendChild(texture2);
	
	wakeup_contractor(counter);
	
}

function fnp(x) {
	
	return x.reduce(function(a, b) {return a.concat(b);})
	
}

function syncredsY() {
	var valueR = document.getElementById("CriA").value;
	document.getElementById("CriC").value = valueR; 
	document.getElementById("CriC").max = valueR; 	
}

function syncyelsY() {
	var valueR = document.getElementById("CriB").value;
	document.getElementById("CriD").value = valueR; 
	document.getElementById("CriD").max = valueR; 	
}

function drawConnections() {
	
var canvas = document.getElementById('canvas3');
var ctx = canvas.getContext('2d');
ctx.strokeStyle = 'rgba(0, 245, 245, 0.5)';
				
	//ctx.strokeRect(grid[2][0], grid[2][1], 30, 30);
	
	for (i=0; i<new_arrayCopy2.length; i++) {
		
		if ( new_arrayCopy2[i]=="red" ) {
			
			var a = new_array[i][0];
			var b = new_array[i][1];
			
		ctx.strokeStyle = 'rgba(0, 245, 245, 0.5)';
		ctx.lineWidth = 3 ;
		ctx.beginPath();
		ctx.moveTo(posel[a][0] + 8 , posel[a][1] + 8 );
		ctx.lineTo(posel[b][0] + 8 , posel[b][1] + 8 );
		//ctx.lineTo((pointX - vecX*4 ) , (pointY - vecY*4 ) );
		//ctx.lineTo(grid[b][0] - threeD[b][0]*4, grid[b][1] - threeD[b][1]*4 );		
		//ctx.lineTo(grid[b][0] - threeD[b][0], grid[b][1] - threeD[b][1] );				
		//ctx.closePath();
		ctx.stroke();
						
		}		
	}

	connections.length = ab.length;
		
	for (i=0; i<connections.length; i++) {connections[i]= [];}
	
	for (x=0; x<ab.length; x++) {
	
			for (i=0; i<new_array.length; i++) {
			
( (new_array[i].includes(ab[x])) && (new_arrayCopy2[i]=="red") ) ? connections[x].push(new_array[i]) : 0;
				
			}	
	}
	
	connectionsV = connections.map( function(x,y){                           //JSON.stringify(connections)
			
			if ( x.length!==0 ) { return fnp(x); }
			
			else 				{ return   x;    }
			
	});
	
	appendInfo(connectionsV);
	
}

function conTarget() {
	var number = Number((/\d+/).exec(this.id));
	var circleDiv = "circleDiv" + number;
	var target = document.getElementById(circleDiv);
	target.style.boxShadow = "0px 0px 30px blue"; 		
}

function conTargetClean() {
	
	var x = document.getElementsByTagName("div");
	
	for (i=0; i<x.length; i++) {
	x[i].style.boxShadow = "0px 0px 0px rgba(0,0,0,0.3)"; 		
	}
}

function appendInfo(x){
	
	var debug = document.getElementById("debug");
	
	var dbug = document.createTextNode(JSON.stringify(indexOfTargets));
	var container = document.getElementById("debug");
	container.appendChild(dbug);
	
	for (i=0; i<x.length; i++) {
		
		var box = document.createElement("div");
		box.id = "b" +i;
		box.setAttribute("class", "box");
		box.addEventListener("mouseover", conTarget);
		box.addEventListener("mouseout", conTargetClean);		
		author = document.createTextNode(objectArray[i]['author']);
		box.appendChild(author);
		var br = document.createElement("br");
		box.appendChild(br); box.appendChild(br);  
		var possibly = document.createTextNode("Red connection with: ");
		box.appendChild(possibly); 
			
			if ( x[i].length!==0 ) { for (z=0; z<x[i].length; z++) {if ( x[i][z]!==i ) { 

		var span = document.createElement("span");
		span.setAttribute("class", "labelspan");
		span.id = "box" + i + "span" + x[i][z]; 
		span.addEventListener("click", constructCouple);
		var author_a = document.createTextNode(objectArray[x[i][z]]['author']+" ");  // objectArray[x[i][z]]['author']+" "
		span.appendChild(author_a);
		box.appendChild(span);

		} } }
		
		else { 
		var none_a = document.createTextNode("None");
		box.appendChild(none_a);
		
		}
	
	debug.appendChild(box);

	}
		
}
	

function clearC() {
	
	
	
}
	
/*	
	var dbug = document.createTextNode(JSON.stringify(x));
	var container = document.getElementById("debug");
	container.appendChild(dbug);
*/

function drawbase(x) {

uploadProgressBar();
wakeup_contractor(counter);
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var elem_ex = document.getElementById("ex");
var widthE = canvas.width;
var heightE = canvas.height;

	// Create the vector map; this step is optional yet interesting.
	
	var widthGr = ((widthE-45)/15);
	var heightG = ((heightE-45)/15);

	var a1=[];

	for (i=0; i<widthGr; i++){
		
	var re = -(-((widthGr)/2)+i);
	a1.push(re);

	}

	var a2=[];

	for (i=0; i<heightG; i++){
		
	var ra = (((heightG)/2)-i);
	a2.push(ra);

	}

	var lA = a1.length;
	var lB = a2.length;

	var vecMap= new Array(lA*lB);
	for (i=0;i<vecMap.length;i++) {vecMap[i]=[,];} 

	  vecMap.map(function(x,y) {
		   x[0] = parseInt(a1[parseInt(y%lA)]);
		   x[1] = parseInt(a2[parseInt(y/lA)]);
		  });
	
	//
	// Creating the grid-- twoDarr will contain all possible elements in the 300x600 grid,
	// including the 30 offset boundary from the ex div. 
	//
	
var xx=[];
	
	for (i=0; i<((widthE-45)/15); i++){ var re=30+i*15; xx.push(re); }

var yy=[];

	for (i=0; i<((heightE-45)/15); i++){ var ra=30+i*15; yy.push(ra); }

var lEngthA = xx.length;
var lEngthB = yy.length;

	var twoDarr= new Array(lEngthA*lEngthB);

	for (i=0;i<twoDarr.length;i++) {twoDarr[i]=[,];} 

	twoDarr.map(function(x,y) {
       x[0] = parseInt(xx[parseInt(y%lEngthA)]);// + vecMap[y][0];
       x[1] = parseInt(yy[parseInt(y/lEngthA)]);// + vecMap[y][1];
      });  
	  
	grid = twoDarr.slice();
	
	threeD = vecMap.slice();	
	
	//	
	//  Now that we have all possible positions it's time to pick some random positions at
	//  first and then take off that position from future picks with splice(index, no of elems);
	//
	
	for (i=0; i<twoDarr.length; i++) {

		ctx.strokeStyle = 'rgba(70, 100, 200, 0.5)';
		ctx.beginPath();
		ctx.moveTo(twoDarr[i][0], twoDarr[i][1]);
		ctx.lineTo(twoDarr[i][0]-vecMap[i][0], twoDarr[i][1]-vecMap[i][1]);
		ctx.closePath();
		ctx.stroke();
		ctx.strokeRect(twoDarr[i][0]-1.5, twoDarr[i][1]-1.5, 3, 3);

	}
	
var twoDarr2 = twoDarr;

	for (i=0; i<ab.length; i++) {

		var random = Math.floor(Math.random() * (twoDarr.length));

		ctx.strokeStyle = 'rgb(0, 245, 245 )';
		ctx.beginPath();
		ctx.arc(twoDarr2[random][0], twoDarr2[random][1], 4, 0, 2 * Math.PI);
		posel.push([twoDarr2[random][0]-8, twoDarr2[random][1]-8]);
		
		var indexofthis = grid.map(function(x,y) {
		   if ((x[0]==(twoDarr2[random][0])) && (x[1]==(twoDarr2[random][1])))
		   {return y;} 
		  });
		var a = indexofthis.filter(function(o){ return o!=null; }); 
		var inPos = a[0]; 
		
		indexOfTargets.push(inPos);
		ctx.stroke();
		var garbage = twoDarr2.splice(random, 1);

	}

	var posX = "";
	var posY = "";

	for (i=0; i<posel.length; i++) {
	
		posX = (posel[i][0]);
		posY = (posel[i][1]);

		var box = document.createElement("div");
		box.setAttribute("class", "target");
		eval("box.id = \u0022circleDiv" + i + "\u0022;");
		eval("box.setAttribute(\u0022title\u0022, \u0022"+posX+", "+posY+", "+box.id+", "+objectArray[i]['author']+"\u0022);");
		box.addEventListener("mouseover", growC);
		box.addEventListener("mouseout", retractC);		
		elem_ex.appendChild(box);

		box.style.top = posY+"px";
		box.style.left = posX+"px";

	}
	
	
}


function growC() {

var canvas = document.getElementById('canvas2');
var ctx = canvas.getContext('2d');
var reposX = this.offsetLeft+8;
var reposY = this.offsetTop+8;

thisid = Number((/\d+/).exec(this.id));

var inPos = indexOfTargets[thisid];

var widthE = canvas.width;
var heightE = canvas.height;
		
var widthGr = ((widthE-45)/15);
var heightG = ((heightE-45)/15);

var maxW =  ((widthGr)/2)+0;
var minW =  -(-((widthGr)/2)+widthGr);

	for (i=0; i<connectionsV[thisid].length; i++) {

	if ( connectionsV[thisid][i] !== thisid ) {
	
	var val = indexOfTargets[connectionsV[thisid][i]];
	
	var pointX = ( grid[inPos][0] - threeD[inPos][0]*4 +  grid[val][0] - threeD[val][0]*4 )/2 ; 
	
	var vecX = maxW - (pointX-30) * ((maxW-minW)/(widthE-60));

	var maxY = (((heightG)/2)-0);	
	var minY = (((heightG)/2)-heightG);
	
	var pointY = ( grid[inPos][1] - threeD[inPos][1]*4 +  grid[val][1] - threeD[val][1]*4 )/2;	
	
	var vecY = maxY - (pointY-30) * ((maxY-minY)/(heightE-60));
		
ctx.strokeStyle = 'rgba(245, 0, 0, 0.5)';
ctx.lineWidth = 5;
		ctx.beginPath();
		ctx.moveTo(grid[inPos][0] - threeD[inPos][0] , grid[inPos][1] - threeD[inPos][1] );
		ctx.lineTo(grid[inPos][0] - threeD[inPos][0]*4, grid[inPos][1] - threeD[inPos][1]*4 );
		ctx.lineTo((pointX - vecX*4 ) , (pointY - vecY*4 ) );
		ctx.lineTo(grid[val][0] - threeD[val][0]*4, grid[val][1] - threeD[val][1]*4 );		
		ctx.lineTo(grid[val][0] - threeD[val][0], grid[val][1] - threeD[val][1] );				
		//ctx.closePath();
		ctx.stroke();

var elem_ex2 = document.getElementById("ex2");

var box = document.createElement("div");
box.setAttribute("class", "target2");
var othis = document.createTextNode(objectArray[connectionsV[thisid][i]]['author']);
box.appendChild(othis);
var posbox_x = (grid[inPos][0] +  grid[val][0])/2 ;
var posbox_y = (grid[inPos][1] +  grid[val][1])/2 ;

	box.style.top = posbox_y +"px";
	box.style.left = posbox_x +"px";

elem_ex2.appendChild(box);		
		
			}
	
	  }	
	

}

function retractC() {

var canvas = document.getElementById('canvas2');
var ctx = canvas.getContext('2d');

var elem_ex2 = document.getElementById("ex2");
elem_ex2.innerHTML = "";
ctx.clearRect(0, 0, canvas.width, canvas.height);

}

function constructCouple() {
	
	document.getElementById("X").innerHTML = "";
	document.getElementById("Y").innerHTML = "";
	
	var numberA = Number((/\d+/).exec((/box\d+/g).exec(this.id)));
	var numberB = Number((/\d+/).exec((/span\d+/g).exec(this.id)))
	
	/*	
	var text = document.createTextNode(numberA+", "+numberB);
	var cont = document.getElementById("X");
	cont.appendChild(text);
		*/	
	
	var stringA = objectArray[numberA]['assignment'];
	var stringB = objectArray[numberB]['assignment'];

	var arA = stringA.split(".").filter(Boolean);
	var arB = stringB.split(".").filter(Boolean);
	
	var lEngthA = arA.length;
	var lEngthB = arB.length;


	  var spanA = "spanA";
	  var textNodeA = "textNodeA";
	  var getA = document.getElementById("X");	  
	  
	arA.forEach(function( x, i ){
		  
		  eval ( "var spanA" + i + " = document.createElement(\u0022span\u0022);");	
		  eval ( "spanA" + i + ".id = \u0022spanA"+i+"\u0022");
		  eval ( "var textNodeA" + i + "= document.createTextNode(\u0022" + x +"."+ "\u0022);" );
		  eval ( "spanA" + i + ".appendChild(textNodeA" + i + ");" );
		  return eval ( "document.getElementById(\u0022X\u0022).appendChild(spanA"+i+");");		  
		
	}); 
	  var spanB = "spanB";
	  var textNodeB = "textNodeB";
	  var getB = document.getElementById("Y");
	  
	arB.forEach(function( x, i ){
		  
		  eval( "var spanB" + i + " = document.createElement(\u0022span\u0022);");
		  eval ( "spanB" + i + ".id = \u0022spanB"+i+"\u0022");		  
		  eval ( "var textNodeB" + i + "= document.createTextNode(\u0022" + x +"."+ "\u0022);" );
		  eval ( "spanB" + i + ".appendChild(textNodeB" + i + ");" );
		  return eval ( "document.getElementById(\u0022Y\u0022).appendChild(spanB"+i+");");		  
		
	}); 	
	
		
	var selectCouple = new_array.map(function(x, y){ 
		if ((x[0] == numberA || x[1] == numberA) && (x[0] == numberB || x[1] == numberB)) { return y }
		else { return null }
	})
	var selectFrom = selectCouple.filter(function(o){ return o!=null; }); 
	var numberC  = selectFrom[0]; 
	/*
	var text = document.createTextNode(JSON.stringify(new_arrayCopy[numberC][3]));
	var cont = document.getElementById("X");
	cont.appendChild(text);
 	*/		

	
	linkRefL = new_arrayCopy[numberC][3];
	linkRefR = new_arrayCopy[numberC][4];
	
	  var collectionA = document.getElementById("X"); 
	  var collectionB = document.getElementById("Y"); 
	  
	var linkLcla = (function(x){ while(x.push([]) < lEngthA); return x})([]);
    var linkRcla = (function(x){ while(x.push([]) < lEngthB); return x})([]);	
	
	new_arrayCopy[numberC][3].forEach(function( x, y){
		  
	 if  ( (x.length) !== (0) ) {	
								(linkLcla[y]).push("yellow");
								collectionA.childNodes[y].setAttribute("class", "yellow"); 
								collectionA.childNodes[y].setAttribute("title", "This might be a false alarm... Check our suggestion and if it is so, lick once at this sentene to let us know!"); 
								collectionA.childNodes[y].addEventListener("mouseover", createLinkL); 	 	           
								collectionA.childNodes[y].addEventListener("click", removeLinkL); 
							//	collectionA.childNodes[y].addEventListener("dblclick", createCopyL); 	 	  	           								
									}
	});
	
	new_arrayCopy[numberC][4].forEach(function( x, y){
	
	 if  ( (x.length) !== (0) ) {	
								(linkRcla[y]).push("yellow");								
								collectionB.childNodes[y].setAttribute("class", "yellow"); 
								collectionB.childNodes[y].setAttribute("title", "This might be a false alarm... Check our suggestion and if it is so, lick once at this sentene to let us know!"); 
								collectionB.childNodes[y].addEventListener("mouseover", createLinkR); 	 	           
								collectionB.childNodes[y].addEventListener("click", removeLinkR); 	 	           												   												   
							//	collectionB.childNodes[y].addEventListener("dblclick", createCopyR); 	 	 	           																
								  	 }	                    
	});	

	new_arrayCopy[numberC][7].forEach(function( x, y){
		  
	 if  ( (x.length) !== (0) ) {
								(linkLcla[y]).push("red");								
								collectionA.childNodes[y].setAttribute("class", "red"); 
								collectionA.childNodes[y].setAttribute("title", "This looks suspicious"); 
								 	 	           
												   
									}
	});
	
	new_arrayCopy[numberC][8].forEach(function( x, y){
	
	 if  ( (x.length) !== (0) ) {
								(linkRcla[y]).push("red");																
								collectionB.childNodes[y].setAttribute("class", "red"); 
								collectionB.childNodes[y].setAttribute("title", "This looks highly suspicious!"); 
								
								
								  	 }	                    
	});
	
	linkRefLcla = linkLcla;
	linkRefRcla = linkRcla;
	
}
