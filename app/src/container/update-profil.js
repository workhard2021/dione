import React,{useState,useRef,useEffect} from 'react';
import {useHistory,useParams} from 'react-router-dom';
import Loader from './loader';

import * as API from '../API/api';
import {Verifier,phoneNumber,getCircularReplacer} from '../autre/autre';
import './css/formulaire.css';

const UpdateProfil=(props)=>{ 
        
		 const history=useHistory();
		 const {id}=useParams();
		 const [valide,setValide]=useState({})
		 const {dispatch}=props.data;
		 const [inValide,setInvalide]=useState({});
		 const [message,setMessage]=useState('');
		 const [success,setSuccess]=useState(false)
		 const url='/user/update';
		 const [image,setImage]=useState('');
		 const fileInput=useRef(null)
		 const [color,setColor]=useState(false);
		 const [loader,setLoader]=useState(false)

		 const placeholder='Numero de telephone: XX XX XX XX XX';


         const saisir=(e)=>{
	  	         e.preventDefault()
	  	         const name=e.target.name;
	  	         let value=e.target.value;
	  	         if(name==='image'){
                    value=e.target.files[0];
					setImage(e.target.files[0].name)
				 }
				 setValide((state)=>{return {...state,[name]:value}})	
		 }

	     const update=(event)=>{
			  
				 event.preventDefault()
				 const test=Verifier(valide,['fullName','email'])
				 setMessage('');
				 
				 if(test.verifier) { 
					 const data=new FormData();
					 if(valide.image){
						  data.append('image',valide.image);
					 }
				 data.append('data',JSON.stringify(valide, getCircularReplacer()));
				if(phoneNumber(valide.tel)){ 
					setLoader(true)
					API.create(data,url).then(res=>{
						 if(res.status===200){
							setMessage(res.data);
							setInvalide({});
							setImage('');
							delete valide.image;
							fileInput.current.value=null;
							setSuccess(!success)
							 setColor(true)
						 }else if(res.status===201){
							  setMessage(res.data)
							  setInvalide({})
							  setColor(false)
						 }
						 setLoader(false)


					})

				   }else{
					setInvalide(state=>{return { ...state,tel:placeholder}})
				} 
					
				 }else{
					setInvalide(test); 
				 }
		 }
		 const init=()=>{
			 API.findOne(`/user/find${id}`).then(res=>{
					      delete res.password;
						  const a={...res,oldImage:res.image};
						 setValide(res);
						 dispatch({type:'update user',user:a})
			 })
		 }
		 const scrollInit=()=>{
			history.push('/')
			window.scrollTo(0,0)
		}
	
	     useEffect(()=>{
			 setSuccess(true);
			 init()
			return ()=> setSuccess(false);
		 },[success])

		 if(!success){
			  return null;
		 }
		 
	    return <div className='formulaire'>
	            {loader&& <Loader/>}
	          	<form onSubmit={(e)=>update(e)}>
	          	   <div className='btn_home_formulaire' onClick={()=>scrollInit()}><i className="far fa-times-circle"></i></div>
	          	     <h3> Modifier votre info</h3>
	          	    {message!=='' && <p className={color?'success' : 'inValide'}> {message}</p>}
	          	     <div className='item'>
	          	       <label htmlFor="fullName">Nom complet :</label>
		                <span className="inValide">{inValide.fullName && inValide.fullName }</span>
	          	        <input type="text" name="fullName"  placeholder='Nom complet' value={valide.fullName || ''} id="fullName" onChange={(e)=>saisir(e)}/>
	          	     </div>
	          	     <div className='item'>
	          	        <label htmlFor="email">Email :</label>
						 <span className="inValide">{inValide.email && inValide.email }</span>
	          	        <input type="email" name="email"  placeholder='Address email' value={valide.email || ''} id="email" onChange={(e)=>saisir(e)}/>
	          	     </div>
					   <div className='item'>
	          	        <label htmlFor="tel">Numero de tel:</label>
						 <span className="inValide">{inValide.tel && inValide.tel }</span>
	          	        <input type="tel" name="tel"   value={valide.tel || ''} id="tel" placeholder={placeholder} onChange={(e)=>saisir(e)}/>
	          	     </div>
		
	          	      <div className='item'>
	          	        <label htmlFor="password">Nouveau mot de passe :</label>
						 <span className="inValide">{inValide.password && inValide.password }</span>
	          	        <input type="password" name="password"  placeholder='Nouveau mot de passe' value={valide.password || ''} id="password" onChange={(e)=>saisir(e)}/>
	          	     </div>
					<div className='item'>
	          	        <label htmlFor="oldpassword">Ancien mot de passe :</label>
						<span className="inValide">{inValide.oldPassword && inValide.oldPassword }</span>
	          	        <input type="password" name="oldPassword"  placeholder='Ancien mot de passe' value={valide.oldPassword || ''} id="oldpassword" onChange={(e)=>saisir(e)}/>
	          	     </div>
					<div className='item'>
			         <label htmlFor='image' id='image_label'>Chosir image</label>
			          <span className='message_image'>{image}</span>
			          <input type='file'  ref={fileInput} name='image' id='image' onChange={(e)=>saisir(e)}/>
		            </div>
	          	     <div className='item btn'>
	          	       <button>Modifier</button>
	          	     </div>

	          	</form>
	    </div>
}
export default UpdateProfil