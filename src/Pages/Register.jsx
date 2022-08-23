import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Input, Stack, Text, Button,useToast } from '@chakra-ui/react/'
import axios from 'axios'
import { API_URL } from '../helper'
import { BsFillEyeFill } from 'react-icons/bs';

const Register = () => {
    const navigate = useNavigate()
    const toast = useToast()
    const [visible,setVisible]=useState('password')
    const [isLoading, setIsLoading]=useState(false)

    const [input,setInput]=useState({
        username:'',
        email:'',
        password:'',
        fullname:'',
    })
    const [isWeakPass, setIsWeakPass] = useState(false)
    const [repeatPass, setRepeatPass]=useState('') 
    console.log('repeat',repeatPass)
    console.log('input',input.password)

    const onChange =(event)=>{
        const {value, name} = event.target

        if(name === 'password') {
            const isStrongPass = value.match("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})")
            if(!isStrongPass){
                setIsWeakPass(true)
            }else{
                setIsWeakPass(false)
            }
        }
        console.log(value)
            setInput({...input, [name]:value})
    }
    const onSubmit = ()=>{
        setIsLoading(true)
        let{username,email,password,fullname} = input
                axios.post(API_URL+'/auth/regis',{
                    fullname,
                    username,
                    email,
                    password
                })
                .then((res)=>{
                    console.log('data token',res.data)
                    if(res.data.success){
                        navigate('/',{replace:true})
                        toast({
                            title:"Account created Silahkan Cek Email",
                            desctiption: `Welcome ${res.data.username}`,
                            status:"success",
                            duration:5000,
                            isClosable:true
                        })
                    }
                    setIsLoading(false)
                }).catch((err)=>{
                    setIsLoading(false)
                    toast({
                        title:`${err.response.data.message}`,
                        desctiption: 'eror',
                        status:"warning",
                        duration:3000,
                        isClosable:true
                    })
                })
    }
    const showPass = ()=>{
        if(visible=="password"){
            setVisible("text")
        }else if(visible=="text"){
            setVisible("password")
        }
    }

  return (
      <div style={{backgroundColor:'#F6F7F9', height:'100vh'}}>
        <div className=' d-flex justify-content-center pt-3'>
            <Box backgroundColor={'whiteAlpha.600'} shadow={'xl'}>
                <Text textAlign={'center'} color={'blackAlpha.800'} fontSize={50} fontStyle={'unset'} py={5}  onClick={()=>navigate('/')} >GUILD</Text>
                <Text className='text-secondary' textAlign={'center'} fontSize={'1xl'} mx={10} pb={5} >Sign Up To Explore With Your Community</Text>
                <Stack spacing={3} className="d-flex align-items-center" >
                    <Input w={300} placeholder='Email' size='sm' value={input.email} name='email' onChange={onChange} type='email' />
                    <Input w={300} placeholder='Full Name' size='sm' value={input.fullname} name='fullname' onChange={onChange} type='text' />
                    <Input w={300} placeholder='Username' size='sm' value={input.username} name='username' onChange={onChange} type='text' />
                </Stack>
                    <div className='input-group border-round d-flex justify-content-center mt-3'>
                    <Input w={260}  placeholder='Password' size='sm' value={input.password} isInvalid={isWeakPass} name='password' onChange={onChange} type={visible}  />
                    <span className="input-group-text bg-transparent border-start-0" onClick={showPass} ><BsFillEyeFill/></span>
                    </div>
                    <div>
                    {isWeakPass && <Text as={'sup'} ms={10} textColor={'red.300'}>Your password is weak</Text>}
                    </div>
                    <div className='input-group border-round d-flex justify-content-center mt-3'>
                    <Input w={260}  placeholder='Password' size='sm' value={repeatPass} name='repeat' onChange={(e)=>setRepeatPass(e.target.value)} type={visible}  />
                    <span className="input-group-text bg-transparent border-start-0" onClick={showPass} ><BsFillEyeFill/></span>
                    </div>
                      <div>
                    {repeatPass != input.password && <Text as={'sup'} ms={10} textColor={'red.300'}>Not Match</Text>}
                    </div>
                <div className='my-2'>
                <Text textAlign={'center'} my={3} textColor={'gray.400'} fontSize={'sm'}  > By signin up you agree to our term,</Text>
                <Text textAlign={'center'} my={3} textColor={'gray.400'} fontSize={'sm'}>Data Policy and Cookies Policy</Text>
                </div>
                <div className='d-flex justify-content-center'>
                <Button w={300} colorScheme={'blue'} mb={5} onClick={onSubmit} isLoading={isLoading} isDisabled={input.password === repeatPass && input.password.length >0 && input.email.includes('@') && input.email.includes('.co') && !isWeakPass?false:true}> SIGN UP</Button>
                </div>
                <div className='mb-5 d-flex justify-content-center'>
                <Text textAlign={'center'}  textColor={'gray.400'} fontSize={'sm'}  >HAVE AN ACCOUNT ?</Text>
                <Text textAlign={'center'} textColor={'blue.400'} fontSize={'sm'} onClick={()=>navigate('/')}> LOGIN</Text>
                </div>
            </Box>
        </div>
      </div>
  )
}

export default Register