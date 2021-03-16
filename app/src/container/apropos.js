import React from 'react';
import './css/apropos.css';
const Apropos =(props)=>{
	    const {description_site}=props.data;
	     const image=description_site.second_image?
	          description_site.second_image:'/r2.jpg';

	 return <div className='apropos bg_all' id='apropos'>
	            <h2>A propos</h2>
	            <div className='dot'>
	               <div className='image'>
	                   <img src={image} alt='images'/>
	               </div>

	            </div>
	            <div className='dot'>
	              <h4>We cook the Best food</h4>
	              <p>
	               { description_site.apropos? description_site.apropos :'Nous faisons des meilleur plat africain et europen,notre equipe sont à votre disposition 24h/24H et 7/7.'}
	              </p>
	            </div>
	        </div>
}
export default Apropos