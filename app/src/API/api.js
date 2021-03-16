import axios from 'axios';
import {HEADERS,URL} from './constate';
export  const all=async(url)=>{
    try{ 
        let res= await fetch(URL+url,{headers:HEADERS});
        if(res.status===404){
            throw Error(res.data) 
        }
        
        if(res.status===200){
            return res.json();
        }else{
               return {};
        }
        

        
     }
    catch(e){
            console.log(e)
     }
}

export const create =async(data,url)=>{
      try{
           let res=await axios({
                url:URL+url,
                method:"post",
                headers:HEADERS,
                data:data
           });

          if(res.status===404){
            throw Error('ERROR');
          }else{
               return res;

          }
           
       }
       catch(e){
            return e
       }   
}

export const findOne= async (url)=>{
         try{
             let res=await fetch(URL+url,{
                  method:'get',
                  headers:HEADERS
             })
             if(res.status===404){
                    throw Error('404')
             }
             
             return res.json();
          }
          catch(e){
              console.log(e)  
          } 
}

export const delete_ = async(url)=>{ 
     try{
            const res= await axios({
                  url:URL+url,
                  headers:HEADERS
            })
            if(res.status===404){
                  throw Error('404');
            }
            return res;
      }
      catch(e){
            console.log(e);
      }
}

export const deleteAll = async(url)=>{ 
    
     try{
            const res= await axios({
                  url:URL+url,
                  headers:HEADERS
            })
            if(res.status===404){
                  throw Error('404');
            }
           return res;
      }
      catch(e){
            console.log(e);
      }
}
export const like=async (url)=>{
      try{
             const res=await axios(URL+url,{
                   method:'get',
                   headers:HEADERS
             })
              if(res.status===404){
                    throw Error(res.data);
              }
              else{
                    return res;
              }

             
      }
      catch(e){
            console.log(e);
      }
}


export const deni = async(url)=>{ 
     try{
            const res= await axios({
                  url:URL+url,
                  headers:HEADERS
            })
            if(res.status===404){
                  throw Error('404');
            }else{
               return res;
            }
      }
      catch(e){
            console.log(e);
      }
}

export const deniAll = async(data,url)=>{ 
       
     try{
            const res= await axios({
                  url:URL+url,
                  method:'post',
                  headers:HEADERS,
                  data:data
            })
            if(res.status===404){
                  throw Error('404');
            }else{
               return res;
            }
      }
      catch(e){
            console.log(e);
      }
}


export const connexion=(data,url)=>{
         try{
               const res=axios({
                     url:URL+url,
                     method:'post',
                     headers:HEADERS,
                     data:data
               })
               if(res.status==404){
                    throw Error ('404');

               }else{
                     return res
               }
         }
         catch(e){
               console.log(e)
         }
}
export const deconnexion=(data,url)=>{
     try{
          const res=axios({
                url:URL+url,
                method:'post',
                headers:HEADERS,
                data:data
          })
          if(res.status==404){
               throw Error ('404');

          }else{
                return res
          }
    }
    catch(e){
          console.log(e)
    }
}

export const confirm=async (url)=>{
        try{
               const res=await axios({
                      method:'get',
                      url:URL+url,
                      headers:HEADERS
               });
               if(res.status===200){
                      return res;
               }else{
                   throw Error('404');
               }
          }
          catch(e){
                 console.log(e)
          }
}

export const search=async(url)=>{

      try{
                  const res= await axios({
                         url:URL+url,
                         headers:HEADERS
                  })
                  if(res.status===404){
                        throw Error(res.data);
                  }
                  return res.data;
            }
            catch(e){
                   return []
            }
}