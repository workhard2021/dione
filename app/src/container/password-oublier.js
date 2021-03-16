import React,{useState} from 'react';
import './css/formulaire.css';
import Loader from './loader';

import * as API from '../API/api';
import { Link,useHistory} from 'react-router-dom';

const ForgetPassword=(props)=>{
	const [message,setMessage]=useState('')	
	const [valide,setValide]=useState({});
	const [succes,setsucces]=useState(false);
	const [loader,setLoader]=useState(false)

	const history=new useHistory()
	const url='/user/password-forget';
	
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

	 const send= (event)=>{
		event.preventDefault()
		 setMessage('')
		 setLoader(true)

		API.connexion(JSON.stringify(valide),url).then(res=>{
			if(res.status===200){
				setValide({});
				 setMessage(''); 
				 alert(res.data)
				 history.push('/password-forget-connect/'+res.data)
			}else if(res.status===201){
				 setMessage(res.data);
				 setsucces(false);
			}
			setLoader(false)

	  })
	   
	 }

	 if(succes===false) { 
	    return <div className='formulaire'>
				{loader&& <Loader/>}
	          	<form   onSubmit={(e)=>send(e)} >
				    <div className='btn_home_formulaire' onClick={()=>scrollInit()}><i className="fas fa-arrow-left"></i></div>
	          	     <h3> Entrez votre email</h3>
				     { message !=='' && <p className='inValide'> {message}</p>}
	          	     <div className='item'>
	          	        <input type="email" name="email" value={valide.email || ''}  placeholder='Votre addresse email' id="email" onChange={(e)=>saisir(e)}/>
	          	     </div>
	          	     <div className='item btn'>
	          	       <button>Envoyer</button>
	          	     </div>
	          	</form>
	    </div>
	 }else {
		  return  <div className='empty pwd-oublier'>
			       <Link to='/'>Page d'accueil</Link>
                   <p>{message}</p> 
		  </div>
	 }
}
export default ForgetPassword