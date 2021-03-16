import React ,{useState} from 'react';
import './css/search.css';
import * as API from '../API/api';
const SearchAdmin=(props)=>{
    
    const [success,setSuccess]=useState(false);
	const [message,setMessage]=useState('')
	const [valide,setValide]=useState('')
    const {setSearch,setInit,url}=props;

	const saisir=(e)=>{
		   e.preventDefault()
		   const value=e.target.value;
		   API.search(url+value).then(res=>{
			   if(res.length>0){
                  setSearch(res)
				  setMessage('')
			   }else{
                    setSuccess(!success)
                    setMessage('Aucun resultat trouvé');
                    setSearch([])  
               }
            })
            setValide(value)
    }
    
    
    const init=(e)=>{
        
          e.preventDefault();
          setInit(false)
          setValide('')
          setMessage('')
     }

	 
	  return <div className='search search_admin'>
		            
			            <form onSubmit={(e)=>init(e)}  className='item_search'>
				            <input type='text' name='search' id='search'  placeholder='Recherche' onChange={(e)=>saisir(e)}/>
				            <button id='fas-sync'><i className="fas fa-sync"></i></button>
			            </form>
                       {message!=='' && <div className='resultat'><p className="messageSearch">{message}</p></div>}
			  </div>
}
export default SearchAdmin;