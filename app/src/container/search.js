import React,{useCallback,useEffect,useState} from 'react';
import './css/search.css';
import {Link,useHistory} from 'react-router-dom'
import {scrollPage} from '../autre/autre'

import * as API from '../API/api';
const Search=(props)=>{
	
	const [message,setMessage]=useState('')
	const [valide,setValide]=useState('')
	const [array,setArray]=useState([])
	const history=useHistory();
	const [success,setSuccess]=useState(false);


	const search= useCallback( (e)=>{
		   e.preventDefault()
		   const value=e.target.value;
		   API.search('/post/search/'+value).then(res=>{
			   if(res.length>0){
				  setArray(()=>{return res});
				  setMessage('')
				  setValide(value)
				  setSuccess(true)
			   }else{

				   setMessage('Aucun resultat trouvé');
				   setArray(()=>{return res});
				   setTimeout(() => {
					   setMessage('')
				     },4000);
					 setSuccess(true)
				}
		   })
	},[message,array])

	const send=(x,e)=>{
			   e.preventDefault();
			   history.push('/search/'+x)  
			   setArray([]);
			   setValide('');	
			   scrollPage()
	}

	const send_form=useCallback( (e)=>{
		e.preventDefault();

		if(success===true && valide!==''){
			history.push('/search/'+valide)  
			setArray([]);	
			scrollPage()	
		}else  {  
			
			setMessage('Aucun resultat trouvé');
			const clear= setTimeout(() => {
				setMessage('')
			  },4000);
			 setArray([]);
		}
	},[valide])


	
	 
	const afficherResultat=()=>{
	   	      const resultat= array.length>0 ?
	   	      array.map((value,index)=>{
	   	    		  return <li key={index}>
	   	    		              <Link to={`/search/${value.title}`} onClick={(e)=>send(value.title,e)}>{value.title}</Link>
	   	    		         </li>
	   	    		  })
	   	           :
	   	    	   message!=='' && <div className='messageSearch'>{message}</div>
	   	    return resultat;
	   }

	  return <div className='search'>
			            <form onSubmit={(e)=>send_form(e)}  className='item_search'>
				          <input type='text' name='search' id='search'  placeholder='Recherche' onChange={(e)=>search(e)}/>
				          <button><i className="far fa-search"></i></button>
			            </form>
			           <ul className='resultat'>
			             { afficherResultat()}
			           </ul>
			  </div>
}
export default Search;