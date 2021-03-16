import React, { useState,useEffect} from 'react';
import {useParams,useHistory} from 'react-router-dom';
import * as API from '../API/api';

import './css/menu.css';
const SearchResultat=(props)=>{
	    
	    const {dispatch,array}=props.data;
	    let {title}=useParams();
		const history=useHistory()
		const [success,setSuccess]=useState(false);
		const [up,setUp]=useState(false);

	    title=title.replace('/%/g',' ')
	    title=title.replace('/20/g',' ')
		const regex=new RegExp('^'+title+'*','i');


	    const like=(id)=>{
			API.like(`/post/like/${id}`).then(res=>{
				 setSuccess(!success)
			})
	   }

	    const increment_desincrement=(id,increment=true)=>{
	    	 dispatch({type:'increment',id:id,increment:increment})
	    }
	    const add=(value)=>{
	    	 dispatch({type:'add',commande:value})
		}
		const all=()=>{
			API.all('/post/all').then(res=>{
				dispatch({type:'all post',all:res}); 
			})
		}
		useEffect(()=>{
			setUp(true)
			all()
			return setUp(false);
		},[success]);
		  if(up){
		  	 return null;
		  }

	    const resultat=array && array.map((value,index)=>{
	              return regex.test(value.title) && <div className='dot' key={value.id}>
			              <div className='image'>
			                  <img src={value.image} alt='images'/>
			              </div>
			              <h4>{value.title}</h4>
			              <p className='comment'>{value.comment}</p>
			              <p className='prix'>{value.prix} Dhs</p>
			              <div className='count'>
			                <span>{value.like.count}</span>
			              </div>
			              <div className='like'>
			                <span onClick={()=>like(value.id)} className={value.like.liked? '_like':'_dislike'}><i  className="fas fa-heart"></i></span>
			              </div>

			              <div className='btn_add' style={value.addCommande && {color:'red'}} onClick={()=>add(value)}>{value.addCommande?'Annuler': 'Ajouter'}</div>
			              
			              <div className='btn'>
			                 <div onClick={()=>increment_desincrement(value.id,false)}>-</div>
			                  <input type='text' name='quantity' value={value.quantity} onChange={()=>''}/>
			                 <div onClick={()=>increment_desincrement(value.id,true)}>+</div>
			              </div>
	                </div>
	                })
					
         if(resultat.length>0){ 

	         return  <article>
			      <h4 id='sucess_search'>Resultat de votre recherche </h4>
			      <div className='menu_container bg_all' id='menu_container'>
	                 {resultat}  
	               </div>
				 </article>
	      }else { 
	      	   setTimeout(function() {
	      	   	  history.push('/')
	      	   }, (200));
	      	  return null
	       }
}
export default SearchResultat