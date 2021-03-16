import React,{useState} from 'react';
import {Link,useHistory} from 'react-router-dom';
import {scrollPage} from '../autre/autre';
import Loader from './loader';
import * as API from '../API/api' ;
import './css/formulaire.css';
const Login=(props)=>{
	     const imageLoader='/image/pay.gif';
	     const history=useHistory();
	     const {dispatch,user}=props.data;
		 const [message,setMessage]=useState('')
		 const [valide,setValide]=useState({});
		 const [loader,setLoader]=useState(false)
		 const url='/user/connexion';

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
	          	     <h3>Se connecter</h3>
	          	     <div className='btn_home_formulaire' onClick={()=>scrollInit()}><i className="fas fa-arrow-left"></i></div>
	          	     {message!=='' && <p className='message_form'> {message}</p>}
					   <div className='item'>
	          	        <label htmlFor="email">Email:</label>
	          	        <input type="email" name="email" id="email" value={valide.email || ''} onChange={(e)=>saisir(e)} />
	          	      </div>

	          	     <div className='item'>
	          	        <label htmlFor="password">Mot de passe :</label>
	          	        <input type="password" name="password" id="password" value={valide.password || ''} onChange={(e)=>saisir(e)} />
	          	      </div>
	          	      <div className='item btn'>
	          	        <button>Connexion</button>
	          	        <div className='password-oublier'>
	          	          <Link id='other_send' to='/password-oublier' onClick={()=>scrollPage()}>Mot de passe oublié</Link>
	          	       </div>
	          	     </div>

	          	</form>
	    </div>
	}else{
		  setTimeout(function() {
		  	   history.push('/')
			   window.scrollTo(0,0)
		  }, 200);
		 return null
	}
}
export default Login