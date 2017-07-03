var ab = [];
var new_array = [];

function cr_cpls (x) {

		for (n=0; n<(x.length-1); n++) {
		 
		 for (i=n+1; i<(x.length); i++) {     
		  new_array.push([x[n],x[i]]);   
		 }
			
		}
		return new_array;		
}

onmessage = function(e) {
  var ac = cr_cpls(e.data[0]);
  var workerResult = (ac);
  postMessage(workerResult);
  
}