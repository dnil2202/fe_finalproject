import React, {useState,useEffect} from 'react'
import Navbar from '../component/Navbar'
import { useLocation,useNavigate } from 'react-router-dom' 
import { Avatar, 
  Box, 
  Button, 
  Container, 
  Divider, 
  useToast, 
  Text, 
  Image, 
  Textarea,
  MenuButton,
  MenuList,
  MenuItem,
  Menu,
} from '@chakra-ui/react'
import { API_URL } from '../helper'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { AiOutlineMenu } from 'react-icons/ai'
import { AiFillLike,AiOutlineLike} from "react-icons/ai";
import {FcCheckmark} from "react-icons/fc";
import {MdCancel} from "react-icons/md";

const PostingDetail = () => {
  const {state} = useLocation()
  const toast = useToast()
  const[toggleEdit,setToggleEdit]=useState(false)
  const[updateCaption, SetUpdateCaption]=useState(' ')
  const navigate = useNavigate()

  const [addComment, setAddComment]=useState('')
  const [detail, setDetail] = useState('');
  const [fetchStatus,setFetchStatus]=useState(true)

  const [limit,setLimit]=useState(5)
  const [more,setMore]=useState(true)
  
  
  const {id,username}= useSelector((state)=>{
    return{
      id : state.userReducer.idusers,
      username : state.userReducer.username,
    }
  })
console.log(detail)


 
useEffect(()=>{
  if(fetchStatus){
    axios.get(API_URL + `/posting/${state.idposting}?page=1&pageSize=${limit}`)
    .then((res) => {
      setDetail(res.data[0])
      if(res.data[0].comment){
        setMore(res.data[0].comment.length === limit ? true: false)
      }else{
        setMore(false)
      }
        
    }).catch((err) => {
        console.log(err);
    })
    setFetchStatus(false)
  }
},[fetchStatus,state]);
  

  const submitComment =(e)=>{
    let idPosting = parseInt(e.target.value)
    axios.post(API_URL + '/comment',{
      comment:addComment,
      user_comment_id:id,
      posting_id:state.idposting
    }).then((res)=>{
      if(res.data.success){
        setFetchStatus(true)
        setAddComment('')
        toast({
          title: "Comment Submited",
          description: `Comment Success`,
          status: "success",
          duration: 3000,
          isClosable: true
      })
      }
    }).catch((err)=>{
      toast({
        title: err.response.data.message,
        description: err.message,
        status: 'error',
        duration: 2000,
        isClosable: true,
      })
    })
  }

const updatePosting =()=>{
    axios.patch(API_URL+`/posting/${state.idposting}`,{
        caption:updateCaption.length>0?updateCaption:state.caption
    })
    .then((res)=>{
        if(res.data.success){
          setFetchStatus(true)
            toast({
                title:"Updated Caption",
                desctiption: "Updated Caption",
                status:"success",
                duration:5000,
                isClosable:true
            })
            setToggleEdit(!toggleEdit)
        }
    }).catch((err)=>{
        toast({
            title:`${err}`,
            desctiption: 'eror',
            status:"warning",
            duration:3000,
            isClosable:true
        })
    })
    
}

const deletePosting = ()=>{
  axios.delete(API_URL+`/posting/${state.idposting}`)
  .then((res)=>{
    navigate('/profil')       
    setFetchStatus(true) 
      toast({
          title: 'Your posting has deleted',
          description: `success delete`,
          status: 'success',
          duration: 3000,
          isCloseable: true,
      })
  })
  .catch((err)=>{
      toast({
          title: 'Error Deleted',
          description: err.message,
          status: 'error',
          duration: 2000,
          isClosable: true,
      });
  })
}

const getMoreComment = () => {
  setLimit(prev=> prev + 5)
  setFetchStatus(true)
}

const submitLike =(idposting)=>{
  let idLike = parseInt(idposting)
  console.log(idLike)
    axios.post(API_URL+'/like',{
      postId:idLike,
      userId:id,
    }).then((res)=>{
      setFetchStatus(true)
      console.log(res.data)
    }).catch((err)=>{
      console.log(err)
    })
}

const deleteLike =(idLike)=>{
    let id = parseInt(idLike)
  axios.delete(API_URL+`/like/${id}`)
  .then((res)=>{
    console.log(res)
    setFetchStatus(true)
  }).catch((err)=>{
    console.log(err)
  })
}


let addLike
  return (
      <div>
        <Navbar/>
        <div style={{backgroundColor:'#F6F7F9', paddingTop:'80px', height:'100vh'}}>
            <Container  maxW={'4xl'} >
              <div>
              <div className='row shadow'>
                <div className='col-7' >
                  <div>
                  <Image boxSize={'lg'} ms={3}  src={API_URL+detail.images} />
                  </div>
                </div>
                <Box className='col-5 card'>
                  <div className='d-flex justify-content-between'>
                    <div className='d-flex mt-3'>
                  <Avatar size={'sm'}  src={API_URL+detail.avatar}/>
                  <Text fontFamily={'serif'} fontSize={'sm'} mt={1} ms={2}>{detail.user_name_post}</Text>
                    </div>
                    {
                      username === state.user_name_post &&
                      <div>
                        <Menu>
                        <MenuButton>
                            <AiOutlineMenu className='mt-4'/>
                        </MenuButton>
                        <MenuList width={'fit-content'}>
                          <MenuItem onClick={()=>setToggleEdit(!toggleEdit)}>Edit Caption</MenuItem>
                          <MenuItem onClick={deletePosting}>Delete</MenuItem>
                        </MenuList>
                        </Menu>
                      </div>
                
                    }
                  </div>
                  <Divider mt={3}/>
                  <div>
                    {toggleEdit ?
                     <div>
                     <Textarea onChange={(e)=>SetUpdateCaption(e.target.value)}  defaultValue={detail.caption} size={''} />
                     <Button size={'sm'} onClick={updatePosting} me={5} variant={'unstyled'} ><FcCheckmark size={20}/></Button>
                     <Button size={'sm'} variant={'unstyled'} onClick={()=>setToggleEdit(!toggleEdit)}><MdCancel color={'red'} size={20}/></Button>
                 </div>
                 :
                    <Text fontFamily={'serif'} fontSize={'md'}>{detail.caption}</Text>
                    }
                    <Text fontSize={'xs'} className='text-muted mb-4'>{state.add_date.split('').splice(0,10).join('')}</Text>
                    <Box className='overflow-auto' maxHeight={'200px'}>
                    <div className='my-4 overflow-auto'>
                    {
              detail.comment &&
              detail.comment.map((v)=>{
                return  (
                <div className='mt-2'>
                <Text as={'sup'} className='fw-bold me-2'>{v.user_name_comment}</Text>
                <Text as={'sup'} className='text-muted'>{v.comment}</Text>
                </div>
                )
              })
            }{
              more ? 
              <Button variant={'none'} size={'xs'} onClick={getMoreComment} className='text-muted fw-bold' >see more comment</Button>
              :
              ''
            }
                    </div>
                    </Box>
                    <Divider color={'gray.100'}/>
            <div>
              {
                detail.likes &&
                detail.likes.map((v)=>{
                  if(v.idusers === id){
                    addLike = v
                  }
                })
              }
                {
              addLike ? (
            <Button variant={'unstyled'}  onClick={()=>{deleteLike(addLike.id)}} >
              <AiFillLike/>
            </Button> 
              ) : (
                <Button variant={'unstyled'}  onClick={()=>{submitLike(state.idposting)}} >
              <AiOutlineLike/>
            </Button>
              )
            }
            </div>
            <div>
            {
              detail.likes &&
            detail.likes ?
            <Text as={'sup'} className='fw-bold' >{detail.likes.length} Likes</Text>
            :
            <Text as={'sup'} className='fw-bold' >0 Likes</Text>
          }
          </div>
          <div className='footer mt-5' >
          <Divider color={'gray.100'}/>
          <div className='d-flex card-footer bg-white'>
            <Textarea size={'sm'} placeholder='Add Comment' variant={'unstyled'} onChange={(e)=>setAddComment(e.target.value)} value={addComment} />
            <Button variant={'ghost'} size={'xs'} mt={10} textColor={'blue'} value={detail.idposting} onClick={submitComment} >POST</Button>
          </div>
          </div>
                  </div>
                </Box>
              </div>
              </div>
            </Container>
        </div>
    </div>
  )
}

export default PostingDetail