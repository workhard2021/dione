import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom'
import * as API from '../API/api';
import Panel from './panel';
import {scrollPage} from '../autre/autre';
import './css/logo.css'

const Logo=(props)=>{
       const {openToggle}=props.data;
	   const {user,dispatch,description_site}=props.user;
	   const [count,setCount]=useState({countCommande:0,countUser:0,countPost:0});

       const image=description_site.first_image? description_site.first_image :'/image/r1.jpg';
	   let shopping_count=localStorage.getItem('commande') !==null ? 
	   JSON.parse(localStorage.getItem('commande')).array.length
	   : [].length;
	 const [openPanel,SetopenPanel]=useState(false);
	 const [success,setSuccess]=useState(false);

	 const toggle=()=>{
		dispatch({type:'open toggle',openToggle:!openToggle})
		scrollPage()
     }

	  const init=()=>{
	  const p1=API.all('/description-site/all')
	  const p2=API.all('/user/all')
	  const p3=API.all('/post/all')
	  const p4=API.all('/commande/all');
	   Promise.all([p1,p2,p3,p4]).then(value=>{
		   value[0] && dispatch({type:'description site',description_site:value[0][0]})
		   let countUser= value[1]? value[1].length:0;
		   let countPost= value[2]? value[2].length:0;
		   let countCommande= value[3]? value[3].length:0;
		   setCount((state)=>{return{...state,countUser,countPost,countCommande} })
	    })
	   }
	  
	useEffect(()=>{
		setSuccess(true)
	   init()
	   return setSuccess(false)
	},[openPanel]);
	if(success){
		return null
	}	
	return <section className='section'>
	           <Link id='panier' to='/shopping' onClick={()=>scrollPage()}>
			                <i className="fas fa-shopping-cart">
			                </i> <span>{shopping_count}</span>
			  </Link>
			  <div className='shooping_store '>
			      
		           {user !==null && user.role==='admin' &&
		             <span id='panel-admin' onClick={()=>SetopenPanel(!openPanel)}>Panel Admin</span>
		            }
			  </div>
			  <Panel openPanel={openPanel} countPost={count.countPost} countUser={count.countUser} countCommande={count.countCommande}/>
	          <div className='logo bg_all'>
	             <div className='dot'>
	               <h3>{description_site.first_title?description_site.first_title : 'Fast food'}</h3>
	               <h4>{description_site.second_title?description_site.second_title :'Welcome to David Restaurant'}</h4>
	               <div className='btn'><span onClick={()=>toggle()}>Cliquez ici</span></div>
	             </div>

	             <div className='dot'>
	                <div className='image'>
	                 <img src={image}  alt='images'/>
	                </div>
	             </div>
	          </div>
	        </section>
}

export default Logo