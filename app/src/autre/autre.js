import React from 'react';
import '../container/css/pagination.css';

export const Verifier=(object,array)=>{
	      
	       let newObject={};
	       let errorObject={};
	       let newArray=array;
	       let arrayKey=Object.keys(object);

        for(let i=0;i<newArray.length;i++){ 

	            let test=arrayKey.find(value=> newArray[i]===value);

	            if(test !==undefined && object[newArray[i]].length>2){
                                    let str='';
                                     str = object[newArray[i]].replace(/[\s]{2,}/g," "); // Enlève les espaces doubles, triples, etc.
                                     str = str.replace(/^[\s]/, ""); // Enlève les espaces au début
                                     str = str.replace(/[\s]$/,""); //Enlève les espaces a la fin

	          	   	    	 	     newObject[newArray[i]]=str;
	          	   	    	 	     errorObject[newArray[i]]='';

	          	}else{
	          	   	     errorObject[newArray[i]]=' Veuillez remplir le champ '+newArray[i];
	            }
	          	     
	    }

	    if(!Object.values(errorObject).every(value=> value==='')){ 
	    	  
	    	  return errorObject;

	    }else{
             
             
	    	 return {verifier:true};
	    }

}

export const ScrollLoading=(a)=>{
	   window.addEventListener('scroll',()=>{
	   	   
	   	    if(window.scrollY+window.innerHeight>=document.documentElement.scrollHeight){
	   	    	console.log(window.scrollY+window.innerHeight,document.documentElement.scrollHeight)
	   	    }else{
	   	    	 console.log(window.scrollY+window.innerHeight,document.documentElement.scrollHeight)

	   	    }
	   })
}
export const  phoneNumber=(num_tel)=> {
	// Definition du motif a matcher
	var regex = new RegExp(/^(01|02|03|04|05|06|08)[0-9]{8}/gi);
	
	// Definition de la variable booleene match
	var match = false;
	
	// Test sur le motif
	if(regex.test(num_tel))
	{
		match = true;
	}
	  else
	{
		match = false;
	}
	
	// On renvoie match
	return match;
}
export const getCircularReplacer = () => {
	
	const seen = new WeakSet();
	return (key, value) => {
	  if (typeof value === "object" && value !== null) {
		if (seen.has(value)) {
		  return;
		}
		seen.add(value);
	  }
	  return value;
	};
  };

export const scrollPage=()=>{
	 	
		if( window.screen.width >= 1280  && window.screen.height >=800 ){
              
			if(window.innerHeight<600){
				window.scroll(0,window.screen.availHeight/2)
			}else{
		    	window.scroll(0,window.screen.height-window.screen.availHeight/2)
			}
			
		 } else {
		    window.scroll(0,window.screen.height-window.screen.availHeight/4)
		 }
}
export const  scrollAdmin=()=>{
	   
	if( window.screen.width >= 1280 && window.screen.height >= 800 ){
			if(window.innerHeight<600){
				window.scroll(0,window.screen.availHeight+200)
			}else{
				window.scroll(0,window.window.innerHeight)
			}
	 } else {
		   window.scroll(0,window.screen.availHeight+320)	    
	}

}




