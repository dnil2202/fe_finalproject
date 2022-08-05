import { Avatar, Box, Button, Container,Text, Image, Stack,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Input,
    MenuButton,
    MenuList,
    MenuItem,
    Menu
} from '@chakra-ui/react'
import React, {useState} from 'react'
import Navbar from '../component/Navbar'
import axios from 'axios'
import { API_URL } from '../helper'
import {useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { AiOutlineMenu } from 'react-icons/ai'




const ProfilPage = () => {
    const [toggle, setToggle]=useState(false)
    const [postDetail, setPostDetail] = useState([])
    const navigate=useNavigate()

    const{username, posting}= useSelector((state)=>{
        return {
            username:state.userReducer.username,
            posting:state.userReducer.posting
        }
    })

    console.log(posting)

    const openModalDetail=(toggle, val)=>{
        setPostDetail(val)
        setToggle(!toggle)
    }
  
//     const getData =()=>{
//       axios.get(API_URL+'/user')
//       .then((res)=>{
//         setDataPosting(res.data[0].posting)
//         setDataUser(res.data)
//       }).catch((err)=>{
//         console.log(err)
//       })
//     }
  
//     React.useEffect(() => {
//       getData();
//   }, []);

  const printData = ()=>{
    return posting.map((val,idx)=>{
        return(
            <div className='col-4'>
            <Stack direction={'row'}>
                <Image boxSize={'2xs'} onClick={()=>openModalDetail(toggle, val)}  my={'5'} src={API_URL+val.images}/>
            </Stack>
            </div>
        )
    })
  }
  return (
    <div>
        <Navbar/>
        <div style={{backgroundColor:'#F6F7F9', paddingTop:'20px', height:'100vh'}}>
            <Container borderColor={'red'} maxW={'container.md'}>
                <Box border={'2px'} borderTop={'none'} borderLeft={'none'} borderRight={'none'} borderBlockEndColor={'gray.400'}  marginY={5}>
                    <div className=' row pb-5 ps-5 '>
                        <div className='col-3 d-flex justify-content-end'>
                            <Box>
                                <Avatar size={'xl'}>
                                </Avatar>
                            </Box>
                        </div>
                        <div className='col-8'>
                            <div className='d-flex'>
                                <Text>{username}</Text>
                                <Button size={'xs'} onClick={()=>navigate('/edit')}> Edit Profil</Button>
                            </div>
                            <div className='d-flex'>
                                <Text fontSize={'xs'} fontFamily={'sans-serif'} color={'black'} mt={5}>10 KIRIMAN</Text>
                                <Text fontSize={'xs'} fontFamily={'sans-serif'} color={'black'} mt={5} ms={5}>20 Pengikut</Text>
                                <Text fontSize={'xs'} fontFamily={'sans-serif'} color={'black'} mt={5} ms={5}>20 Mengikuti</Text>
                            </div>
                        </div>
                    </div>
                </Box>
                <div className='row '>
                    {printData()}
                </div>
            </Container>
        </div>
            <Modal isOpen={toggle} onClose={()=>setToggle(!toggle)} size={'5xl'}>
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader></ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody>
                        <div className='row'>
                            <Box className='col-7'>
                                <Image src={postDetail.images} boxSize={'xl'}/>
                            </Box>
                            <Box className='col-5' boxShadow={'xl'}>
                                <div className='row'>
                                    <div className='col-6 d-flex '>
                                    <Avatar size={'xs'} mb={'4px'} me={'4px'}></Avatar>
                                    <Text >{username}</Text>
                                    </div>
                                    <div className='col-6 d-flex justify-content-end'>
                                       <Menu>
                                        <MenuButton>
                                            <AiOutlineMenu/>
                                        </MenuButton>
                                        <MenuList width={'fit-content'}>
                                            <MenuItem>Edit Caption</MenuItem>
                                            <MenuItem>Delete</MenuItem>
                                        </MenuList>
                                       </Menu>
                                    </div>
                                </div>
                                <Box mt={3} border={'1px'} borderEnd={'none'} borderStart={'none'} borderTop={'none'} className='d-flex'>
                                </Box>
                                <div className='mt-2 d-flex'>
                                <Avatar size={'xs'} me={1}></Avatar>
                                <Text className='fw-bold'>{username}</Text>
                                <Text ms={1} textAlign={'justify'}>{postDetail.caption}</Text>
                                </div>
                                <Text className='text-muted' as={'sup'}>{postDetail.add_date.split('').splice(0,10).join('')}</Text>
                            </Box>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        {/* <Input placeholder='add comment'/> */}
                    </ModalFooter>
                </ModalContent>
            </Modal>
    </div>
  )
}

export default ProfilPage