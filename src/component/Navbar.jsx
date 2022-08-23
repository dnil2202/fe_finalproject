import React, {useState,useRef} from 'react'
import {
    chakra,
    Box,
    Flex,
    useColorModeValue,
    VisuallyHidden,
    HStack,
    Button,
    useDisclosure,
    Text,
    Avatar,
    Input,
    MenuButton,
    Menu,
    MenuList,
    MenuItem,
    Container,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    Image,
    ModalFooter,
    useToast,
    Textarea
  } from "@chakra-ui/react";
  import { AiOutlineMenu, AiFillHome, AiFillMessage,AiFillPlusCircle,AiFillHeart} from "react-icons/ai";
  import { useNavigate } from 'react-router-dom';
  import images from '../image/image-1271454.png'
  import {useDispatch, useSelector} from 'react-redux'
import { logoutAction } from '../action/useraction';
import axios from 'axios';
import { API_URL } from '../helper';


const Navbar = () => {
    const [toggle, setToggle]=useState(false)
    const bg = useColorModeValue("white", "gray.800");
    const mobileNav = useDisclosure();
    const navigate = useNavigate()
    const dispatch=useDispatch()
    const toast = useToast()

    const [img,setImg]=useState()
    const [caption,setCaption]=useState('')
    const hiddenFileInput = useRef(null)


    console.log(img)

    const{id,status,images}= useSelector((state)=>{
      return {
          id:state.userReducer.idusers,
          status:state.userReducer.status,
          images:state.userReducer.images
          
      }
  })


    const onLogout = ()=>{
      dispatch(logoutAction())
      navigate('/')
    }

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
          setToggle(!toggle)
          window.location.reload()
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
    <Container>
    <React.Fragment>
    <chakra.header
      bg={bg}
      w="full"
      px={{ base: 5, sm: 4 }}
      py={1}
      >
      <Flex alignItems="center" justifyContent="space-around" mx="auto">
        <Flex>
          <chakra.a
            href="/"
            title="Choc Home Page"
            display="flex"
            alignItems="center"
          >
            <VisuallyHidden>Choc</VisuallyHidden>
          </chakra.a>
          <chakra.h1 fontSize="xl" fontStyle={'oblique'} fontWeight="bold" me={'40'} >
            GUILD
          </chakra.h1>
        </Flex>
        <HStack display="flex" alignItems="center" spacing={1}>
        <Input placeholder='search' width={'250px'} size={'sm'} rounded={'3xl'}  />
          <HStack
            spacing={1}
            color="brand.500"
            display={{ base: "none", md: "inline-flex" }}
          >
            <Button variant="ghost" onClick={()=>navigate('/home')}><AiFillHome size={24}/></Button>
            {/* <Button variant="ghost" ><AiFillMessage size={24}/></Button> */}
            {
              status == 'Verified' &&
              <>
            <Button variant="ghost" onClick={()=>setToggle(!toggle)}><AiFillPlusCircle size={24}/></Button>
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
              </>
            }
            {/* <Button variant="ghost"><AiFillHeart size={24}/></Button> */}
            <Menu>
              <MenuButton>
                <div className='d-flex'>
                <Text as={'sup'} mt={5} me={2}textColor={status=='Unverified'?'red.400':'blue.600'} className='fw-bold'>{status}</Text>
                <Avatar size={'sm'} src={API_URL+images}></Avatar>
                </div>
              </MenuButton>
              <MenuList width={'fit-content'} >
                <MenuItem onClick={()=>navigate(`/profil/`)}>Profile</MenuItem>
                <MenuItem>Setting</MenuItem>
                <hr/>
                <MenuItem onClick={onLogout}>Logout</MenuItem>
              </MenuList>
            </Menu>
          </HStack>
        </HStack>
      </Flex>
    </chakra.header>
  </React.Fragment>
            </Container>
  )
    
}

export default Navbar