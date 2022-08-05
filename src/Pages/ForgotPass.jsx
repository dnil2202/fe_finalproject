import React from 'react'
import { Box, Text, Input, Stack, Button } from '@chakra-ui/react/'
import {GiLockedDoor} from 'react-icons/gi';
import { useNavigate } from 'react-router-dom';

const ForgotPass = () => {
    const navigate = useNavigate()
  return (
    <div style={{backgroundColor:'#F6F7F9', backgroundSize:'cover', height:'100vh'}}>
        <div className='d-flex justify-content-center pt-5'>
            <Box backgroundColor={'whiteAlpha.600'} shadow={'xl'} border={'1px'} className='w-25'>
                <div className='d-flex justify-content-center'>
                <GiLockedDoor size={100} />
                </div>
                <Text className='fw-bolder text-center pt-2'>Trouble Login</Text>
                <Text className='text-center text-muted px-3'>Enter your email, phone, or username and we'll send you a link to get back into your account.</Text>
                <Stack className='d-flex' pt={5} mx={10}>
                <Input placeholder='Email,or Username' size={'md'}></Input>
                </Stack>
                <div className='d-flex justify-content-center pt-3'>
                    <Button colorScheme={'blue'} w={150}>Send Login Link</Button>
                </div>
                    <Text textAlign={'center'} my={3} textColor={'blackAlpha.400'} fontSize={'revert'}  >OR</Text>
                <div className='d-flex justify-content-center'>
                    <Button colorScheme={'white'} textColor={'black'} onClick={()=>navigate('/register')} >Create New Account</Button>
                </div>
                <div>
                    <Button w={350} mt={150} onClick={()=>navigate('/login')}>Back To Login</Button>
                </div>
            </Box>
            

        </div>
    </div>
  )
}

export default ForgotPass