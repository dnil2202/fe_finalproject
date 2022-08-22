import React, {useState} from 'react'
import Navbar from '../component/Navbar'
import { useLocation } from 'react-router-dom' 
import { Avatar, Box, Button, Container, Divider, useToast, Text, Image, Textarea } from '@chakra-ui/react'
import { API_URL } from '../helper'
import axios from 'axios'
import { useSelector } from 'react-redux'

const PostingDetail = () => {
  const {state} = useLocation()
  const toast = useToast()
  console.log(state)

  const [addComment, setAddComment]=useState('')

  const {id}= useSelector((state)=>{
    return{
      id : state.userReducer.idusers,
    }
  })

  const submitComment =(e)=>{
    let idPosting = parseInt(e.target.value)
    axios.post(API_URL + '/comment',{
      comment:addComment,
      user_comment_id:id,
      posting_id:state.idposting
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
  
  return (
      <div>
        <Navbar/>
        <div style={{backgroundColor:'#F6F7F9', paddingTop:'80px', height:'100vh'}}>
            <Container  maxW={'3xl'} >
              <Box >
              <div className='row'>
                <div className='col-7'>
                  <div>
                  <Image src={API_URL+state.images} style={{height:'50vh'}}/>
                  </div>
                </div>
                <div className='col-5 card'>
                  <div className='d-flex mt-3'>
                    <div>
                  <Avatar size={'sm'}  src={API_URL+state.avatar}/>
                    </div>
                  <Text fontFamily={'serif'} fontSize={'sm'} mt={1} ms={2}>{state.user_name_post}</Text>
                  </div>
                  <Divider mt={3}/>
                  <div>
                    <Text fontFamily={'serif'} fontSize={'md'}>{state.caption}</Text>
                    <Text fontSize={'xs'} className='text-muted'>{state.add_date.split('').splice(0,10).join('')}</Text>
                    <div className='my-4'>
                    {
              state.comment &&
              state.comment.map((v)=>{
                return  (
                <div className='my-2'>
                <Text as={'sup'} className='fw-bold me-2'>{v.user_name_comment}</Text>
                <Text as={'sup'} className='text-muted'>{v.comment}</Text>
                </div>
                )
              })
            }
                    </div>
                    <Divider color={'gray.100'}/>
            <div>
            {state.likes ?
            <Text as={'sup'} className='fw-bold' >{state.likes.length} Likes</Text>
            :
            <Text as={'sup'} className='fw-bold' >0 Likes</Text>
          }
          </div>
          <div className='footer mt-5' >
          <Divider color={'gray.100'}/>
          <div className='d-flex card-footer bg-white'>
            <Textarea size={'sm'} placeholder='Add Comment' variant={'unstyled'} onChange={(e)=>setAddComment(e.target.value)} value={addComment} />
            <Button variant={'ghost'} size={'xs'} mt={10} textColor={'blue'} value={state.idposting} onClick={submitComment} >POST</Button>
          </div>
          </div>
                  </div>
                </div>
              </div>
              </Box>
            </Container>
        </div>

    </div>
  )
}

export default PostingDetail