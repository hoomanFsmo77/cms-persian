import {api, IResponse} from "../helper";


export default ()=>({
    productDetail:{} as any,
    init(){
        const url=new URLSearchParams(location.search)
        const id=url.get('id');
        const token:string|null=localStorage.getItem('cms');
        if(token){
            fetch(api.base+`/products/${id}`,{
                headers:{Authorization:`Bearer ${token}`}
            }).then(response=>response.json()).then((response:IResponse)=>{
                this.productDetail=response.data
            })
        }

    }


})