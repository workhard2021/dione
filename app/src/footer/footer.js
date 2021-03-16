import React from'react';
//import * as API from '../API/api';
import './css/footer.css';
const FooterPage=(props)=>{
	   //const {dispatch,user}=props.data;
	  
	   const top=()=>{
	   	  setTimeout(function() {
	   	  	  window.scroll(0,0)
			 
	   	  }, 100);
	   }

	   window.onscroll=()=>scrollMax()

	 function scrollMax() {
            const y=document.body.scrollTop  || document.documentElement.scrollTop;
            const 	btn_top=document.getElementsByClassName('btn_top')[0];

		    if(y>200) {

		    	if(btn_top) btn_top.style.display='block';

		     } else {
		         if(btn_top) btn_top.style.display='none';
		     }
	   }

	
	  return <footer className='footer bg_all'>
	           <div className='btn_top' onClick={()=>top()}><i className="fas fa-arrow-circle-up"></i></div>
	            <p>Copyright  <span dangerouslySetInnerHTML={{ "__html": "&copy;" }} /> 
	                 2021 Dav-fast-food tous droits réservés.<br/>
	                 <a href="condition"> Termes et conditions</a>
	            </p>
	         </footer>
}
export default FooterPage;