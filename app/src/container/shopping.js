import React,{useState,useCallback, useEffect} from 'react';
import {Link,useHistory} from 'react-router-dom';
import { scrollPage } from '../autre/autre';
import './css/shopping.css';
import UpdatePost from './update_post';

const Shopping=(props)=>{
	 const history=useHistory();
	 const cmd=localStorage.getItem('commande') !==null ? JSON.parse(localStorage.getItem('commande')).array
	 : [];
	 const msg='Votre message a été recu avec succes et de beacoup de consideration et merci de votre clientel';
	 const {dispatch,titleCommande}=props.data;
	 const [array,setArray]=useState(cmd);
     const {user}=props.user;
	 const [message,setMessage]=useState('')
	 const calculTotal=useCallback( ()=>{
		   let total=0;
		    for(let i=0;i<array.length;i++ ){
		    	 if(array[i].addCommande){ 
					
		    	     total+=array[i].quantity*array[i].price;
					 

		    	 }
			 };
			 return   Math.round(total * 100) / 100;

	 },[cmd])
	 
	const deleteAll=()=>{
		  dispatch({type:'add',all:true})
		  history.push('/')
	}
    const deleteOne=(value)=>{
	    	 dispatch({type:'add',commande:value})
	    	 setMessage(value.title+': a été supprimé(e)')
	}
	const init=useCallback( ()=>{
		setArray(array);
	},[array])
	const scrollInit=()=>{
		history.push('/')
		window.scrollTo(0,0)
	}
	
	useEffect( ()=>{
		 init()
	},[array])
	
	

	const passer_commande=()=>{
		    	    if(user){
		    	 		dispatch({type:'valide user',user:user,init_valid_by_user:true})
		    	    }else{
		    	      dispatch({type:'valide user',user:{},init_valid_by_user:true})
					}
					scrollPage()
	}
	if(array.some(value=>value.addCommande===true)) {
	 return<div className='shopping bg_all'>
		     
			 <div className='btn_home' onClick={()=>scrollInit()}><i className="fas fa-arrow-left"></i></div>
	          {message !=='' && <p>{message}</p>}
	          <h3 className='title_shooping'>{titleCommande}</h3>
	            <table className="commun">
					    <thead>
					        <tr>
					            <th> Choix</th>
					            <th> Prix</th>
					            <th> quantité</th>
					            <th> total</th>
					             <th>Delete</th>
					        </tr>
					    </thead>
					    <tbody>
					        { 
					         array.map((value,index)=>{
					          	  return value.addCommande && <tr key={index}>
								            <td className="item">{value.title}</td>
								            <td className="item" >{Math.round(value.price*100/100)} dhs</td>
								            <td className="item">{value.quantity} </td>
								            <td className="item" >{Math.round((value.quantity*value.price)*100/100)}</td>
								            <td onClick={()=>deleteOne(value)}>Supprimer</td>
						                </tr>
					          })
					        }
					        <tr>
					        <td colSpan='2'  className='total item'>total prix </td>
					        <td colSpan='2' className="item" >{calculTotal()} dhs</td>
					        <td onClick={()=>deleteAll()}>Supprimer tout</td>
					      </tr>
					    </tbody>
				</table>
				<div className='passer_commande'>
					<Link to='/commande-autheur' onClick={()=>passer_commande()}>Passer commande</Link>
			    </div>
	         </div>
        }

      else {
	  return  <div className='empty'> <Link id="home" to='/'>Choisir un repas</Link> <p>Aucune commande</p></div>
      }
}

export default Shopping;