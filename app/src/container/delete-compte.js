import React,{useState} from 'react';
import './css/formulaire.css';
import Loader from './loader';

import * as API from '../API/api';
import {useHistory} from 'react-router-dom';

const DeleteCompte=(props)=>{
	const [message,setMessage]=useState('')	
	const [valide,setValide]=useState({});
	const history=new useHistory()
	const url='/user/delete-compte';
	const [loader,setLoader]=useState(false)

	
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
		setLoader(true)
		API.connexion(JSON.stringify(valide),url).then(res=>{
			if(res.status===200){
				 setValide({});
				 setMessage(); 
                 localStorage.removeItem('user')
                 history.push('/delete-compte-success/'+res.data)
			}else if(res.status===201){
				 setMessage(res.data);
			}
			setLoader(false)

	  })

	 }
     
	    return <div className='formulaire'>
			    {loader&& <Loader/>}
	          	<form   onSubmit={(e)=>send(e)} >
				    <div className='btn_home_formulaire' onClick={()=>scrollInit()}><i className="fas fa-arrow-left"></i></div>
	          	     <p> Entrez les informations suivantes</p>
				     { message !=='' && <p className='inValide'> {message}</p>}
	          	     <div className='item'>
	          	        <input type="email" name="email" value={valide.email || ''} placeholder='Votre addresse email' id="email" onChange={(e)=>saisir(e)}/>
	          	     </div>
                       <div className='item'>
	          	        <input type="password" name="password" value={valide.password || ''} placeholder='Votre mot de passe' id="password" onChange={(e)=>saisir(e)}/>
	          	     </div>
	          	     <div className='item btn'>
	          	       <button>Supprimer compte</button>
	          	     </div>
	          	</form>
	    </div>
    
}
export default DeleteCompte