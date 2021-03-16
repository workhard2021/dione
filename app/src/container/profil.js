import React,{useEffect,useState} from 'react';
import {Link,useHistory,useParams} from 'react-router-dom';
import * as API from '../API/api'
import {getCircularReplacer} from '../autre/autre'
import './css/profil.css';
const Profil=(props)=>{
            const history=useHistory();
			let {dispatch,user}=props.data;
			const {id}=useParams();
			const [success,setSuccess]=useState(false);
			const [users,setUsers]=useState({});

            const deconnexion=(e)=>{
            	   e.preventDefault()
				   API.deconnexion(JSON.stringify(user,getCircularReplacer()),'/user/deconnexion')
				   .then(res=>{
					    if(res.status===200){
							dispatch({type:'connexon',user:res.data})
							window.scrollTo(0,0)
							history.push('/')
						}
				   })  
			}
			
           
            const deni=(id)=>{
				API.deni(`/user/deni/${id}`).then(res=>{
				})	  
		  }
		  const init=()=>{
				API.findOne('/user/find'+id).then(res=>{
					 setUsers(res)
				})
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
         
          if(user!==null ) { 

           if(users.role==='user' && users.connected===true) { 

		   	    return <div className='item_user'>
		          	     <div className='btn_home_formulaire' onClick={()=>scrollInit('/')}><i className="far fa-times-circle"></i></div>
		          	     {users.role==='admin' && <span className='certifier'><i id='certifier' className="fas fa-badge-check"></i></span>}
		   	            <img src={users.image? users.image :'/image/r2.jpg'} alt='profil images'/>
		   	            <div className='title_user'>
			   	                <div className='info'>
			   	                   <div className='dot'><span>Nom complet</span>: {users.fullName}</div>
			   	                   <div className='dot'><span>Email </span>: {users.email}</div>
			   	                   <div className='dot'><span>Tel </span>: {users.tel}</div>
			   	                </div>
			   	                <div className='btn'>
			   	                       <div className='dot'><Link to={`/update-profil/${users.id}`}> Update </Link></div>
			   	                       <div className='dot' onClick={ (e)=>deconnexion(e) }>Deconnexion</div>
			   	                       <div className='dot' onClick={()=>history.push('/delete-compte')}>Delete</div>
			   	                </div>
		   	            </div>
		   	         </div>

		   	 }else if(users.role==='user') {
				return <div className='item_user'>
		          	     <div className='btn_home_formulaire' onClick={()=>history.goBack('/')}><i className="far fa-times-circle"></i></div>
		   	            <img src={users.image? users.image :'/image/r2.jpg'} alt='profil images'/>
		   	            <div className='title_user'>
			   	                <div className='info'>
			   	                   <div className='dot'><span>Nom complet</span>: {users.fullName}</div>
			   	                   <div className='dot'><span>Email </span>: {users.email}</div>
			   	                   <div className='dot'><span>Tel </span>: {users.tel}</div>
			   	                </div>
			   	                <div className='btn'>
			   	                       <div className='dot' onClick={ (e)=>deni(users.id,e) }>{!users.deni ? 'Bloquez':'Debloquez'}</div>
			   	                </div>
		   	            </div>
		   	         </div>
						
		   	 	}else if(users.role=='admin' && users.connected===false){

				return	<div className='item_user'>
					<div className='btn_home_formulaire' onClick={()=>history.goBack('/')}><i className="far fa-times-circle"></i></div>
					{users.role==='admin' && <span className='certifier'><i id='certifier' className="fas fa-certificate"></i></span>}
		   	            <img src={users.image? users.image :'/image/r2.jpg'} alt='profil images'/>
					<div className='title_user'>
							<div className='info'>
							   <div className='dot'><span>Nom complet</span>: {users.fullName}</div>
							   <div className='dot'><span>Email </span>: {users.email}</div>
							   <div className='dot'><span>Tel </span>: {users.tel}</div>
							   <div className='dot'><span>Role </span>: {users.role}</div>
							</div>
							<div className='btn'>
								   <div className='dot'><Link to={`/update-profil/${users.id}`}> Update </Link></div>
							</div>
					</div>
				 </div>
			}else{
			   
	
				return <div className='item_user'>
					<div className='btn_home_formulaire' onClick={()=>history.goBack()}><i className="far fa-times-circle"></i></div>
					{users.role==='admin' && <span className='certifier'><i id='certifier' className="fas fa-certificate"></i></span>}
		   	            <img src={users.image? users.image :'/image/r2.jpg'} alt='profil images'/>
					<div className='title_user'>
							<div className='info'>
							   <div className='dot'><span>Nom complet</span>: {users.fullName}</div>
							   <div className='dot'><span>Email </span>: {users.email}</div>
							   <div className='dot'><span>Tel </span>: {users.tel}</div>
							   <div className='dot'><span>Role </span>: {users.role}</div>
							</div>
							<div className='btn'>
								   <div className='dot'><Link to={`/update-profil/${users.id}`}> Update </Link></div>
								   <div className='dot' onClick={ (e)=>deconnexion(e) }>Deconnexion</div>
							</div>
					</div>
				 </div>
			}
	}else return null
		
	   
}
export default Profil;