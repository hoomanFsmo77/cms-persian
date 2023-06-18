import {api,IResponse} from "../helper";

export default ()=>({
    commentsList:[] as any[],
    detailModalFlag:false as boolean,
    editModalFlag:false as boolean,
    content:'',
    commentId:null as number|null,
    getCommentsList(){
        const token=localStorage.getItem('cms')
        if(token){
            fetch(api.base+'/comments',{
                headers:{Authorization:`Bearer ${token}`}
            }).then(response=>response.json()).then((response:IResponse)=>{
                if(response.error){
                    alert(response.msg)
                }else{
                    this.commentsList=response.data
                }
            })
        }
    },
    getComment(){
        const idx=this.commentsList.findIndex(item=>item.id===this.commentId)
        return this.commentsList[idx]
    },
    openEditModal(id:number){
        this.editModalFlag=true
        this.commentId=id;
        this.content=this.getComment().body
    },
    editComment(){
        const token=localStorage.getItem('cms')
        if(token){
            fetch(api.base+`/comments/${this.commentId}`,{
                method:'PUT',
                headers:{Authorization:`Bearer ${token}`,'Content-Type':'application/json'},
                body:JSON.stringify({
                    body:this.content
                })
            }).then(response=>response.json()).then((response:IResponse)=>{
                if(response.error){
                    alert(response.msg)
                }else{
                    this.content=''
                    this.editModalFlag=false
                    this.getCommentsList()
                }
            })
        }

    }



})