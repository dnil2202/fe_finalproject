import { Avatar, Button, Container, Input, Stack , Text} from '@chakra-ui/react'
import React from 'react'
import Navbar from '../component/Navbar'
import { useNavigate } from 'react-router-dom';

const ChangePassword = () => {
    const navigate = useNavigate()
  return (
    <div>
        <Navbar/>
        <div style={{backgroundColor:'#F6F7F9', paddingTop:'20px', height:'100vh'}}>
            <Container maxWidth={'container.sm'} bg={'white'} borderColor={'aqua'} border={'1px'}>
                <div className='row'>
                    <div className='col-4 border-end border-dark' >
                        <Button border={'none'} size={'sm'} _hover={'none'} mb={'5'} bg={'white'} textColor={'gray'} onClick={()=>navigate('/edit')}>Edit Profile</Button>
                        <Button border={'none'} size={'sm'} _hover={'none'} bg={'white'} >Change Password</Button>
                    </div>
                    <div className='col-8'>
                        <div className='d-flex mx-5 mt-3 '>
                            <Avatar size={'sm'}></Avatar>
                            <div>
                            <Text fontSize={'sm'} ms={5}>Daniel Herianto Sibarani</Text>
                            </div>
                        </div>
                        <div className='  mt-3 w-100' >
                            <div className='d-flex justify-content-center mb-4'>
                                <Text className='fw-bold' fontSize={'sm'}>Password Lama</Text>
                                <Input size={'sm'} ms={14} w={'60'} bg={'gray.200'} />
                            </div>
                            <div className='d-flex justify-content-center mb-4'>
                                <Text className='fw-bold' fontSize={'sm'}>Password Baru</Text>
                                <Input size={'sm'} w={'60'} ms={14} bg={'gray.200'} />
                            </div>
                            <div className='d-flex justify-content-center mb-4'>
                                <Text className='fw-bold' fontSize={'sm'}>Konfirmasi Sandi Baru</Text>
                                <Input size={'sm'} w={'60'} ms={2} bg={'gray.200'}  />
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

export default ChangePassword