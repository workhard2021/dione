import React from 'react';
import {connect} from 'react-redux';
import {BrowserRouter as Router,Route} from 'react-router-dom';
import Header from './header/header';
import Service from './container/service';
import Menu from './container/menu';
import Contact from './container/contact';
import Apropos from './container/apropos';
import FooterPage from './footer/footerPage';
import Shopping from './container/shopping';
import Posts from './container/posts';
import UpdatePost from './container/update_post';
import CreatePost from './container/create-post';
import Sign from './container/sign';
import Login from './container/login';
import Users from './container/users.js';
import Commande from './container/commande';
import PasswordOublier from './container/password-oublier';
import CommandeAutheur from './container/commande-autheur';
import CommandeSent from './container/commande-sent';
import DetailCommande from './container/detail-commande';
import Profil from './container/profil';
import UpdateProfil from './container/update-profil'
import Search from './container/search'
import Logo from './container/logo'
import SearchResultat from './container/search_resultat';
import DescriptionSite from './container/description-site'
import ConnectionPasswordForget from './container/connectionPasswordForget';
import DeleteCompte from './container/delete-compte';
import ArlertMessage from './container/alert-message'

const Client=(props)=>{

        const dataMenu={ dispatch:props.dispatch,array:props.reducerPost.array,
                         valide:props.reducerPost.valide,commande:props.reducerPost.commande,
                         title:'Menu du weekend',count_array:props.reducerPost.array,
                         search_post:props.reducerPost.search_post,
                         titleMenu:'Menu de votre choix',
                         titleCommande:"Votre commande",openToggle:props.reducerPost.openToggle,
                         categorieMenu:props.reducerPost.categorieMenu,
                         countPost:props.reducerPost.countPost,countCommande:props.reducerPost.countCommande
                        }
                        
       const dataUser={dispatch:props.dispatch,count:props.reducerUser.count,
                       valide:props.reducerUser.valide,view:props.reducerUser.view,
                       user:props.reducerUser.user,
                       panel_admin:props.reducerUser.panel_admin,
                       init_selects:props.reducerUser.init_selects,
                       etat_menu_icone:props.reducerUser.etat_menu_icone,
                       change_color_page:props.reducerUser.change_color_page,
                       description_site:props.reducerUser.description_site,
        }
       const afficherMenu={dispatch:dataMenu.dispatch,title:dataMenu.titleMenu,array:dataMenu.array};
        const {user}=props.reducerUser;
        let role='';
        if(user!==null && user!==undefined){
            role=user.role;
         } 

	   return <Router>
               
             <Header data={dataMenu} user={dataUser}/>
             <Search data={dataMenu} user={dataUser}/>
             <Logo data={dataMenu} user={dataUser}/>
                {user && role==='admin' &&
                     <>
                      <Route exact path="/create-post/" render={props=><CreatePost data={dataMenu} {...props} /> }/>
                      <Route exact path="/update-post/:id" render={props=><UpdatePost data={dataMenu} {...props} /> }/>
                       <Route exact path="/commande/" render={props=><Commande data={dataMenu} {...props} /> }/>
                       <Route exact path="/users/" render={props=><Users data={dataUser} {...props} /> }/>
                       <Route exact path="/posts/" render={props=><Posts data={dataUser}  {...props} /> }/>
                       <Route exact path="/commande-detail/:id" render={props=><DetailCommande data={dataMenu} {...props} /> }/>
                       <Route exact path="/description/" render={props=><DescriptionSite data={dataUser}  {...props} /> }/>
                      </>
                    
                 }
                                     
               <Route exact path="/shopping" render={props=><Shopping user={dataUser} data={dataMenu}{...props} />}/>
               <Route exact path="/sign/" render={props=><Sign data={dataUser}   {...props} /> }/>
               <Route exact path="/login/" render={props=><Login data={dataUser}  {...props} /> }/>
               <Route exact path="/password-forget-connect/:secret" render={props=><ConnectionPasswordForget data={dataUser}  {...props} /> }/>
               <Route exact path="/password-oublier/" render={props=><PasswordOublier data={dataUser}  {...props} /> }/>
               <Route exact path="/commande-autheur/" render={props=><CommandeAutheur user={dataUser} data={dataMenu} {...props} /> }/>
               <Route exact path="/commande-sent/" render={props=><CommandeSent  {...props} /> }/>
               <Route exact path="/profil/:id" render={props=><Profil data={dataUser} {...props} /> }/>
               <Route exact path="/update-profil/:id" render={props=><UpdateProfil data={dataUser}  {...props} /> }/>
               <Route exact path="/search/:title" render={props=><SearchResultat data={dataMenu}  {...props} /> }/>
               <Route exact path="/delete-compte/" render={props=><DeleteCompte {...props} /> }/>
               <Route exact path="/delete-compte-success/:message" render={props=><ArlertMessage {...props} /> }/>
               <Route exact path='/'render={props=><Menu  data={dataMenu} {...props} /> }/>

  
	               <Service data={dataUser}/>
		             <Apropos data={dataUser}/>
		             <Contact data={dataUser} />
		             <FooterPage data={dataUser} />
                 

	          </Router>
}

const mapStateToProps=(state)=>{
 	     return {...state}
}

const mapDispatchToProps=(dispatch)=>{
 	   return {
 	   	    dispatch:action=>{dispatch(action)}
 	   }
 }

export default connect(mapStateToProps,mapDispatchToProps)(Client);
