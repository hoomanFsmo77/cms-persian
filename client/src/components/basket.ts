import {api, IResponse} from "../helper";

export default ()=>({
    show:false,
    basketData:[] as any,
    triggerBasket(ev){
        this.show=ev?.detail?.show ?? false
        const token=localStorage.getItem('cms')
        if(token){
            const userID=localStorage.getItem('userID')
            fetch(api.base+`/basket/products/${userID}`,{
                headers:{Authorization:`Bearer ${token}`},
            }).then(response=>response.json()).then((response:IResponse)=>{
                if(response.error){
                    alert(response.msg)
                }else{
                    this.basketData=response.data
                    this.$dispatch('basket',{data:response.data})
                }
            })
        }
    }
})