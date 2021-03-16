import React,{useEffect,useState} from 'react';
import {Link,useHistory,useParams} from 'react-router-dom';
import * as API from '../API/api';
import './css/shopping.css';
import {scrollPage} from '../autre/autre';

const DetailCommande=(props)=>{

	 const history=useHistory();
	 const [confirm,setSucces]=useState(false);
	 const [array,setCommande]=useState({commande:[],author:{},total:0,confirm:false}); 
	 const {id}=useParams();

	 const confirming=(index)=>{
		API.confirm('/commande/confirm/'+index).then(res=>{
			   setSucces(!confirm);
		})
   }
   const init=()=>{
		API.findOne('/commande/find/'+id).then(res=>{
			setCommande(res);
		})
    };

	const scrollInit=()=>{
		history.goBack('/')
	}

    useEffect(()=>{
		setSucces(true)
	   init();
	   return ()=>setSucces(false)
	 },[confirm])
	 
	 if(!confirm){
		  return null
	 }
	
    if(array.commande.length>0) {

	 return<div className='shopping bg_all'>
	  	      
	  	      <div className='btn_home' onClick={()=>scrollInit()}><i className="fas fa-arrow-left"></i></div>
	          <h3>Détail des Conmmandes:</h3>

	            <table className="commun">
					    <thead>
					        <tr>
					            <th>Commande</th>
					            <th>Prix</th>
					            <th>Quantité</th>
					            <th>Total</th>
					        </tr>
					    </thead>
					    <tbody>
					        {
					         array.commande.map((value,index)=>{
					          	  return <tr key={index} className='item'>
								            <td className="item">{value.title}</td>
								            <td className="item">{Math.round((value.price)*100/100)} dhs</td>
								            <td className="item">{value.quantity} </td>
								            <td className="item">{Math.round((value.price*value.quantity)*100/100)} dhs</td>
						                 </tr>
					          })
					        }
					        <tr>
					        <td colSpan='2' className='item'> Prix total</td>
					        <td colSpan='4' className="item">{array.total} dhs</td>
					      </tr>
					    </tbody>

				</table>
			    <table className="commun">
				  <caption>Inforamtion du client</caption>
				   
				   <tbody>
				    <tr className="item">
				      <th>Image</th>
					   <td><Link to={`/profil/${array.author.id}`} onClick={()=>scrollPage()}><img src={array.author.image || ''}  alt=""/></Link></td>
				    </tr>
					 <tr className="item">
				      <th>Non Client</th>
				      <td><Link to={`/profil/${array.author.id}`}>{array.author.fullName || 'Annonyme' }</Link></td>
                    </tr>
                    <tr className="item">
				      <th>Addresse</th>
				      <td>{array.author.address}</td>
				    </tr>
				    <tr className="item">
				      <th>Contact</th>
				      <td>{array.author.tel || array.author.email}</td>
				    </tr>
				   </tbody>

				   <tfoot>
				      <tr className="item">
				        <td colSpan='1'>{array.confirm? 'confirmé(e)' : 'non confirmé(e)'}</td>
				        <td colSpan='3' onClick={()=>confirming(id)}>
								              { array.confirm? 
								              	<span id="non"><i className="fas fa-check"></i></span>
								              	:
								              	<span id="ok"><i className="fas fa-window-close"></i></span>
								              }
			            </td>
				      </tr>
				   </tfoot>
				</table>

	         </div>
        }
      else { 
		    return null
      }
}
export default DetailCommande;