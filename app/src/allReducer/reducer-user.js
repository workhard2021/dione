const init={ count:0,user:null,panel_admin:false,
             description_site:{},
			 etat_menu_icone:false,change_color_page:false};
			 
const CHOOSE={count:'count user',
               DESCRIPITON_SITE:'description site',
               UPDATE:'update user',
               CHANGE_COLOR_PAGE:'change color page',
               CONNEXION:'connexon',PANEL_ADMIN:'panel admin'}

const reducerUser=(state=init,action)=>{
	     const lsg=localStorage.getItem('user');
	     if(lsg!==null || lsg!==undefined){
	    	 const user=JSON.parse(lsg);
	    	  state={...state,user}
	     }
	     const nextState=state;
	     let index=0;
	    switch(action.type){
			
            //count user 
	        case CHOOSE.count:
                 return{...nextState,count:action.count}
             //UPDATE USER 
	        case CHOOSE.UPDATE:	
			 if(action.user.connected){
				 localStorage.setItem('user',JSON.stringify(action.user));
				return {...nextState,user:action.user}
		     }else{
			   localStorage.clear()
			   return {...nextState,user:null}
			 }
			 
			case CHOOSE.CONNEXION:
			       if(action.user.connected){
                        localStorage.setItem('user',JSON.stringify(action.user));
                        return {...nextState,user:action.user,valide:{}}
			       }else{
                       localStorage.clear()
                       return {...nextState,user:null}
				   }
		    
			case CHOOSE.PANEL_ADMIN:
			    return {...nextState,panel_admin:!nextState.panel_admin}
		    case CHOOSE.CHANGE_COLOR_PAGE:
				return {...nextState,change_color_page:!action.color}
		    case CHOOSE.DESCRIPITON_SITE:
				 const x={...nextState.description_site,...action.description_site}
				 return {...nextState,description_site:x}

	    default:
	        return state || nextState; 

	    }
}
export default reducerUser


