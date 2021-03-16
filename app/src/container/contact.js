import React from 'react';
import {Link} from 'react-router-dom'
import './css/contact.css';
const Contact=(props)=>{
	   const {description_site}=props.data;
	   const facebook=description_site.facebook?
	               description_site.facebook:'http//:www.facebook.com'; 
	    const instagram=description_site.instagram?
	               description_site.instagram:'http//:www.instagram.com'; 
	   const contact_toggle=()=>{
				const x=document.getElementsByClassName('contact_toggle')[0];
				if(x!==undefined){
				   x.id='contact_toggle';
				}
	   }

	  return <section className='contact bg_all' id='contacts'>
	            <div className='dot'>
	                 <div className='item'>
	                    <h2>Contactez nous</h2>
	                    <p>{description_site.contact?description_site.contact
	                    	 :'Vous pouvez nous contactez soit par notre numero ou par nos differents reseaux sociaux'
	                    	 }
	                     </p>
	                 </div>
	                 <div className='item' id='contact_link' onClick={()=>contact_toggle()}>
	                     <span>Contacts</span>
						<div className="contact_toggle">
						    <div><strong>Email</strong>: <span>{description_site.email && description_site.email}</span></div>
							<div><strong>Tel</strong>: <span>{description_site.tel!==''? description_site.tel : 'Aucun contact'}</span></div>
						</div>
	                 </div>
	            </div>

	             <div className='dot'>
	                 <div className='item'>
	                     <h4>Reseaux sociaux</h4>
	                     <div className='icone'>
	                       <Link to={`${facebook}`} target='_blank' onClick={(e)=>{ e.preventDefault(); window.open(facebook);}}>
	                              <i className="fab fa-facebook"></i>
	                        </Link>
	                       <Link to={`${instagram}`} target='_blank' onClick={(e)=>{ e.preventDefault(); window.open(instagram);}}>
	                              <i className="fab fa-instagram"></i>
	                       </Link>
	                     </div>
	                 </div>
	                 <div className='item'>
	                   <h4>Services</h4>
	                   <ul>
	                      <li>Preparation à domicile</li>
	                      <li>Fast food</li>
	                      <li>Livraison</li>
	                   </ul>
	                 </div>
	            </div>

	        </section>
}
export default Contact;