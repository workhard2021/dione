import React,{useState} from 'react';
import {useHistory,Link} from 'react-router-dom';
import Loader from './loader';

import * as API from '../API/api';
import {Verifier,scrollPage} from '../autre/autre';

import './css/formulaire.css';
const Sign=(props)=>{

	     const history=useHistory();
		 const [valide,setValide]=useState({})
		 const [inValide,setInvalide]=useState({});
		 const [message,setMessage]=useState('');
		 const [loader,setLoader]=useState(false)

		 const url='/user/create'
         const saisir=(e)=>{
	  	         e.preventDefault()
	  	         const name=e.target.name;
				 let value=e.target.value;
				 setValide((state)=>{return {...state,[name]:value}})	
			
		 }
		 const scrollInit=()=>{
			history.push('/')
			window.scrollTo(0,0)
		}
		 
	     const send=(event)=>{
			  
				 event.preventDefault()
				 setMessage('')
				 const test=Verifier(valide,['fullName','password','email'])
				
				 if(test.verifier) { 
					setLoader(true)
					API.create(JSON.stringify(valide),url).then(res=>{
						 if(res.status===200){
							setMessage(res.data);
							setInvalide({})
							setValide({})
						 }else if(res.status===201){
							  setMessage(res.data)
							  setInvalide({})
						 }
						 setLoader(false)
					})
					
				 }else{
					setInvalide(test); 
				 }
	     }
	     
	    return <div className='formulaire'>
	             {loader&& <Loader/>}
	          	<form onSubmit={(e)=>send(e)}>
	          	   <div className='btn_home_formulaire' onClick={()=>scrollInit()}><i className="fas fa-arrow-left"></i></div>
	          	     <h3> S'inscrire</h3>
	          	     {message!=='' && <p className='message_form'> {message}</p>}
	          	     <div className='item'>
	          	       <label htmlFor="fullName">Nom complet :</label>
		                <span className="inValide">{inValide.fullName && inValide.fullName }</span>
	          	        <input type="text" name="fullName" value={valide.fullName || ''} id="fullName" onChange={(e)=>saisir(e)}/>
	          	     </div>
	          	     <div className='item'>
	          	        <label htmlFor="email">Email :</label>
						 <span className="inValide">{inValide.email && inValide.email }</span>
	          	        <input type="email" name="email" value={valide.email || ''} id="email" onChange={(e)=>saisir(e)}/>
	          	     </div>
	          	      <div className='item'>
	          	        <label htmlFor="password">Mot de passe :</label>
						 <span className="inValide">{inValide.password && inValide.password }</span>
	          	        <input type="password" name="password" value={valide.password || ''} id="password" onChange={(e)=>saisir(e)}/>
	          	     </div>

	          	     <div className='item btn'>
	          	       <button>S'inscrire</button>
						 <div className='password-oublier'>
	          	          <Link id='other_send' to='/login' onClick={()=>scrollPage()}>Se connecter</Link>
	          	       </div>
	          	     </div>

	          	</form>
	    </div>
}
export default Sign