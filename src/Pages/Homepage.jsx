import React, { useEffect, useState, useRef } from 'react';
import { Box,Text,Avatar,useToast, List, ListItem, Button, Input, Divider, Container, Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Image,
  ModalFooter,
  Textarea,
  Spinner
} from '@chakra-ui/react';
import axios from 'axios'
import { API_URL } from '../helper';
import Navbar from '../component/Navbar';
import {useSelector, useDispatch} from 'react-redux'
import {GoUnverified} from 'react-icons/go'
import { logoutAction } from '../action/useraction';
import { useNavigate,} from 'react-router-dom';
import { AiFillLike,AiOutlineLike} from "react-icons/ai";
import InfiniteScroll from 'react-infinite-scroll-component';


const Homepage = () => {
  const [dataPosting, setDataPosting]=useState([])
  const [addComment, setAddComment]=useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const toast = useToast()
  const [fetchStatus, setFetchStatus]=useState(false)
  // state posting
  const [img,setImg]=useState()
  const [caption,setCaption]=useState('')
  const hiddenFileInput = useRef(null)
  const [toggle, setToggle]=useState(false)
  // pagination 
  const [page, setPage] = useState(1)


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



  useEffect(() => {
    setTimeout(()=>{
      axios.get(API_URL+`/posting?page=${page}&pageSize=5`)
      .then((res)=>{
        if(res.data.length > 0 ){
          const newPost = res.data
          setDataPosting([...dataPosting,...newPost])
        }else{
          setPage(1)
          
        }
      }).catch((err)=>{
        console.log(err)
      })

    },500)
}, [page]);

useEffect(()=>{
  if(fetchStatus){
      axios.get(API_URL+`/posting?page=1&pageSize=5`)
      .then((res)=>{
          setDataPosting(res.data)
          setPage(1)
      }).catch((err)=>{
        console.log(err)
      })
      setFetchStatus(false)
      

  }
}, [fetchStatus])

const getMoreData = () => {
    setPage(prev=> prev + 1)
}

const submitComment =(e)=>{
  let idPosting = parseInt(e.target.value)
  axios.post(API_URL + '/comment',{
    comment:addComment,
    user_comment_id:id,
    posting_id:idPosting
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

// Post posting

const submitPosting = ()=>{
  let formData = new FormData();
  formData.append('data',JSON.stringify({
    caption,
    users_id:id
  }))
  formData.append('images',img)
  axios.post(API_URL+`/posting`,formData).then((res)=>{
    if(res.data.success){
      toast({
        title:'Posting Submited',
        status:'success',
        duration: 2000,
        isCloseable:true
      })
      setFetchStatus(true)
      setToggle(!toggle)
    }
  })
  .catch((err)=>{
    console.log(err)
    toast({
      title: 'Error submitted',
      description: err.message,
      status: 'error',
      duration: 2000,
      isClosable: true,
    })
  })
}

const handleClick = event => {
  hiddenFileInput.current.click();
};

const imgChange =((e)=>{
  if (e.target.files && e.target.files.length > 0) {
    setImg(e.target.files[0]);
  }
})

const removeImg = () => {
  setImg();
};


  const printData=()=>{
    return dataPosting.map((val,idx)=>{
      let addLike
      return(
        <div className='col-lg-12' key={idx}>
        <div className='card w-100 h-100 mb-3'>
          <div className='d-flex mx-2 my-2'>
          <Avatar size={'sm'} src={API_URL+val.avatar}>
          </Avatar>
          <Text fontFamily={'serif'} fontSize={'md'} ms={'5'}>{val.user_name_post}</Text>
          </div>
          <img  src={API_URL+ val.images} className='card-img-top w-100' style={{height:'300px'}} />
          <div className='card-body'>
            <div>
            {
              val.likes.map(data=>{
                if(data.idusers === id){
                  addLike = data
                }
              })
            }
            {
              addLike ? (
            <Button variant={'unstyled'}  onClick={()=>{deleteLike(addLike.id)}} >
              <AiFillLike/>
            </Button> 
              ) : (
                <Button variant={'unstyled'}  onClick={()=>{submitLike(val.idposting)}} >
              <AiOutlineLike/>
            </Button>
              )
            }
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
          <Button size={'xs'} border={'none'} bgColor={'white'} variant={'unstyled'} textColor={'blue'} value={val.idposting} onClick={submitComment}>Post</Button>
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
        <Navbar
          onClickOpenModal={()=>{
            setToggle(true)
          }}
        />
      <div style={{backgroundColor:'#F6F7F9', paddingTop:'20px'}}>
      <div className='container ' >
        <div className='row'>
          <div className='col-4 d-md-block d-none'>
          </div>
          <div className='col-lg-4 col-md-6 col-sm-6 col-xs-6 align-item-center' >
            <div>
          <InfiniteScroll
        dataLength={dataPosting.length}
        next={getMoreData}
        hasMore={true}
        loader={
          <div className='d-flex justify-content-center'>
            <Spinner 
             thickness={'4px'}
             speed={'0.65s'}
             emptyColor={'gray.200'}
             color={'blue.500'}
             size={'xl'}
            />
          </div>
      }
        >
            {printData()}
            </InfiniteScroll>
            </div>
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
    {/* MODAL POST POSTING */}
     <Modal isOpen={toggle} onClose={()=>setToggle(!toggle, setImg())} size={'xl'} >
          <ModalOverlay/>
          <ModalContent background={'whiteAlpha.800'}>
            <ModalHeader>Add Your Image</ModalHeader>
            <ModalCloseButton/>
            <ModalBody>
              <div className='row'>
                <div className=''>
              <div className=''>
                <div className='d-flex justify-content-center'>
                </div>
                <div className='d-flex justify-content-center'>
              <Image src={img ? URL.createObjectURL(img) : 'https://pertaniansehat.com/v01/wp-content/uploads/2015/08/default-placeholder.png' } 
              boxSize={'lg'}/>
              </div>
              {
                img&&
              <div className='d-flex justify-content-center'>
              <Button  colorScheme={'red'} onClick={removeImg} bg={'red.600'}>Remove</Button>
              </div>
              }
              </div>
              {!img &&
              <div className='d-flex justify-content-center'>
                <Input variant={'flushed'} mt={3} ref={hiddenFileInput} display={'none'} accept='image/*'onChange={imgChange} type='file'/>
                <Button onClick={handleClick} colorScheme={'telegram'}> Select Picture</Button>
              </div>
              
              }
                </div>
                <div className=''>
                  <Box size={100}  >
                    {
                      img &&
                      <Textarea placeholder='Write Caption' bg={'white'} resize={'none'} mt={10} maxH={'400px'}   border={'none'}  className='border-0' onChange={(e)=>setCaption(e.target.value)} type='text' />
                    }
                  </Box>
                  </div>
              </div>
            </ModalBody>
            <ModalFooter>
              {
                img &&
              <Button colorScheme={'teal'} type='submit' onClick={submitPosting}>
                Submit
              </Button>
              }
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
    )
};

export default Homepage;
