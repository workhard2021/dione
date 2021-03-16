import react from 'react';
import { Link } from 'react-router-dom';
import './css/panel.css';
import {scrollAdmin} from '../autre/autre';
const Panel=(props)=>{
   const{openPanel,countUser,countPost,countCommande}=props;
  
  if(openPanel){
    
    return <div id='panel'>

      <div id='panel-item'>
       <div id='panel-administrateur'>Panel administrateur</div>
        <div id='item'> 
                  <Link to='/description/' onClick={()=>scrollAdmin()}>La mise à jour de site</Link>
	                <Link to='/create-post/' onClick={()=>scrollAdmin()} >Creer un nouveau article</Link>
	                <Link to='/posts/' onClick={()=>scrollAdmin()} >La liste d'article  <span className='compter'>{countPost}</span></Link>
	                <Link to='/users/' onClick={()=>scrollAdmin()}>La listee d'utilisateur <span className='compter'>{countUser}</span></Link>
	                <Link to='/commande/' onClick={()=>scrollAdmin()} >La liste des commande <span className='compter'>{countCommande}</span> </Link>
        </div>
       </div>
    </div>
    
  }else {
     return null;
  }

}
export default Panel;