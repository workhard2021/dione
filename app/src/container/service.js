import React from 'react';
import './css/service.css';

const Service=(props)=>{
	  const{description_site}=props.data;

	 return <div className='service bg_all' id='services' >
	               <h2>Services</h2>
		         <div className='dot'>
			          <div className='icone'><i className="fas fa-utensils"></i></div>
			          <h3>Preparations</h3>
			          <p>
			            {description_site.preparation? description_site.preparation:"Lorem Ipsum est un générateur de faux textes aléatoires Vous choisissez le nombre de paragraphes, de mots ou de listes.Vous obtenez alors un texte aléatoire que vous pourrez ensuite utiliser librement dans vos maquettes."} 
			          </p> 
			     </div>
		         <div className='dot'>
			          <div className='icone'><i className="fas fa-hamburger"></i></div>
			          <h3>Fast food</h3>
			         <p>
			           {description_site.fast_food? description_site.fast_food: "Lorem Ipsum est un générateur de faux textes aléatoires. Vous choisissez le nombre de paragraphes, de mots ou de listes.Vous obtenez alors un texte aléatoire que vous pourrez ensuite utiliser librement dans vos maquettes."}
			         </p> 
			     </div>
		         <div className='dot'>
			          <div className='icone'><i className="fas fa-truck-moving"></i></div>
			          <h3>Livraison</h3>
			           <p>
			            {description_site.livraison? description_site.livraison:'Lorem Ipsum est un générateur de faux textes aléatoires.Vous choisissez le nombre de paragraphes, de mots ou de listes. Vous obtenez alors un texte aléatoire que vous pourrez ensuite utiliser librement dans vos maquettes.'}
			           </p> 
			    </div>
	        </div>
}
export default Service;
