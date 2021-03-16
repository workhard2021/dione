import React,{useState} from 'react';
import {useHistory,useParams} from 'react-router-dom';
import Loader from './loader';

import * as API from '../API/api' ;
import './css/formulaire.css';
const ConnectionPasswordForget=(props)=>{
         const history=useHistory();
         const {secret}=useParams();
	     const {dispatch,user}=props.data;
		 const [message,setMessage]=useState('')
		 const [valide,setValide]=useState({secret:secret});
		 const [loader,setLoader]=useState(false);

		 const url='/user/password-forget-connect/';

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
	     
	     const login= (event)=>{
				 event.preventDefault()
				 setMessage('')
				 setLoader(true)

			     API.connexion(JSON.stringify(valide),url).then(res=>{
				     if(res.status===200){
				           delete res.data.password;
						 dispatch({type:'connexon',user:res.data})
						 setValide({})
						 setMessage('')  
					 }else if(res.status===201){
                          setMessage(res.data);
					 }
					 setLoader(false)

			   }) 
         }
        if(user===null) { 
       	 return <div className='formulaire'>
	             {loader&& <Loader/>}
	          	<form  onSubmit={(e)=>login(e)}>
	          	     <div className='btn_home_formulaire' onClick={()=>scrollInit('/')}><i class="far fa-times-circle"></i></div>
                     <p className='success'>Entrez votre email et nouveaux nouveau mot de passe</p>
	          	     {message!=='' && <p className='inValide'> {message}</p>}
					   <div className='item'>
	          	        <label htmlFor="email">Email:</label>
	          	        <input type="email" name="email"  placeholder='Votre addresse email' id="email" value={valide.email || ''} onChange={(e)=>saisir(e)} />
	          	      </div>

	          	     <div className='item'>
	          	        <label htmlFor="password">Mot de passe :</label>
	          	        <input type="password" name="password"  placeholder='Saisir un nouveau mot de passe' id="password" value={valide.password || ''} onChange={(e)=>saisir(e)} />
	          	      </div>
	          	      <div className='item btn'>
	          	        <button>Connexion</button>
	          	     </div>

	          	</form>
	    </div>
	}else{
		  setTimeout(function() {
		  	   history.push('/')
		  }, 200);
		 return null
	}
}
export default ConnectionPasswordForget