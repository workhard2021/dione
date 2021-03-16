import React,{useState,useRef,useCallback} from 'react';
import {useHistory} from 'react-router-dom';
import Loader from './loader';

import * as API from '../API/api';
import './css/formulaire.css';
import {Verifier } from '../autre/autre';


const CreatePost=(props)=>{
	    
	  const history=useHistory();
	  const [message,setMessage]=useState('')
	  const [image,setImage]=useState('')
	  const fileInput=useRef(null);
	  const url='/post/create';
	  const [valide,setValide]=useState({});
	  const [inValide,setInvalide]=useState({send:true});
	  const [loader,setLoader]=useState(false)


	  const {dispatch,array}=props.data;
	  const saisir=(e)=>{
	  	         e.preventDefault()
	  	         const name=e.target.name;
	  	         let value=e.target.value;
	  	         if(name==='image'){
                    value=e.target.files[0];
                    setImage(e.target.files[0].name)
				 }
					
					setValide((state)=>{return {...state,[name]:value}});
	  }

	  const scrollInit=()=>{
		history.push('/')
		window.scrollTo(0,0)
	  }
	  
	  const send= useCallback(  (e)=>{
	  	 e.preventDefault()
	  	 
         const date=Date.now()
         let image='';

         if(valide.image!==undefined){
         	  image=`/image/${valide.image.name}`
         }else{
         	  image=null;
         }

	  const test=Verifier(valide,['title','categorie','price','comment']);
	  setInvalide(test);
	  if(test.verifier){ 

	    const data =new FormData();
		data.append('image',valide.image);
		 delete valide.image;
		 const newValide={...valide,price:Number(valide.price)}
		data.append('data',JSON.stringify(newValide))
	    if(Number(valide.price)>=0) { 
			setLoader(true)
		 API.create(data,url).then(res=>{
			if(res.status===200){
				setMessage(res.data)
				//REST
				dispatch({type:'count post',count:array.length+1})
			    setImage('')
			   fileInput.current.value=null;
			   setValide({});
			   setInvalide({})

           }else if(res.status===201){
                setMessage(res.data);
		   }else {
			    setMessage("une error est survenue lors de l'operation");
		   }
		   setLoader(false)

		   
		 });

		}else {
			  setInvalide((state)=>{return {...inValide,price:'le prix doit être un nombre positif' }});
		}
	  }

	  },[valide,inValide])
	  
	    return <div className='formulaire'>
	            {loader&& <Loader/>}
	          	<form onSubmit={(e)=>send(e)}>
	          	     <div className='btn_home_formulaire' onClick={()=>scrollInit('/')}><i className="fas fa-window-close"></i></div>
	          	     <h3>Créer post</h3>
	          	     {message !=='' && <p className='success'>{message}</p>}
	          	     <div className='item'>
	          	        <label htmlFor="categorie">Categorie:</label>
						 <span className="inValide">{inValide.categorie && inValide.categorie}</span>

						<input list="categories" name="categorie" id="categorie" value={valide.categorie || ''}  onChange={(e)=>saisir(e)}/>
						<datalist id="categories">
						  <option value="salade"/>
						  <option value="thièpe"/>
						  <option value="tacos"/>
						  <option value="chawarmah"/>
						  <option value="viande"/>
						</datalist>

	          	     </div>
	          	     <div className='item'>
	          	        <label htmlFor="title">Titre :</label>
						<span className="inValide">{inValide.title && inValide.title}</span>
	          	        <input type="text" name="title" id="title" value={valide.title || ''} onChange={(e)=>saisir(e)}/>
	          	     </div>
	          	      <div className='item'>
	          	        <label htmlFor="price">Prix :</label>
						  <span className="inValide">{inValide.price && inValide.price}</span>
	          	        <input type="text" name="price" id="price" value={valide.price || ''} onChange={(e)=>saisir(e)}/>
	          	     </div>
	          	     <div className='item'>
	          	      <label htmlFor='image' id='image_label'>Chosir image</label>
	          	       <span className='message_image'>{image}</span>
	          	       <input type='file'  ref={fileInput} name='image' id='image' onChange={(e)=>saisir(e)}/>
	          	     </div>
	          	      <div className='item'>
	          	        <label htmlFor="comment">Comment :</label>
						  <span className="inValide">{inValide.comment && inValide.comment}</span>
	          	        <textarea name="comment" id="comment" rows='5' value={valide.comment || ''} onChange={(e)=>saisir(e)} ></textarea>
	          	     </div>
	          	     <div className='item btn'>
	          	       <button>Poster</button>
	          	     </div>

	          	</form>
	    </div>
}
export default CreatePost