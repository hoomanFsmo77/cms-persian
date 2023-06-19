import {api,IResponse} from "../helper";

export default ()=>({
    commentsList:[] as any[],
    detailModalFlag:false as boolean,
    editModalFlag:false as boolean,
    answerModalFlag:false as boolean,
    deleteModalFlag:false as boolean,
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
        const reply=this.commentsList.filter(item=>item.replyId===this.commentId)
        const idx=this.commentsList.findIndex(item=>item.id===this.commentId)
        const target=this.commentsList[idx];
        if(target){
            return {body:target.body,reply:reply}
        }
    },
    openEditModal(id:number){
        this.editModalFlag=true
        this.commentId=id;
        this.content=this.getComment().body
    },
    openDeleteModal(id:number){
        this.deleteModalFlag=true
        this.commentId=id;
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

    },
    openAnswerModal(id:number){
        this.commentId=id
        this.content=''
        this.answerModalFlag=true
    },
    answerComment(){
        const token=localStorage.getItem('cms')
        const idx=this.commentsList.findIndex(item=>item.id===this.commentId)
        const target=this.commentsList[idx];
        if(token){
            fetch(api.base+`/comments/answer/${this.commentId}`,{
                method:'POST',
                headers:{Authorization:`Bearer ${token}`,'Content-Type':'application/json'},
                body:JSON.stringify({
                    answer:this.content,
                    date:'1401-9-8',
                    hour:'23:21',
                    productID:target.productId,
                    userID:target.userID
                })
            }).then(response=>response.json()).then((response:IResponse)=>{
                if(response.error){
                    alert(response.msg)
                }else{
                    this.commentId=null
                    this.content=''
                    this.answerModalFlag=false
                    this.getCommentsList()
                }
            })
        }
    },
    deleteComment(){
        const token=localStorage.getItem('cms')
        if(token){
            fetch(api.base+`/comments/${this.commentId}`,{
                method:'DELETE',
                headers:{Authorization:`Bearer ${token}`}
            }).then(response=>response.json()).then(response=>{
                if(response.error){
                    alert(response.msg)
                }else{
                    this.commentId=null
                    this.deleteModalFlag=false
                    this.getCommentsList()
                }
            })
        }
    },
    changeCommentStatus(status:number,id:number){
        const token=localStorage.getItem('cms')
        if(token){
            fetch(api.base+`/comments/status/${id}/${status}`,{
                method:'PUT',
                headers:{Authorization:`Bearer ${token}`}
            }).then(response=>response.json()).then((response:IResponse)=>{
                if(response.error){
                    alert(response.msg)
                }else{
                    this.getCommentsList()
                }
            })
        }

    }



})