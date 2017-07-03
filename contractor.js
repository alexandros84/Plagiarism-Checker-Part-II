
	var stringA = "";
	var stringB = "";	 
	var results = [];
	var numberL = 0;
	var linkLall=[];
	var linkRall=[];
	var linkLred=[];
	var linkRred=[];
	var linkLind=[];
	var linkRind=[];	
   

function createData(){

	var arA = stringA.split(".").filter(Boolean);
	var arB = stringB.split(".").filter(Boolean);

		var lEngthA = arA.length;
		var lEngthB = arB.length;
		
		var a = "sentA";
		var b = "sentB";

	for (i=0;i<lEngthA;i++) { eval ( "var "+a+i+" = arA[i] ;"); }
	for (i=0;i<lEngthB;i++) { eval ( "var "+b+i+" = arB[i] ;"); }
	
	for (i=0;i<lEngthA;i++) { eval ( "var "+a+i+"m = "+ a + i +".split(/[ *, * *()* ]/).filter(Boolean);"); }
	for (i=0;i<lEngthB;i++) { eval ( "var "+b+i+"m = "+ b + i +".split(/[ *, * *()* ]/).filter(Boolean);"); }
	
	var aa = new Array(lEngthA);
	var ab = new Array(lEngthB);

	for (i=0;i<lEngthA;i++) { eval ( "aa[i] = " + a + i + "m;");  }
	for (i=0;i<lEngthB;i++) { eval ( "ab[i] = " + b + i + "m;");  }
	
	var twoDarr= new Array(lEngthA*lEngthB);
	for (i=0;i<twoDarr.length;i++) {twoDarr[i]=[[],[]];} 

  twoDarr.map(function(x,y) {
      return x[0] = aa[parseInt(y/lEngthB)];
      });
  twoDarr.map(function(x,y) {
      return x[1] = ab[parseInt(y%lEngthB)];
      });    

    var prefixL = "valLeft"; var prefixR = "valRight";

	results = twoDarr.map(function(x,y) {      
          eval ( "var "+ prefixL + y + "= 0;" );
          eval ( "var "+ prefixR + y + "= 0;" );
          x[0].forEach(function(el){
    x[1].includes(el) ? eval ( prefixL + y + "++" ) : 0;
          });
          x[1].forEach(function(el){
    x[0].includes(el) ? eval ( prefixR + y + "++" ) : 0;
          });
return [eval ( "("+prefixL+y+")/(x[0].length) + ("+prefixR+y+")/(x[1].length)")]
      });
	  
	linkLall = (function(x){ while(x.push([]) < lEngthA); return x})([]);
    linkRall = (function(x){ while(x.push([]) < lEngthB); return x})([]);
	
	linkLred = (function(x){ while(x.push([]) < lEngthA); return x})([]);
    linkRred = (function(x){ while(x.push([]) < lEngthB); return x})([]);

	var linkLind = (function(x){ while(x.push([]) < lEngthA); return x})([]);
    var linkRind = (function(x){ while(x.push([]) < lEngthB); return x})([]);
		
	results.forEach(function(x,y) {     
	
     if ( Number(x) >= (1.4) ) { 
								eval( "(linkLred["+parseInt(y/lEngthB)+"]).push("+parseInt(y%lEngthB)+");" );     
								eval( "(linkRred["+parseInt(y%lEngthB)+"]).push("+parseInt(y/lEngthB)+");" );
									} 
	});
		
	results.forEach(function(x,y) {  
	
	 if ( Number(x) >= (0.9) ) {	
								eval( "(linkLall["+parseInt(y/lEngthB)+"]).push("+parseInt(y%lEngthB)+");" );     
								eval( "(linkRall["+parseInt(y%lEngthB)+"]).push("+parseInt(y/lEngthB)+");" );								
									}			
	});  
	
	results.forEach(function(x,y) {  
	
	 if ( Number(x) >= (0) ) {	
								eval( "(linkLind["+parseInt(y/lEngthB)+"]).push("+parseInt(y%lEngthB)+");" );     
								eval( "(linkRind["+parseInt(y%lEngthB)+"]).push("+parseInt(y/lEngthB)+");" );								
									}			
	}); 
		
	
}

onmessage = function(e) {
	
	var couple = "white";
		
	stringA = e.data[0];
	stringB = e.data[1];
	stringC = e.data[2];
	var redsC = e.data[4];
	var yelsC = e.data[5];
   
  //var me = " me!";
	  stringD = e.data[3];
	  var wres = stringC + "," +stringD +",";
	  
		createData();
	  
	  var redsL = linkLred.reduce(function(a, b) {return a.concat(b);}).join("").length;
	  var redsR = linkRred.reduce(function(a, b) {return a.concat(b);}).join("").length;
	  var yellowsL = linkLall.reduce(function(a, b) {return a.concat(b);}).join("").length - redsL;
	  var yellowsR = linkRall.reduce(function(a, b) {return a.concat(b);}).join("").length - redsR;
		   
	  //if ( (yelsC < yellowsL) || (yelsC < yellowsR) )
	  //{ couple = "red"; }
	  if ( (redsC < redsL)  || (redsC < redsR) )
	  { couple = "red"; } 
	  postMessage([ wres, results, couple, linkLall, linkRall, redsL, redsR, linkLred, linkRred, stringA, stringB ]);
	  //close();
}
