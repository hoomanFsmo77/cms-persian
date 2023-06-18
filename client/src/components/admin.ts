import {api,IResponse} from "../helper";

export default ()=>({
    img:api.image+'' as string,
    fullName:'' as string,
    task:'' as string,
    init(){
        const token=localStorage.getItem('cms')
        if(token){
            fetch(api.base+'/admin',{
                method:'POST',
                headers:{
                    Authorization:`Bearer ${token}`
                }
            }).then(response=>response.json()).then((response:IResponse)=>{
                if(response.error){
                    console.log(response.msg)
                }else{
                    const {firstname,lastname,image,status}=response.data;
                    this.img+=image;
                    this.fullName=`${firstname} ${lastname}`;
                    this.task=status
                }

            })
        }

    }



})