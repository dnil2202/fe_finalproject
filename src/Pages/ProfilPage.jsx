import { Avatar, Box, Button, Container,Text, Image, Stack,
    useToast,
    Tabs,
    TabList,
    Tab,
    TabPanels,
    TabPanel,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Modal,
    Textarea,
    Input
} from '@chakra-ui/react'
import React, {useState,useRef} from 'react'
import Navbar from '../component/Navbar'
import axios from 'axios'
import { API_URL } from '../helper'
import {useSelector} from 'react-redux'
import { useNavigate} from 'react-router-dom'
import { useEffect } from 'react'




const ProfilPage = () => {
    const navigate=useNavigate()
    const toast = useToast()

    const [dataPosting,setDataPosting]=useState([])
    const [dataLike,setDataLike]=useState([])
    const [fetchStatus, setFetchStatus]=useState(false)

      // state posting
  const [img,setImg]=useState()
  const [caption,setCaption]=useState('')
  const hiddenFileInput = useRef(null)
  const [toggle, setToggle]=useState(false)

    const{id,username,email,bio,avatar,status}= useSelector((state)=>{
        return {
            
            id:state.userReducer.idusers,
            username:state.userReducer.username,
            email:state.userReducer.email,
            avatar:state.userReducer.images,
            bio:state.userReducer.bio,
            status:state.userReducer.status,
        
        }
    })

    console.log(dataLike)

    const getData = ()=>{
        axios.get(API_URL+`/posting/profile/${id}`)
        .then((res)=>{
            setDataPosting(res.data)
        }).catch((err)=>{
          console.log(err)
        })
    }

    useEffect(()=>{
       getData()
       getDataLike()
    },[fetchStatus])

    const getDataLike = ()=>{
        axios.get(API_URL+`/like/${id}`)
        .then((res)=>{
            setDataLike(res.data)
        }).catch((err)=>{
          console.log(err)
        })
    }

    const resendVerif = async ()=>{
        try {
            await axios.post(`${API_URL}/auth/resend/`,{
                email:email
            }).then((res)=>{
                // console.log(res.data.token)
                toast({
                    title:"Success please cek your email",
                    desctiption: `Welcome ${res.data.username}`,
                    status:"success",
                    duration:5000,
                    isClosable:true
                })
            })
        } catch (error) {
            console.log(error)
        }
    }

  const printDataPosting = ()=>{
    return dataPosting.map((val)=>{
        return(
            <div className='col-4' key={val.id}>
            <Stack direction={'row'}>
                <Image boxSize={'2xs'} my={'5'} src={API_URL+val.images} onClick={()=>navigate(`/p/${val.idposting}`,{state:val})} />
            </Stack>
            </div>
        )
    })
  }

  const printDataLike = ()=>{
    return dataLike.map((val)=>{
        return(
            <div className='col-4' key={val.id}>
            <Stack direction={'row'}>
                <Image boxSize={'2xs'} my={'5'} src={API_URL+val.images} onClick={()=>navigate(`/p/${val.idposting}`,{state:val})} />
            </Stack>
            </div>
        )
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
        console.log(formData)
      if(res.data.success){
        console.log(res)
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

  return (
    <div>
        <Navbar onClickOpenModal={()=>{
            setToggle(true)
          }}/>
        <div style={{backgroundColor:'#F6F7F9', paddingTop:'20px', height:'100vh'}}>
            <Container borderColor={'red'} maxW={'container.md'}>
                {
                    status === 'Unverified' &&
                    <>
                    <div className='d-flex justify-content-center'>
                    <Button textAlign={'center'} textColor={'red.300'} variant={'unstyled'} onClick={resendVerif}>Please click to resend verification link to access all features</Button>
                    </div>
                    </>
                }
                <Box >
                    <div className=' row pb-2 ps-5 '>
                        <div className='col-3 d-flex justify-content-end'>
                            <Box>
                                <Avatar size={'lg'} src={API_URL+avatar}>
                                </Avatar>
                            </Box>
                        </div>
                        <div className='col-8'>
                            <div className='d-flex mb-3'>
                                <Text>{username}</Text>
                                <Button size={'xs'} onClick={()=>navigate('/edit')}> Edit Profil</Button>
                            </div>
                                <Text as={'sup'}>{bio}</Text>
                        </div>
                    </div>
                </Box>
                <Tabs variant='enclosed'  align='center'>
                    <TabList>
                        <Tab>Own Post</Tab>
                        <Tab>Liked Post</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                        <div className='row '>
                            {printDataPosting()}
                         </div>
                        </TabPanel>
                        <TabPanel>
                        <div className='row '>
                            {printDataLike()}
                         </div>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
             
            </Container>
        </div>
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
}

export default ProfilPage