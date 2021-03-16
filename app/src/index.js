import React from 'react';
import {Provider} from 'react-redux';
import ReactDOM from 'react-dom';
import Client from './client';
import store from './allReducer/all-store';
const App=(props)=>{
	   return <Provider store={store}>
		         <main id='theme_all'>
	               <Client/>
				 </main>
	          </Provider>
}
ReactDOM.render(<App/>,document.getElementById('root'));
