import {api, IResponse} from "../helper";


export default ()=>({
    offersList:[] as any[],
    deleteModalFlag:false as boolean,
    offerId:null as number|null,
    openDeleteModal(id:number){
        this.offerId=id
        this.deleteModalFlag=true
    },
    deleteOffer(){
        const token=localStorage.getItem('cms')
        if(token){
            fetch(api.base+`/offers/${this.offerId}`,{
                method:'DELETE',
                headers:{Authorization:`Bearer ${token}`}
            }).then(response=>response.json()).then(response=>{
                if(response.error){
                    alert(response.msg)
                }else{
                    this.offerId=null
                    this.deleteModalFlag=false
                    this.getOffersList()
                }
            })
        }
    },
    getOffersList(){
        const token=localStorage.getItem('cms')
        if(token){
            fetch(api.base+'/offers',{
                headers:{Authorization:`Bearer ${token}`}
            }).then(response=>response.json()).then((response:IResponse)=>{
                if(response.error){
                    alert(response.msg)
                }else{
                    this.offersList=response.data
                }
            })
        }
    },
    changeOfferStatus(status:number,id:number){
        const token=localStorage.getItem('cms')
        if(token){
            fetch(api.base+`/offers/active-off/${id}/${status}`,{
                method:'PUT',
                headers:{Authorization:`Bearer ${token}`}
            }).then(response=>response.json()).then((response:IResponse)=>{
                if(response.error){
                    alert(response.msg)
                }else{
                    this.getOffersList()
                }
            })
        }

    }
})