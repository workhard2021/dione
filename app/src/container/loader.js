import './css/loader.css';
const Loader=(props)=>{
    
    const loader='/image/loader.gif';
    return <div id='loader'>
           <img id='image' img='' src={loader} alt='loader'/>
        </div>
}
export default Loader;