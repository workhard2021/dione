import React ,{useEffect,useState}from 'react';
import * as API from '../API/api';
import './css/menu.css';
import ToggleMenu from './toggle_menu';
const Menu=(props)=>{

		const {dispatch,array,openToggle}=props.data;
		const [menu,setMenu]=useState([]);
		const [temp,setTemp]=useState([]);
		const [success,setSuccess]=useState(false);
		const url='/post/all';
		
		       
	    const like=(id)=>{
			 API.like(`/post/like/${id}`).then(res=>{
				  if(res.status===200){
				  }
			 })
			 dispatch({type:'like',id:id})

		}

	    const increment_desincrement=(id,increment=true)=>{
	    	 dispatch({type:'increment',id:id,increment:increment})
	    }
	    const add=(value)=>{
	    	 dispatch({type:'add',commande:value})
		}	
        const all=()=>{

			API.all(url).then(res=>{
				setTemp(res);
				dispatch({type:'all post',all:res});
				setMenu([])	
			})
		}
		
	   const toggle=()=>{
			dispatch({type:'open toggle',openToggle:!openToggle})
	   }
	   const addMenu=(x)=>{
		const a=temp.filter(value=>value.categorie===x);

		if(menu.length>0){ 

			 const index=array.findIndex(value=>value.categorie===x);
			 if(index!==-1){
				const b=array.filter(value=>value.categorie!==x);
				dispatch({type:'all post',all:b});
				setMenu(b)
				if(b.length==0){
					dispatch({type:'all post',all:temp});
				}

			 }else{
				 for(let i=0;i<array.length;i++){
					  if(array[i].categorie===x){
						   delete array[i];
					  }
				 }
				 dispatch({type:'all post',all:[...array,...a]}); 
				 setMenu([...array,...a])
			 }

		}else{ 
				dispatch({type:'all post',all:a}); 
				setMenu(a)			
		}
		
	}
	
	
	useEffect(()=>{
		setSuccess(true)
			all()
		return ()=> setSuccess(false)
	},[openToggle]);

	if(!success){
         return null
	 }

	 return <section>
	         {openToggle && <ToggleMenu  addMenu={addMenu} openToggle={openToggle} toggle={toggle} item={temp}/>} 
	         <article className='menu_container bg_all ' id='menu_container'>
	             <h2>Menu de votre choix</h2>
	             { array && array.map((value,index)=>{
	              return  <div className='dot menu_theme' key={value.id}>
			              <div className='image'>
			                  <img src={value.image? value.image :'/image/r1.jpg'} alt='images'/>
			              </div>
			              <h4>{value.title}</h4>
			              <p className='comment'>{value.comment}</p>
			              <p className='prix'>{value.price} Dhs</p>
			              <div className='count'>
			                <span>{value.like.count}</span>
			              </div>
			              <div className='like'>
			                <span onClick={()=>like(value.id)} className={value.like.liked? '_like':'_dislike'}><i  className="fas fa-heart"></i></span>
			              </div>

			              <div className='btn_add' style={value.addCommande && {color:'red'}} onClick={()=>add(value)}>{value.addCommande?'Annuler': 'Ajouter'}</div>
			              
			              <div className='btn'>
			                 <div className='inc_dec' onClick={()=>increment_desincrement(value.id,false)}>-</div>
			                  <input type='text' name='quantity' value={value.quantity} onChange={()=>''}/>
			                 <div className='inc_dec' onClick={()=>increment_desincrement(value.id,true)}>+</div>
			              </div>
	                </div>

	            })}   
	         </article>
		</section>
}
export default Menu