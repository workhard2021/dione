import { act } from "react-dom/test-utils";

const init={array:[],countPost:0,countCommande:0,commande:[],message:'',openToggle:false};

const CHOOSE={ADD_COMMANDE:'add',COMMANDE:'commande',DELETE:'delete',
			   LIKE:'like',COUNT:'count',COUNTPOST:'count post',
			   COUNTCOMMANDE:'count commande',
			   
			   COMMANDE_CONFIRM:'commande confirm',
			   DELETE_ALLL_COMMADE:'delete all commande',
               DELETE_COMMANDE:'delete commande',OPEN_TOGGLE:'open toggle',
               COMMANDE_INCRMNT_DINCREMNT:'increment',ALL_POST:'all post'}

const reducerPost=(state=init,action)=>{
	    const nextState=state;
	    let array=[];
		let view={};
		const cmd=localStorage.getItem('commande') !==null ? JSON.parse(localStorage.getItem('commande')).array
		 : [];
         
	    switch(action.type){
			// get all
			case CHOOSE.ALL_POST:
			
			if(action.all) { 

			  if(cmd.length>0){
				  for(let i=0;i<cmd.length;i++){

					   for(let j=0;j<action.all.length;j++){
					
						    if(cmd[i].id===action.all[j].id){
								 action.all[j]=cmd[i];
							}
							action.all[j].total=Number(action.all[j].price)*1;
					   }
				  }
			     }
			 }
			  return {...nextState,array:action.all}
            //count post 
			case CHOOSE.COUNTPOST:
				return {...nextState,countPost:action.count}
		    //count post and commande
			case CHOOSE.COUNTCOMMANDE:
				return {...nextState,countCommande:action.count}

		

            //remplir le panier
	     	case CHOOSE.ADD_COMMANDE:
 
					if(action.all){
						for(let i=0;i<nextState.array.length;i++){
							   delete nextState.array[i].addCommande;
						}
						localStorage.removeItem('commande')
						return {...nextState,array:nextState.array};
				   }else { 
					const index=nextState.array.findIndex(value=>value.id===action.commande.id)

		     		if(action.commande.addCommande) {
						   delete action.commande.addCommande;
						   nextState.array[index]=action.commande;
							const a=cmd.filter((value,id)=>value.id!==action.commande.id)
							localStorage.setItem('commande',JSON.stringify({array:a}));
		     	         return nextState;
		     	    }else {
						 nextState.array[index]={...action.commande,addCommande:true};
						 array=nextState.array;
						   const a=[...cmd,nextState.array[index]];
						   localStorage.setItem('commande',JSON.stringify({array:a}));
		     	    	 return {...nextState,array}
					 }
				 }
		     
	     	case CHOOSE.VIEW:
	     	    const index=nextState.array.findIndex(value=>value.id===nextState.view.id)
	     	    if(index!==-1) {
	     	      return {...nextState,view:nextState.array.find(value=>value.id===nextState.view.id) };
	     	    }
	     	    break;
	     	   //supprimmer un aricle posté
	     	case CHOOSE.DELETE:
	     	    if(action.all){
			     	    return {...nextState,array:[]}
			    }else {
			    	    index=nextState.array.findIndex(value=>value.id===action.id)
				    	if(index!==-1) {
				     	    return {...nextState,array:[...nextState.array.filter(value=>value.id !==action.id)]}
				        }
			    }
	     	    break;
             //liker ou disliker un article 
	     	case CHOOSE.LIKE:
	     	    const indexLike=nextState.array.findIndex(value=>value.id===action.id)
	     	    if(indexLike!==-1) {
                     view=nextState.array.find(value=>value.id===action.id);
                     if(view.like.liked){
                     	   view={...view,like:{...view.like,count:view.like.count-1,liked:!view.like.liked}};
                     }else{
                     	   view={...view,like:{...view.like,count:view.like.count+1,liked:!view.like.liked}};
                     }
                     array=nextState.array;
                     array[indexLike]=view;
	     	         return {...nextState,array}
	     	    }
	     	    break;
             //incrementer ou desincrementer un la quantite d'une commande
	     	case CHOOSE.COMMANDE_INCRMNT_DINCREMNT:
	     	    const index_=nextState.array.findIndex(value=>value.id===action.id)
	     	    if(index_!==-1) {
                      view=nextState.array.find(value=>value.id===action.id);
                      let {total,quantity,price}=view;
                      quantity=Number(quantity);
                      price=Number(price)

                     if(action.increment){
                     	  if(quantity<16){ 
	                     	   quantity+=1;
	                     	   total=quantity*price;
	                     	   view={...view,quantity,total};
                     	  }
                     }else if(quantity>1){
                     	   quantity-=1;
                     	   total=quantity*price;
						   view={...view,quantity,total};
                     }
                     array=nextState.array;
					 array[index_]=view;

					 for(let i=0;i<cmd.length;i++){
						   if(cmd[i].id===action.id){
							   const a=array.find(value=>value.id===action.id);
							    cmd[i]=a;
						    }
					 }
					 localStorage.setItem('commande',JSON.stringify({array:cmd}));

	     	         return {...nextState,array}
	     	    }
				 break;
				 //commande pour tous
            case CHOOSE.COMMANDE:
				 return {...nextState,commande:action.commande};
			case CHOOSE.OPEN_TOGGLE:
				return {...nextState,openToggle:action.openToggle};

	    default:
	        return nextState || state

	    }
}
export default reducerPost


