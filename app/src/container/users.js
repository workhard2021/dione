import React,{useState,useEffect} from 'react';
import {Link,useHistory} from 'react-router-dom';
import * as API from '../API/api';
import './css/shopping.css';
import SearchAdmin from './search_admin';

const Users=(props)=>{
	 const history=useHistory();
	 const [array,setArray]=useState([]);
	 const [count,setCount]=useState(0);
	 const [message,setMessage]=useState('');
	 const {dispatch}=props.data;
	 const [success,setSuccess]=useState(false);

	 const urlAll='/user/all';
	 const url_search='/user/search/';

	 
     const deni=(id)=>{
		   API.deni(`/user/deni/${id}`).then(res=>{
			   if(res.status===200){
				   const {data,text}=res.data;
				   setMessage(text)
				   setArray(data)
			   }
		   })  
     }
	     
	const deniAll= (deni=true)=>{

	 	 
			API.deniAll(JSON.stringify({deni:deni}),`/user/deni-all`).then(res=>{
				if(res.status===200){
					const {data,text}=res.data;
					setMessage(text)
					setArray(data)
				}
			})
	 }

     const init=()=>{
		  API.all(urlAll).then(res=>{
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
		init();
	    return ()=>setSuccess(false)
	},[success])
	
     if(!success){
			 return null;
	 }
	 
	 return<div className='shopping' id='max_scroll'>
	  	      
			 <SearchAdmin setInit={initSearch} url={url_search} setSearch={setSearch}/>
	  	      <div className='btn_home' onClick={()=>scrollInit()}><i className="fas fa-arrow-left"></i></div>
	          {message !=='' && <p className='success'>{message}</p>}
	          <h3>Utilisateurs : {count && array.length}/{count}</h3>
	            <table className='commun'>
					    <thead>
					        <tr>
								<th>N°</th>
					            <th>Picture</th>
					            <th>Compte</th>
					            <th>Bloquer</th>
					        </tr>
					    </thead>
					    <tbody>
					        { array && array.map((value,index)=>{
					          	  return <tr key={index}>
										    <td id='firt_ligne'>{index+1}</td>
					          	            <td><Link to={`/profil/${value.id}`}><img src={value.image}  alt=""/></Link></td>
								            <td><Link to={`/profil/${value.id}`}>{value.fullName}</Link></td>
								            <td id={value.deni? 'ok':'non' } onClick={()=>deni(value.id)}>
								                     {value.deni ? 'Desactiver':'Activer'}
								            </td>
						                 </tr>
					          })
					      }
					     
						  {array && array.findIndex((value,index)=>index===5)===5 ? <tr>
					        <td colSpan='5' id={!array[5].deni  ? 'ok':'non' } onClick={()=>deniAll(array[5].deni)}>{!array[5].deni? 'Bloquer':'Debloquer'}</td>
						  </tr>:
						     <tr><td colSpan='5'></td></tr>
						  }
					    </tbody>
				</table>
	         </div>
      
}
export default Users;