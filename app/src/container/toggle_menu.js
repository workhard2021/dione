import React, { useEffect, useState } from 'react';
import {useHistory} from 'react-router-dom';
import { scrollPage } from '../autre/autre';
import './css/toggle_menu.css';
const ToggleMenu=(props)=>{
	const {addMenu,item,toggle}=props;
	const history=useHistory();
	const [categorie,setCategorie]=useState([])
	const init=()=>{
		if(item){
			setCategorie( item.filter((value,index)=> item.findIndex(val=>val.categorie===value.categorie)===index)) 
		}
 	}
	useEffect(()=>{
         init()
	},[])
	
	const scrollInit=()=>{
		history.push('/')
		toggle()
		window.scrollTo(0,0)
	}
	
	return <div className='toggle_menu'>
	               <form className='dot'>
	                    <div className='btn_menu_toggle' onClick={()=>scrollInit()}><i className="fas fa-window-close"></i></div>
	                    <h2>Chosir un repas</h2>
	                   { categorie.length>0 ?  categorie.map((value,index)=>{
	                   	    return <tr className='item' key={index}>
					                <td><input type='checkbox' name='title' id={value.categorie} onClick={()=> addMenu(value.categorie)}/></td>
					                <td><label htmlFor={value.categorie}>{value.categorie}</label></td>
									</tr>
						  })
						  : <div className='dot'>Aucun menu</div>
	                    }
		                
	               </form>
	        </div>
}
export default  ToggleMenu