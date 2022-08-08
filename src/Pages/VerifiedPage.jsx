import { Container, Box, Text, Heading, Input, Button } from '@chakra-ui/react'
import React from 'react'
import Footer from '../component/footer'
import {BiMailSend} from 'react-icons/bi'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { API_URL } from '../helper'
import { useDispatch } from 'react-redux'
import { loginAction } from '../action/useraction'

const VerifiedPage = () => {
    const params = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleVerified = async()=>{
        try {
            let res = await axios.patch(`${API_URL}/auth/verified`,{},{
                headers:{
                    'Authorization':`Bearer ${params.token}`
                }
            })
            console.log(res)
            if(res.data.success){
                localStorage.setItem('sosmed', res.data.dataLogin.token);
                delete res.data.dataLogin.token;
                dispatch(loginAction(res.data.dataLogin))
                navigate('/home',{replace:true})
            }else{
                alert('Verification Failed')
            }
        } catch (error) {
            console.log(error)
        }
    }


  return (
    <div style={{backgroundColor:'#F6F7F9'}} >
        <Container style={{backgroundSize:'cover', height:'100vh'}} pt={20} >
            <Container border={'1px'} borderColor={'gray.400'} backgroundColor={'white'} boxSize={'xs'} >
                <div className='d-flex justify-content-center'>
                <BiMailSend size={100}></BiMailSend>
                </div>
                <Heading textAlign={'center'} size={'md'}>Verified Your Account</Heading>
                <Text textAlign={'center'} fontSize={'sm'} mt={'3'} className='text-muted'>After Register You can access all features with verified your account </Text>
                <div className='d-flex justify-content-center mt-3'>
                <Button colorScheme={'telegram'} onClick={handleVerified}>Click To Verified</Button>
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