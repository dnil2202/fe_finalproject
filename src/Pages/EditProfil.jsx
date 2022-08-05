import { Avatar, Button, Container, Input, Stack , Text} from '@chakra-ui/react'
import React from 'react'
import Navbar from '../component/Navbar'
import { useNavigate } from 'react-router-dom';

const EditProfil = () => {
    const navigate = useNavigate()
  return (
    <div>
        <Navbar/>
        <div style={{backgroundColor:'#F6F7F9', paddingTop:'20px', height:'100vh'}}>
            <Container maxWidth={'container.sm'} bg={'white'} borderColor={'aqua'} border={'1px'}>
                <div className='row'>
                    <div className='col-4 border-end border-dark' >
                        <Button border={'none'} size={'sm'} _hover={'none'} mb={'5'} bg={'white'}  >Edit Profile</Button>
                        <Button border={'none'} size={'sm'} _hover={'none'} bg={'white'} textColor={'gray'} onClick={()=>navigate('/change')}>Change Password</Button>
                    </div>
                    <div className='col-8'>
                        <div className='d-flex mx-5 mt-3 '>
                            <Avatar size={'sm'}></Avatar>
                            <div>
                            <Text fontSize={'sm'} ms={5}>Daniel Herianto Sibarani</Text>
                            <Button size={'xs'} ms={3} border={'none'} _hover={'none'} textColor={'blue.600'} bg={'white'}>Ubah Foto Profil</Button>
                            </div>
                        </div>
                        <div className='  mt-3 w-100' >
                            <div className='d-flex justify-content-center mb-4'>
                                <Text className='fw-bold' fontSize={'sm'}>Nama</Text>
                                <Input size={'sm'} ms={12} w={'60'} bg={'gray.200'} />
                            </div>
                            <div className='d-flex justify-content-center mb-4'>
                                <Text className='fw-bold' fontSize={'sm'}>User Name</Text>
                                <Input size={'sm'} w={'60'} ms={3} bg={'gray.200'} />
                            </div>
                            <div className='d-flex justify-content-center mb-4'>
                                <Text className='fw-bold' fontSize={'sm'}>Email</Text>
                                <Input size={'sm'} w={'60'} ms={12} bg={'gray.200'}  />
                            </div>
                        </div>
                        <div className='d-flex justify-content-center'>
                            <Button colorScheme={'messenger'} size={'sm'} mb={10}>Submit</Button>
                        </div>
                    </div>
                </div>
            </Container>
            
        </div>
    </div>
  )
}

export default EditProfil