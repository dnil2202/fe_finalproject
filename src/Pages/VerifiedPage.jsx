import { Container, Box, Text, Heading, Input, Button } from '@chakra-ui/react'
import React from 'react'
import Footer from '../component/footer'
import {BiMailSend} from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'

const VerifiedPage = () => {
    const navigate = useNavigate()
  return (
    <div style={{backgroundColor:'#F6F7F9'}} >
        <Container style={{backgroundSize:'cover', height:'100vh'}} pt={20} >
            <Container border={'1px'} borderColor={'gray.400'} backgroundColor={'white'} boxSize={'xs'} >
                <div className='d-flex justify-content-center'>
                <BiMailSend size={100}></BiMailSend>
                </div>
                <Heading textAlign={'center'} size={'md'}>Enter Confirmation Code</Heading>
                <Text textAlign={'center'} fontSize={'sm'} mt={'3'} className='text-muted'>Enter the confirmation code we sent to your email </Text>
                <div className='d-flex justify-content-center mt-3'>
                <Input size={'md'} width={'50'} backgroundColor={'gray.100'}/>
                </div>
                <div className='d-flex justify-content-center mt-3'>
                <Button colorScheme={'telegram'}> Next</Button>
                </div>
            </Container>
            <Container  border={'1px'} borderColor={'gray.400'} backgroundColor={'white'} width={'xs'}  mt={5}>
                <div className='d-flex justify-content-center'>
                    <Text py={5}>Have an account?</Text>
                    <Text py={5} ps={1} textColor={'blue.400'} onClick={()=>navigate('/login')} >Login</Text>
                </div>
            </Container>
        </Container>
        <Footer/>
    </div>
  )
}

export default VerifiedPage