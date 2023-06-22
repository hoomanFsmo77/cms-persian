import {api, IResponse} from "../helper";

export default ()=>({
    productData:[] as any,
    basketData:[] as any,
    getAllProductData(){
        const token=localStorage.getItem('cms')
        if(token){
            fetch(api.base+'/products',{
                headers:{Authorization:`Bearer ${token}`}
            }).then(response=>response.json()).then((response:IResponse)=>{
                if(response.error){
                    alert(response.msg)
                }else{

                    this.productData=Object.entries(response.data)
                }
            })
        }

    },
    addToBasket(productId:number){
        const token=localStorage.getItem('cms');
        const isExistInBasket=this.basketData.some(item=>item.productID===productId)
        const userID=localStorage.getItem('userID')

        if(token && !isExistInBasket){
            this.$dispatch('sidebar',{show:false})
            fetch(api.base+'/basket',{
                method:'POST',
                headers:{Authorization:`Bearer ${token}`,'Content-Type':'application/json'},
                body:JSON.stringify({
                    userID:userID,
                    productID:productId,
                    count:1
                })
            }).then(response=>response.json()).then((response:IResponse)=>{
                if(response.error){
                    alert(response.msg)
                }else{
                    this.$dispatch('sidebar',{show:true})
                    // console.log(response)
                }
            })
        }else{
            this.$dispatch('sidebar',{show:false})
            fetch(api.base+`/basket/${userID}/${productId}?status=increase`,{
                method:'PUT',
                headers:{Authorization:`Bearer ${token}`,'Content-Type':'application/json'},
            }).then(response=>response.json()).then((response:IResponse)=>{
                if(response.error){
                    alert(response.msg)
                }else{
                    this.$dispatch('sidebar',{show:true})
                    // console.log(response)
                }
            })
        }
    },
    updateBasket(ev){
        this.basketData=ev.detail.data
    }


})