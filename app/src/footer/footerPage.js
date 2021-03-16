import React,{useCallback, useEffect,useState} from 'react';
import * as API from '../API/api';
import './css/footer.css';
const FooterPage=(props)=>{
	   const {dispatch,user}=props.data;
	   const [success,setSuccess]=useState(false);
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

	  const initDescriptionSite=useCallback( ()=>{

	   const p1=API.all('/description-site/all')
	   const p2=API.all('/user/all')
	   const p3=API.all('/post/all')
	   const p4=API.all('/commande/all');
	   Promise.all([p1,p2,p3,p4]).then(value=>{
            
			value[0] && dispatch({type:'description site',description_site:value[0][0]})
			value[1] && dispatch({type:'count user',count:value[1].length})
			value[2] && dispatch({type:'count post',count:value[2].length})
			value[3] && dispatch({type:'count commande',count:value[3].length}) 
	   })

	   },[])
	   
	 useEffect(()=>{
		 setSuccess(true)
		initDescriptionSite()
		return setSuccess(false)
	 },[success]);
	 
	  return <footer className='footer bg_all'>
	           <div className='btn_top' onClick={()=>top()}><i className="fas fa-arrow-circle-up"></i></div>
	            <p>Copyright  <span dangerouslySetInnerHTML={{ "__html": "&copy;" }} /> 
	                 2021 Dav-fast-food tous droits réservés.<br/>
	                 <a href="condition"> Termes et conditions</a>
	            </p>
	         </footer>
}
export default FooterPage;