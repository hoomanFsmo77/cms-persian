import {api,IResponse} from "../helper";
export default ()=>({
    productsList:[] as any[],
    imageBase:api.image,
    onDeleteModal:false as boolean,
    onEditModal:false as boolean,
    onDetailModal:false as boolean,
    productId:null as number|null,
    title:'',
    price:null as number|null,
    count:null as number|null,
    img:'' as string,
    popularity:null as number|null,
    sale:null as number|null,
    colors:null as number|null,
    toggleDeleteModal(id:number){
        this.productId=id
        this.onDeleteModal=!this.onDeleteModal
    },
    toggleEditModal(id:number){
        const token:string|null=localStorage.getItem('cms');
        if(token){
            fetch(api.base+`/products/${id}`,{
                headers:{Authorization:`Bearer ${token}`}
            }).then(response=>response.json()).then((response:IResponse)=>{
                const {title,price,count,img,popularity,sale,colors}=response.data;
                this.title=title
                this.price=price
                this.count=count
                this.img=img
                this.popularity=popularity
                this.sale=sale
                this.colors=colors
                this.productId=id
                this.onEditModal=!this.onEditModal
            })
        }

    },
    toggleDetailModal(id:number){
        this.productId=id
        this.onDetailModal=!this.onDetailModal
    },
    resetForm(){
        this.title=''
        this.price=null
        this.count=null
        this.img=''
        this.popularity=null
        this.sale=null
        this.colors=null
    },
    addNewProduct(){
        const token:string|null=localStorage.getItem('cms');
        if(token){
            fetch(api.base+'/products',{
                method:'POST',
                headers:{Authorization:`Bearer ${token}`,'Content-Type':'application/json'},
                body:JSON.stringify({
                    title:this.title,
                    price:this.price,
                    count:this.count,
                    img:this.img,
                    popularity:this.popularity,
                    sale:this.sale,
                    colors:this.colors,
                })
            }).then(response=>response.json()).then((response:IResponse)=>{
                if(response.error){
                    alert(response.msg)
                }else{
                    this.resetForm()
                    this.getProductList()
                }
            })
        }

    },
    getProductList(){
        const token:string|null=localStorage.getItem('cms');
        if(token){
            fetch(api.base+'/products',{
                headers:{Authorization:`Bearer ${token}`}
            }).
            then(response=>response.json()).
            then((response:IResponse)=>{
                if(response.error){
                    console.log(response.msg)
                }else{
                    //@ts-ignore
                    this.productsList=response.data
                }
            })
        }
    },
    removeProduct(id:number){
        const token:string|null=localStorage.getItem('cms');
        if(token){
            fetch(api.base+`/products/${id}`,{
                method:'DELETE',
                headers:{Authorization:`Bearer ${token}`}
            }).then(response=>response.json()).then((response:IResponse)=>{
                if(response.error){
                    alert(response.msg)
                }else{
                    this.onDeleteModal=false;
                    this.productId=null;
                    this.getProductList()
                }
            })
        }

    },
    closeEditModal(){
      this.onEditModal=false
      this.resetForm()
    },
    getProductDetail(){
      const idx=this.productsList.findIndex(item=>item.id===this.productId)
        return this.productsList[idx]
    },
    editProduct(){
        const token:string|null=localStorage.getItem('cms');
        if(token){
            fetch(api.base+`/products/${this.productId}`,{
                method:'PUT',
                headers:{Authorization:`Bearer ${token}`,'Content-Type':'application/json'},
                body:JSON.stringify({
                    title:this.title,
                    price:this.price,
                    count:this.count,
                    img:this.img,
                    popularity:this.popularity,
                    sale:this.sale,
                    colors:this.colors,
                })
            }).then(response=>response.json()).then((response:IResponse)=>{
                if(response.error){
                    alert(response.msg)
                }else{
                    this.onEditModal=false
                    this.productId=null
                    this.resetForm()
                    this.getProductList()
                }
            })
        }



    },

})