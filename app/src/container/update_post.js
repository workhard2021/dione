import React,{useState,useRef,useEffect,useCallback} from 'react';
import {useHistory,useParams} from 'react-router-dom';
import Loader from './loader';

import * as API from '../API/api';
import {Verifier,getCircularReplacer} from '../autre/autre';

import './css/formulaire.css';
const UpdatePost=(props)=>{
	  const [valide,setValide]=useState({});
	  const [inValide,setInvalide]=useState({send:true});
	  const [message,setMessage]=useState('')
	  const [image,setImage]=useState('')
	  const fileInput=useRef(null)
	  const history=useHistory();
	  const {id}=useParams();
	  const urlfind=`/post/find/${id}`;
	  const urlupdate=`/post/update/`;
	  const [loader,setLoader]=useState(false)


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

const update=useCallback( (e)=>{
	e.preventDefault()
	setInvalide({});
	setMessage();

  const date=Date.now()

const test=Verifier(valide,['title','categorie','comment']);
setInvalide(test);

if(test.verifier){ 

 const data =new FormData();
 
 data.append('image',valide.image);
  const newValide={...valide,image:valide.oldImage,price:Number(valide.price)};
   delete newValide.image;
 data.append('data',JSON.stringify(newValide, getCircularReplacer()))
 if(Number(valide.price)>0)  { 
    setLoader(true)
  API.create(data,urlupdate).then(res=>{
	 if(res.status===200){
		 setMessage(res.data)
		 //REST
		 setImage('')
		
		setInvalide({})
	}else if(res.status===201){
		 setMessage(res.data);
	}else {
		history.push('page');
		window.scrollTo(0,0)
	}
	  setLoader(false)
	});

 }else{
	setInvalide((state)=>{return {...inValide,price:'le prix doit être un nombre positif' }});

  }
}

},[valide,inValide])

    const init=useCallback ( ()=>{ 
		API.findOne(urlfind).then(res=> {
			  
			  setValide({...res,oldImage:res.image})
		})
	},[id])
	const scrollInit=()=>{
		history.goBack('/')
		
	}

		
      useEffect(()=>{
		  init()
	  },[])
    
	 return <div className='formulaire'>   
	
	  {loader&& <Loader/>}
	  <form onSubmit={(e)=>update(e)}>
		   <div className='btn_home_formulaire' onClick={()=>scrollInit()}><i className="fas fa-window-close"></i></div>
		   <h3>Modifier article</h3>
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
			<span className="inValide">{!inValide.verifier===true && inValide.title}</span>
			  <input type="text"  name="title"  placeholder='Titre' id="title" value={valide.title || ''} onChange={(e)=>saisir(e)}/>
		   </div>
			<div className='item'>
			  <label htmlFor="price">Prix :</label>
			  <span className="inValide">{inValide.price && inValide.price}</span>
			  <input type="text" name="price"  placeholder='Prix' id="price" value={valide.price || ''} onChange={(e)=>saisir(e)}/>
		   </div>
		   <div className='item'>
			<label htmlFor='image' id='image_label'>Chosir image</label>
			 <span className='message_image'>{image}</span>
			 <input type='file'  ref={fileInput} name='image' id='image' onChange={(e)=>saisir(e)}/>
		   </div>
			<div className='item'>
			  <label htmlFor="comment">Comment :</label>
			  <span className="inValide">{inValide.comment && inValide.comment}</span>
			  <textarea name="comment" placeholder='Commantaire' id="comment" rows='5' value={valide.comment || ''} onChange={(e)=>saisir(e)} ></textarea>
		   </div>
		   <div className='item btn'>
			 <button>Modifier</button>
		   </div>

	  </form>
</div>
}
export default UpdatePost