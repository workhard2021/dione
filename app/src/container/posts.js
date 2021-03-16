import React,{useState,useEffect} from 'react';
import {Link,useHistory} from 'react-router-dom';
import * as API from '../API/api';
import './css/shopping.css';
import SearchAdmin from './search_admin';
const Posts=(props)=>{

	const history=useHistory();
	const url='/post/delete';
	const urlAll='/post/delete-all';
	const urlPost='/post/all';
	const url_search='/post/search/';

	const [array,setArray]=useState([]);
	const [success,setSuccess]=useState(false)	
	const [message,setMessage]=useState('');
	const [count,setCount]=useState(0);

    const deleteAll=(all=true)=>{
    	    const msg='êtez vous sûr de tout supprimer car cette action est irreversible';
    	   if(window.confirm(msg)){ 
			API.deleteAll(urlAll).then(res=>{
				if(res.status===200){
					 setMessage(res.data);
					 setSuccess(!success)
				 }
		     })
		   }
	}
     
    const deleteOne=(value)=>{
	    	  API.delete_(`${url}/${value.id}`).then(res=>{
				   if(res.status===200){
						setMessage(res.data);
						setSuccess(!success)
				    }
			  })
	 };
	 
	  const init=()=>{
		   API.all(urlPost).then(res=>{
		    	setCount(res.length)
		    	const a=res.slice(0,20)
		    	setArray(a)
		   })
	  }
	  const initSearch=(x)=>{
		     setSuccess(!success)   
	  }

	  const setSearch=(x)=>{
			 setArray(x);
	   }
	   const scrollInit=()=>{
		history.push('/')
		window.scrollTo(0,0)
	    }
	  
	 
	 useEffect(()=>{
		setSuccess(true)
		init()  
		setSuccess(false) 
	 },[success]);

	 return<div className='shopping'>
	  	      <SearchAdmin setInit={initSearch} url={url_search} setSearch={setSearch}/>
	  	      <div className='btn_home' onClick={()=>scrollInit()}><i className="fas fa-arrow-left"></i></div>
	          {message !=='' && <p className='message'>{message}</p>}
	          <h3>Liste des articles postés : {count && array.length}/{count}</h3>

	            <table className='commun'>
					    <thead>
					        <tr>
								<th>N°</th>
					            <th>POST</th>
					            <th>PRIX</th>
					            <th>MODIFIER</th>
					            <th>SUPPRIMER</th>
					        </tr>
					    </thead>
					    <tbody>
					        { array && array.map((value,index)=>{
					          	  return <tr key={index}>
										    <td  className='item'>{index+1}</td>
								            <td className='item'>{value.title}</td>
								            <td className='item'>{value.price} dhs</td>
								            <td><span><Link to={`/update-post/${value.id}`}>Modifier</Link></span></td>
								            <td onClick={()=>deleteOne(value)}>Supprimer </td>
						                 </tr>
					          })
					        }
					      {1===0 ? <tr>
					       <td colSpan='5' onClick={()=>deleteAll()}>Supprimer tout</td>
						  </tr>:
						  <tr><td colSpan='5'></td></tr>
						  }
					    </tbody>
				</table>
	         </div>
}

export default Posts;