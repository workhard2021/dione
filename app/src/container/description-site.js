import React,{useState,useRef,useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import Loader from './loader';

import {getCircularReplacer,phoneNumber} from '../autre/autre';
import * as API from '../API/api';
import './css/formulaire.css';


const DescriptionSite=(props)=>{
	 /*const data={
            email:"",
            first_title:"",
            second_title:"",
            first_image:"",
            second_image:"",
            tel:"",
            facebook:"",
            instagram:"",
            apropos:"",
            livraison:"",
            contact:"",
            fast_food:"",
            preparation:"",
      }*/
	  const history=useHistory();
	  const {dispatch,user}=props.data;
	  const [valide,setValide]=useState({});
	  const [inValide,setInvalide]=useState({});
	  const [message,setMessage]=useState('')
	  const [image,setImage]=useState('')
	  const fileInput=useRef(null)
	  const [succes,setSucces]=useState(false);
	  const [error,setError]=useState('');
	  const [loader,setLoader]=useState(false)

      const description={fast_food:"fast_food",livraison:"livraison",contact:'contact',apropos:"apropos",preparation:"preparation"};
	  const placeholder='Numero de telephone au format : XX XX XX XX XX';

	  const saisir=(e)=>{
	  	           e.preventDefault()
				   let name=e.target.name;
				   let value=e.target.value;
				   switch(name){
					    case 'contact':
						  setValide((state)=>{return {...state,[name]:value}});
						   break;
						case  'preparation':
							setValide((state)=>{return {...state,[name]:value}});
							break;
						case 'apropos':
							 
							setValide((state)=>{return {...state,[name]:value}});
							break;
				     	case  'fast_food':
							
							setValide((state)=>{return {...state,[name]:value}});
							break;
						case  'livraison':
							setValide((state)=>{return {...state,[name]:value}});
							break;
						case  'first_title':
							   setValide((state)=>{return {...state,[name]:value}});
							   break;
						case  'second_title':
							   setValide((state)=>{return {...state,[name]:value}});
							   break;
					    case  'facebook':
							   setValide((state)=>{return {...state,[name]:value}});
							   break;
						case  'instagram':
				               setValide((state)=>{return {...state,[name]:value}});
							   break;

						case  'image':
					           setImage(e.target.files.length+' selected')
				               setValide((state)=>{return {...state,[name]:e.target.files}});
							   break;
					    case 'tel':
							setValide((state)=>{return {...state,[name]:value}});
							break;
						
						case 'email':
								setValide((state)=>{return {...state,[name]:value}});
						break;
							 
						default :
						setValide((state)=>{return {...state,[name]:value} }) ;
				    }		
	  }    
	      
	  const send=(e)=>{
		   e.preventDefault()	
		   setMessage('')
		    
	      if(phoneNumber(valide.tel) ) { 
			 const form_data=new FormData();
		    if(valide.image){
				 if(valide.image.length>2){
					   setMessage('Vous ne pouvez pas envoyer plus de 2 images')
					   return false;
				 }else{
					Array.from(valide.image).map(value=>{
						form_data.append(`image`,value); 
					})
				 }
			}	  
			delete valide.image;
			form_data.append('data',JSON.stringify(valide,getCircularReplacer() ) );
			setLoader(true)
			API.create(form_data,'/description-site/update').then(res=>{
				 if(res.status===200){
					 setMessage(res.data)
					 setImage('');
					 setSucces(!succes);
					 setError('')
					 setInvalide({})
				 }else if(res.status===201){
					  setMessage(res.data);
					  setError('')
				 }else{
				    setError('Veuillez actualiser la page')
				}
				setLoader(false)

			})
		 }else{
				setInvalide(state=>{return { ...state,tel:placeholder}})
				setMessage('')
		 }
	  }
      const scrollInit=()=>{
		history.push('/')
		window.scrollTo(0,0)
	  }

	  const init=()=>{
		API.all('/description-site/all').then(res=>{
			 if(res){
				setValide(res[0])
				dispatch({type:'description site',description_site:res[0]})
			 }else{
				  setValide({})
			 }
		})
   }

   useEffect(()=>{
	   setSucces(true)
	   init()
	   return setSucces(false)
   },[succes])

	 if(succes){
		 return null;
	 }
	 
	 if(user) {

		 if(user.role==='admin') { 

	  return <div className='formulaire' id='description_site'>
	            {loader&& <Loader/>}
	          	<form onSubmit={(e)=>send(e)}>
	          	     <div className='btn_home_formulaire' onClick={()=>scrollInit()}><i className="fas fa-window-close"></i></div>
	          	     <h3>Update descritption site </h3>
	          	     {message !=='' && <p className='success'>{message}</p>}
	          	     {error !=='' && <p className='inValide'>{error}</p>}
					<div className='item item_site'>
	          	        <label htmlFor="email">Email:</label>
						<span className="inValide">{inValide.email && inValide.email }</span>
	          	        <input type="email" name="email" id="email" placeholder='Address email' value={valide.email || ''} onChange={(e)=>saisir(e)}/>
	          	   </div>
	          	   <div className='item item_site'>
	          	        <label htmlFor="tel">Telephone:</label>
						  <span className="inValide">{inValide.tel && inValide.tel }</span>
	          	        <input type="tel" name="tel" id="tel" placeholder={placeholder} value={valide.tel || ''} onChange={(e)=>saisir(e)}/>
	          	   </div>
					 
                   <div className='item item_site'>
	          	        <label htmlFor="choose_title">Choisir titre:</label>
						<select  name="title" id="choose_title" value={valide && valide.title}  onChange={(e)=>saisir(e)}>
						  <option  value='' desabled='true'>Choisir</option>
						  <option value="first_title">Titre 1</option>
						  <option value="second_title">Titre 2</option>
						</select>
	          	     </div>
                     { valide.title && 
                      <div className='item item_site'>
	          	        <input type="text" name={valide.title} id="reseau" value={valide[valide.title] || ''} onChange={(e)=>saisir(e)}/>
	          	      </div>
                     }
                    <div className='item item_site'>
	          	        <label htmlFor="choose_reseau">Choisir reseau:</label>
						<select  name="reseau" id="choose_reseau" value={valide && valide.reseau}  onChange={(e)=>saisir(e)}>
					      <option  value='' desabled='true'>Choisir</option>
						  <option value="facebook">facebook </option>
						  <option value="instagram">Instagram</option>
						</select>
	          	     </div>

                     { valide.reseau &&
                      <div className='item item_site'>
	          	        <input type="text" name={valide.reseau}  id="reseau" value={valide[valide.reseau] || ''} onChange={(e)=>saisir(e)}/>
	          	      </div>
                     }

	          	    <div className='item item_site'>
	          	      <label htmlFor='image' id='image_label'>Chosir image</label>
	          	      <span className='message_image'>{image}</span>
	          	      <input type='file'  ref={fileInput} name='image' id='image' onChange={(e)=>saisir(e)} multiple/>
	          	    </div>
                     
                    <div className='item item_site'>
	          	        <label htmlFor="description" >Description:</label>
						<select  name="description" id="description" value={valide.description}  onChange={(e)=>saisir(e)}>
						  <option  value='' desabled='true'>Choisir</option>
						  { Object.values(description).map((value,index)=>{
                             return <option key={index} value={value}>{value}</option>
                            })
                          }
						</select>
	          	     </div>
                     { valide.description &&
	          	      <div className='item item_site'>
	          	         <textarea name={valide.description}  rows='5' 
	          	                    value={valide[valide.description] || ''}
	          	         onChange={(e)=>saisir(e)} ></textarea>
	          	      </div>
                     }  
	          	     <div className='item btn'>
	          	       <button>Valider</button>
	          	     </div>

	          	</form>
	    </div>
		 }else { 
			setTimeout(() => {
				history.push('/')	
				}, 200);
			   return null
		     }
	}else{
		  setTimeout(() => {
		  history.push('/')
			  
		  }, 200);
		 return null
	}

}
export default DescriptionSite