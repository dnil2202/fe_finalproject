import React from 'react'
import { Box, Input, Stack, Text, Button } from '@chakra-ui/react/'
import { useNavigate } from 'react-router-dom'
import { loginAction } from '../action/useraction'
//useDispatch adalah action untuk mengamibl/menyimpan data ke global store
import { useDispatch } from 'react-redux'

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  return (
    <div style={{backgroundColor:'#F6F7F9', height:'100vh',}}>

      <div className=' d-flex justify-content-center pt-5'  >
         <Box backgroundColor={'whiteAlpha.600'} shadow={'xl'} border={'1px'} className='w-25'>
            <Text textAlign={'center'} color={'blackAlpha.800'} fontSize={50} fontStyle={'unset'} mb={5} onClick={()=>(navigate('/'))} >GUILD</Text>
            <Stack spacing={3} mx={10} >
                <Input placeholder='Email' size='lg' />
                <Input placeholder='Password' size='lg' />
            </Stack>
            <div className='d-flex justify-content-center mt-5'>
            <Button w={300} colorScheme={'blue'} mb={3}> SIGN IN</Button>
            </div>
            <div className='my-2'>
            </div>
            <Text textAlign={'center'} my={3} textColor={'gray.400'} fontSize={'revert'}  >OR</Text>
            <div className='d-flex justify-content-center'>
            <Button w={200} colorScheme={'white'}  textColor={'black'}  > SIGN IN WITH GOOGLE</Button>
            </div>
            <div className='d-flex justify-content-center'>
            <Button w={200} colorScheme={'white'}  textColor={'gray.400'} mb={5} onClick={()=>navigate('/reset')} > Forgot Password </Button>
            </div>
            <Text textAlign={'center'} my={3} textColor={'gray.400'} fontSize={'revert'}  >DON'T HAVE AN ACCOUNT ?</Text>
            <div className='d-flex justify-content-center'>
            <Button w={200} colorScheme={'white'} textColor={'blue.300'} mb={50} onClick={()=>navigate('/register')} > SIGN UP</Button>
            </div>
        </Box>

      </div>
    </div>
  )
}

export default Login