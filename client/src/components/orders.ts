import {api,IResponse} from "../helper";

export default ()=>({
    ordersList:[] as any[],
    orderId:null as null|number,
    detailModalFlag:false as boolean,
    deleteModalFlag:false as boolean,
    editModalFlag:false as boolean,
    closeAllModal(){
        this.detailModalFlag=false
        this.deleteModalFlag=false
        this.editModalFlag=false
    },
    openDetailModal(id:number){
        this.orderId=id
        this.detailModalFlag=true
    },
    get getOrder(){
        const idx=this.ordersList.findIndex(item=>item.id===this.orderId);
        const target=this.ordersList[idx]
        if(target){
            return {popularity:target.popularity,count:target.count,sale_count:target.sale_count,sale:target.sale}
        }
    },
    openDeleteModal(id:number){
        this.orderId=id
        this.deleteModalFlag=true
    },
    getOrdersList(){
        const token=localStorage.getItem('cms')
        if(token){
            fetch(api.base+'/orders',{
                headers:{Authorization:`Bearer ${token}`}
            }).then(response=>response.json()).then((response:IResponse)=>{
                if(response.error){
                    alert(response.msg)
                }else{
                    this.ordersList=response.data
                }
            })
        }
    },
    deleteOrder(){
        const token=localStorage.getItem('cms')
        if(token){
            fetch(api.base+`/orders/${this.orderId}`,{
                method:'DELETE',
                headers:{Authorization:`Bearer ${token}`}
            }).then(response=>response.json()).then(response=>{
                if(response.error){
                    alert(response.msg)
                }else{
                    this.orderId=null
                    this.deleteModalFlag=false
                    this.getOrdersList()
                }
            })
        }
    },

    changeOrderStatus(status:number,id:number){
        const token=localStorage.getItem('cms')
        if(token){
            fetch(api.base+`/orders/active-order/${id}/${status}`,{
                method:'PUT',
                headers:{Authorization:`Bearer ${token}`}
            }).then(response=>response.json()).then((response:IResponse)=>{
                if(response.error){
                    alert(response.msg)
                }else{
                    this.getOrdersList()
                }
            })
        }

    }

})