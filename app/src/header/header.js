import e from 'cors';
import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import {scrollPage} from '../autre/autre'
import './css/menu.css'
const Header=(props)=>{
	   const {user,dispatch}=props.user;
	   const [change_color_page,setChangeColor]=useState(false);
	   const [etat_menu_icone,setOpenMenu]=useState(false);
	   const displayHadear=()=>{
			setOpenMenu(false);
		   if(window.screen.width >= 1920 && window.screen.height >= 1080 ){
			      document.getElementById('checkbox_menu').checked=false;
		   }else{
			     const a=document.getElementById('checkbox_menu').checked=false;
		   }

	   }
	   
       const open_icone_menu=()=>{
		   setOpenMenu(!etat_menu_icone);
	   }
	   const scrollPageSignLogin=()=>{
		    setOpenMenu(!etat_menu_icone);
			document.getElementById('checkbox_menu').checked=false
		    scrollPage();
	   }
	   const themeBg=()=>{
				dispatch({type:'change color page',color:change_color_page})
				const theme=document.getElementById('theme_all');
				const color=document.getElementsByClassName('bg_all');
				const empty=document.getElementsByClassName('empty');
				
				const sucess_search=document.getElementsByClassName('sucess_search')[0];
				const inc_dec=document.getElementsByClassName('inc_dec');
				let shopping=document.getElementsByClassName('shopping');
				let a=document.getElementsByClassName('header');
				let b=document.getElementsByClassName('menu_open_h');
				const header=[...a,...b];

							
				if(change_color_page){
					for(let i=0;i<color.length;i++){
						color[i].style.color='white';
					}
					theme.style.background='#161616';
					for(let i=0;i<empty.length;i++){
						empty[i].style.background='white';
					}
					 
				
					for(let i=0;i<inc_dec.length;i++){
						inc_dec[i].style.color='white';
					}

					for(let i=0;i<shopping.length;i++){
						shopping[i].style.background='white';
						shopping[i].style.color='black';
					}
					for(let i=0;i<header.length;i++){
						header[i].style.background='#232525';
						header[i].style.color='white';
					}
				
				   if(sucess_search)  sucess_search.style.color='white';
					
					
				}else{
					for(let i=0;i<header.length;i++){
						header[i].style.background='whitesmoke';
						header[i].style.color='#232525';
					}
					for(let i=0;i<color.length;i++){
						color[i].style.color='black';
					 }
					theme.style.background='white';
					theme.style.color='black';
					for(let i=0;i<empty.length;i++){
						empty[i].style.background='#b2e0d4';
					}
					
					for(let i=0;i<inc_dec.length;i++){
						inc_dec[i].style.color='white';
					}

					for(let i=0;i<shopping.length;i++){
						shopping[i].style.background='white';
						shopping[i].style.color='black';
					}

					if(sucess_search) sucess_search.style.color='black';
						
				 }
				 
				  if(change_color_page){
					 document.getElementById('sun').style.color='white';
					 setChangeColor(!change_color_page)
				   }else{
						 document.getElementById('sun').style.color='rgb(119, 95, 95)';
						 setChangeColor(!change_color_page) 

				 }
				
		}		
	   return <header className="header shooping">
	              
                <nav className='menu' id='header'>
	                  <div className='dot'>
		                    <Link id='name_site_or_logo' to='/' onClick={()=>displayHadear()}>David</Link>
		              </div>
		             <div className='dot '>
		              <label onClick={()=>open_icone_menu()} htmlFor='checkbox_menu' className='checkbox_menu'>
		                 <i className={!etat_menu_icone? "fas fa-align-left":"fas fa-window-close"}></i></label>
		              <input type='checkbox' id='checkbox_menu'/>
		              <ul className='menu_open menu_open_h'>
		                 <li><Link to='/' onClick={()=>displayHadear()}>Accueil</Link></li>
		                 <li><a href='#apropos' onClick={()=>displayHadear()}>a propos</a></li>
		                 <li><a href='#services' onClick={()=>displayHadear()}>Service</a></li>
		                 { user===null ?
		                   <> <li><Link to='/sign' onClick={()=>scrollPageSignLogin()}>S'inscrire</Link></li>
		                     <li><Link to='/login' onClick={()=>scrollPageSignLogin()}>Se connecter</Link></li>
		                   </>:
		                   <li><Link to={`/profil/${user.id}`} onClick={()=>scrollPageSignLogin()} ><img id="profil_image" src={user.image} alt="photo profil"/></Link></li>
		                 }
		                 <li id='sun' onClick={()=>themeBg()}><i className="fa fa-sun"></i></li>
		              </ul>
		              </div>
	              </nav>
	             
	              
	            </header>
	         
}

export default Header