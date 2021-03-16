import React, { useEffect, useState } from 'react';
import {Link,useHistory} from 'react-router-dom';
import * as API from '../API/api';
import SearchAdmin from './search_admin';
import {scrollPage} from '../autre/autre';

import './css/shopping.css';
const Commande=(props)=>{
	 
	 const history=useHistory();
	 const[commande,setCommande]=useState([]); 
	 const {dispatch}=props.data ;
	 const[success,setSuccess]=useState(false);  
	 const [count,setCount]=useState(0);

	 const url_search='/commande/search/';

     const DeleteAll=()=>{
		
		API.deleteAll('/commande/delete-all').then(res=>{
			  setSuccess(!success)
		})
     }

     const DeleteOne=(index)=>{

		API.delete_('/commande/delete/'+index).then(res=>{
			  setSuccess(!success)
	    })
     }

     const confirming=(index)=>{
		    API.confirm('/commande/confirm/'+index).then(res=>{
				  setSuccess(!success)  
			})
	 }

	 const init=()=>{
		  API.all('/commande/all').then(res=>{
			 if(res) {

				//dispatch({type:'commande',commande:res})
				setCount(res.length)
				const a=res.slice(0,20)
				 setCommande(a);
			}   
		  })
	 }
	 const initSearch=(x)=>{
		 setSuccess(!success)   
     }
	 const scrollInit=()=>{
		history.push('/')
		window.scrollTo(0,0)
	}

    const setSearch=(x)=>{
		setCommande(x);
	}
	
	 useEffect(()=>{
		 setSuccess(true)
		  init()
		  return ()=>setSuccess(false)
	 },[success]);

	 if(!success){
		  return null
	 }
	 
	 return<div className='shopping bg_all'>

	  	      <SearchAdmin setInit={initSearch} url={url_search} setSearch={setSearch}/>
	  	      <div className='btn_home' onClick={()=>scrollInit()}><i className="fas fa-arrow-left"></i></div>
	          <h3 className="title_shooping"> Liste des Commandes: {count && commande.length}/{count}</h3>

	            <table id='theme'>
					    <thead>
					        <tr>
							    <th>N°</th>
					            <th>Detail</th>
					            <th>Action</th>
					            <th>SUPPRIMER</th>
					        </tr>
					    </thead>
					    <tbody>
					        {commande.length>0 && commande.map((value,index)=>{
					          	  return <tr key={index} >
								            <td id='firt_ligne'>{index+1}</td>
								            <td><Link  to={`/commande-detail/${value.id && value.id}`} onClick={()=>scrollPage()} >Voir</Link></td>
								            <td  onClick={()=>confirming(value.id && value.id)}>
								              { value.confirm? 
								              	 <i className="fas fa-check" id='non'></i>
								              	:
								              	<i className="fas fa-window-close" id='ok'></i>
								              }
								            </td>
								            <td  onClick={()=>DeleteOne(value.id)}>Supprimer</td>
						                 </tr>
					          })
					        }
						   {commande.length>0 ? <tr>
					        <td colSpan='4' onClick={()=>DeleteAll()}>Supprimer tout</td>
						  </tr>:
						  <tr><td colSpan='4'></td></tr>
						  }
					    </tbody>
				</table>
	         </div>

}
export default Commande;