import React,{useState} from 'react';
import {useHistory} from 'react-router-dom';
import {Verifier,phoneNumber,scrollPage} from '../autre/autre';
import CommandeSent from './commande-sent';
import Loader from './loader';

import * as API from '../API/api';
import './css/formulaire.css';

const CommandeAutheur=(props)=>{
	   const history=useHistory()
	   const url='/commande/create';
	   const user=localStorage.getItem('user') !==null ? JSON.parse(localStorage.getItem('user')):{};
	   const array=localStorage.getItem('commande') !==null ? JSON.parse(localStorage.getItem('commande')).array:[];

	   const [valide,setValide]=useState(user || {});
	   const [inValide,setInValide]=useState({});
	   const [message,setMessage]=useState('');
	   const [succes,setSucces]=useState(false);
	   const [loader,setLoader]=useState(false)

	   const placeholder='Numero de telephone : XX XX XX XX XX';

	    const saisir=(e)=>{
	  	         e.preventDefault()
	  	         const name=e.target.name;
				 let value=e.target.value;
	  	         setValide((state)=>{return {...state,[name]:value}})
		}
		
	    const send=(e)=>{
			 e.preventDefault();
			 setInValide({})
			 setMessage('');
			  const test=Verifier(valide,['address'])
			  const testNumber=phoneNumber(valide.tel);
			  

			  if(test.verifier){
				if(testNumber){
				const data={commande:array,author:valide}
				setLoader(true)
				API.create(JSON.stringify(data),url).then(res=>{
					 if(res.status===200){
						    localStorage.removeItem('commande')
							setTimeout(()=>{
								setMessage(res.data);
								setSucces(true);
								setLoader(false);
							},500)
						
	
					 }else if(res.status===201){
						 setTimeout(()=>{
							setMessage(res.data);
							setLoader(false);
					     },5000)
					 }else{
						  return false;
					 }

				 })

			   }else{
                   setInValide(state=>{return { ...state,tel:placeholder}})
			     }
			  }else{
				setInValide(test);
			  }
			  
			  scrollPage()
		}
		const scrollInit=()=>{
			history.push('/')
			window.scrollTo(0,0)
		}
		
	    if(!succes) {

                if(array.length==0){
					setTimeout(()=>{
						history.push('/')
					},4000)
			    }
			    return <div className='formulaire'>
						    {loader&& <Loader/>}
				          	<form onSubmit={(e)=>send(e)} >

								  {message===''?
				          	       <p>Veuillez renseigner ces champs </p>
		                            : <p className='inValide'> {message}</p>
		                           }
							      <div className='btn_home_formulaire' onClick={()=>scrollInit()}><i className="fas fa-arrow-left"></i></div>
				          	     <div className='item' >
				          	        <label htmlFor="address">Address :</label>
		                             <span className="inValide">{inValide.address && inValide.address}</span>
				          	        <input type="text" name="address" id="address" placeholder='exemple:Firdaous'  value={valide.address || ''}  onChange={(e)=>saisir(e)}/>
				          	     </div>
				          	     <div className='item'>
				          	        <label htmlFor="tel">Telephone :</label>
									 <span className="inValide">{inValide.tel && inValide.tel}</span>
				          	        <input type="tel" name="tel" id="tel" placeholder={placeholder} value={valide.tel || ''} onChange={(e)=>saisir(e)}/>
				          	     </div>
				          	     <div className='item btn'>
				          	       <button>Confirmer</button>
				          	     </div>

				          	</form>
			           </div>

	   }else{
		   return <CommandeSent  message={message}/>     
	  }

}

export default CommandeAutheur