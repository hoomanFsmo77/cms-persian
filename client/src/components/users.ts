import {api,IResponse} from "../helper";

export default ()=>({
    allUsersList:[] as any[],
    userId:null as number|null,
    detailModalFlag:false as boolean,
    deleteModalFlag:false as boolean,
    editModalFlag:false as boolean,
    firstname:'' as string,
    lastname:'' as string,
    username:'' as string,
    password:'' as string,
    phone:'' as string,
    city:'' as string,
    email:'' as string,
    score:null as number|null,
    buy:null as number|null,
    closeAllModal(){
        this.detailModalFlag=false
        this.deleteModalFlag=false
        this.editModalFlag=false
    },
    getAllUsers(){
        const token:string|null=localStorage.getItem('cms');
        if(token){
            fetch(api.base+'/users',{
                headers:{Authorization:`Bearer ${token}`}
            }).then(response=>response.json()).then((response:IResponse)=>{
                if(response.error){
                    alert(response.msg)
                }else{
                    this.allUsersList=response.data
                }
            })
        }


    },
    openDetailModal(id:number){
        this.userId=id
        this.detailModalFlag=true
    },
    openEditModal(id:number){
        const token=localStorage.getItem('cms')
        if(token){
            fetch(api.base+`/users/${id}`,{
                headers:{Authorization:`Bearer ${token}`}
            }).then(response=>response.json()).then((response:IResponse)=>{
                if(response.error){
                    alert(response.msg)
                }else{
                   const {firstname,lastname,username,password,phone,city,email,score,buy}=response.data;
                   this.firstname=firstname
                   this.lastname=lastname
                   this.username=username
                   this.password=password
                   this.phone=phone
                   this.city=city
                   this.email=email
                   this.score=score
                   this.buy=buy
                   this.userId=id
                   this.editModalFlag=true
                }
            })
        }



    },
    openDeleteModal(id:number){
        this.userId=id
        this.deleteModalFlag=true
    },
    get getUser(){
        const idx=this.allUsersList.findIndex(item=>item.id===this.userId);
        const target=this.allUsersList[idx]
        if(target){
            return {city:target.city,buy:target.buy,score:target.score}
        }
    },
    deleteUser(){
        const token=localStorage.getItem('cms')
        if(token){
            fetch(api.base+`/users/${this.userId}`,{
                method:'DELETE',
                headers:{Authorization:`Bearer ${token}`}
            }).then(response=>response.json()).then(response=>{
                if(response.error){
                    alert(response.msg)
                }else{
                    this.userId=null
                    this.deleteModalFlag=false
                    this.getAllUsers()
                }
            })
        }
    },
    editUser(){
        const token=localStorage.getItem('cms')
        if(token){
            fetch(api.base+`/users/${this.userId}`,{
                method:'PUT',
                headers:{Authorization:`Bearer ${token}`,'Content-Type':'application/json'},
                body:JSON.stringify({
                    firstname:this.firstname,
                    lastname:this.lastname,
                    username:this.username,
                    password:this.password,
                    phone:this.phone,
                    city:this.city,
                    email:this.email,
                    score:this.score,
                    buy:this.buy,
                })
            }).then(response=>response.json()).then(response=>{
                if(response.error){
                    alert(response.msg)
                }else{
                    this.userId=null
                    this.editModalFlag=false
                    this.getAllUsers()
                }
            })
        }
    }
})