import React, { useEffect, useState } from 'react';
import { Box,Text,Avatar,useToast, List, ListItem, Button, Input, Divider, Container } from '@chakra-ui/react';
import axios from 'axios'
import { API_URL } from '../helper';
import Navbar from '../component/Navbar';
import {useSelector, useDispatch} from 'react-redux'
import {GoUnverified} from 'react-icons/go'
import { logoutAction } from '../action/useraction';
import { useNavigate, useParams } from 'react-router-dom';
import { AiFillLike,AiFillDislike,AiOutlineLike} from "react-icons/ai";


const Homepage = () => {
  const [dataPosting, setDataPosting]=useState([])
  const [addComment, setAddComment]=useState('')
  const [addLike, setAddLike]=useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const toast = useToast()
  const params = useParams()

  const {id,fullname,username,images,status,likes} = useSelector((state)=>{
    return{
      id : state.userReducer.idusers,
      fullname : state.userReducer.fullname,
      username : state.userReducer.username,
      images : state.userReducer.images,
      status : state.userReducer.status,
      likes : state.userReducer.like
    }
  })


  const getData =()=>{
    axios.get(API_URL+'/posting')
    .then((res)=>{
      setDataPosting(res.data)
    }).catch((err)=>{
      console.log(err)
    })
  }

  React.useEffect(() => {
    getData();
}, []);

const submitComment =(e)=>{
  let idPosting = parseInt(e.target.value)
  axios.post(API_URL + '/comment',{
    comment:addComment,
    user_comment_id:id,
    posting_id:idPosting
  }).then((res)=>{
    if(res.data.success){
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

const submitLike =(e)=>{
  let idLike = parseInt(e.target.value)
  console.log(idLike)
    axios.post(API_URL+'/like',{
      postId:idLike,
      userId:id,
    }).then((res)=>{
      setAddLike(true)
      console.log(res.data)
    }).catch((err)=>{
      console.log(err)
    })
}




  const printData=()=>{
    return dataPosting.map((val,idx)=>{
      // console.log(val)
      return(
        <div className='col-lg-12' key={val.idposting}>
        <div className='card w-100 h-100 mb-3'>
          <div className='d-flex mx-2 my-2'>
          <Avatar size={'sm'} src={API_URL+val.avatar}>
          </Avatar>
          <Text fontFamily={'serif'} fontSize={'md'} ms={'5'}>{val.user_name_post}</Text>
          </div>
          <img  src={API_URL+ val.images} className='card-img-top w-100' style={{height:'300px'}} />
          <div className='card-body'>
            <div>
          <Button size={'xs'} border={'none'} bgColor={'white'} variant={'unstyled'} value={val.idposting} onClick={submitLike}>
            {
             addLike ? 'Unlike' : 'Like' 
            }
            </Button>
            </div>
            <div>
            {val.likes ?
            <Text as={'sup'} className='fw-bold' >{val.likes.length} Likes</Text>
            :
            <Text as={'sup'} className='fw-bold' >0 Likes</Text>
          }
          </div>
            <p className='card-title'>{val.caption}</p>
            <Button variant={'unstyled'} size={'xs'} className='text-muted' onClick={()=> navigate(`/p/${val.idposting}`,{
              state:val
            })} >{val.comment ?`View all ${val.comment.length} Comment`:'View all'}</Button>
            {
              val.comment &&
              val.comment.map((v)=>{
                return  (
                <div className='w-75'>
                <Text as={'sup'} className='fw-bold me-2'>{v.user_name_comment}</Text>
                <Text as={'sup'} className='text-muted'>{v.comment}</Text>
                </div>
                )
              })
            }
          <div className='mb-2'>
            <small className='text-muted'>{val.add_date.split('').splice(0,10).join('')}</small>
          </div>
          <Divider/>
          <div className='d-flex justify-content-between'>
          <Input size={'sm'} border={'none'} variant={'unstyled'} onChange={(e)=>setAddComment(e.target.value)} value={addComment} placeholder='Tambahkan Komentar anda'></Input>
          <Button size={'xs'} border={'none'} bgColor={'white'} variant={'unstyled'} textColor={'blue'} value={val.idposting} onClick={submitComment}  >Post</Button>
          </div>
          </div>
        </div>
        </div>
      )
    })
  }

    return (
      <div >
        {
          status == 'Unverified'?
          <>
          <Navbar/>
          <div style={{backgroundColor:'#F6F7F9', paddingTop:'20px', height:'100vh'}}>
          <Container >
            <div className='d-flex justify-content-center'>
              <Box shadow={'md'} mt={20} boxSize={'md'}  bgColor={'white'}>
                <div className='d-flex justify-content-center mb-5 mt-5'>
                  <GoUnverified size={100}/>
                  </div>
                <Text textAlign={'center'}>Your account Unverified</Text>
              <Text textAlign={'center'}>Verified Your account first for access all feature</Text>
              </Box>
            </div>
          </Container>
          </div>
          </>
          :(
            <>
        <Navbar/>
      <div style={{backgroundColor:'#F6F7F9', paddingTop:'20px'}}>
      <div className='container ' >
        <div className='row'>
          <div className='col-4 d-md-block d-none'>
          </div>
          <div className='col-lg-4 col-md-6 col-sm-6 col-xs-6 align-item-center' >
            {printData()}
          </div>
          <div className='col-lg-4 col-md-6 col-sm-6 col-xs-6'>
            <div className='d-flex'>
            <Avatar mb={5} src={API_URL+images}></Avatar>
            <div className='mt-2 ms-3'>
            <Text fontSize={'xs'} textColor={'black'}>{username}</Text>
            <Text fontSize={'xs'} className='text-muted' >{fullname}</Text>
            </div>
            </div>
          </div>
        </div>
      </div>
      </div>
      </>
    )}
      </div>
    )
};

export default Homepage;
