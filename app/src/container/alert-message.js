import {useParams,useHistory} from 'react-router-dom';
import './css/alert-message.css';
const AlertMessage=(props)=>{
       const {message}=useParams();
       const history=useHistory();
       const scrollInit=()=>{
              history.push('/');
              window.scrollTo(0,0)
       }

       if(typeof(message)==='string' && message !==''){
              return <div id='alert-message'>
                            <p>{message}</p>
                             <div id='btn_alert'><span onClick={()=>scrollInit('/')}>Acceuil</span></div>
                      </div>
       }else{
              setTimeout(()=>{
                     scrollInit()
              },200)
             return null
       }
}
export default AlertMessage;