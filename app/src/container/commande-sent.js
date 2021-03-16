
const CommandeSent=(props)=>{
   
    const data={image:'/image/pay.gif',message:props.message};
    return <div className='afterSendCommande'>
               <div className='icone'><i className="fas fa-check"></i></div>
               <p>{data.message}</p>
               <span>Merci de votre confiance</span>
               <div className='image'>
               <img src={data.image}  alt='after send commande'/>
               </div>
           </div>
}
export default CommandeSent