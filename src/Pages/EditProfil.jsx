import { Avatar, Button, Container, Input, Stack , Text, useToast} from '@chakra-ui/react'
import React, { useState } from 'react'
import Navbar from '../component/Navbar'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { API_URL } from '../helper';

const EditProfil = () => {
    const navigate = useNavigate()
    const toast = useToast()

    const [newFullname,setNewFullName]=useState('')
    const [newUsername,setNewUserName]=useState('')
    const [newEmail,setNewEmail]=useState('')
    const [addAvatar,setAddAvatar]=useState('')


    const{id,fullname,username,email,images} = useSelector((state)=>{
        return{
            id:state.userReducer.idusers,
            fullname:state.userReducer.fullname,
            username:state.userReducer.username,
            email:state.userReducer.email,
            images:state.userReducer.images,
        }
    })

    const updateData =()=>{
        let formData = new FormData()
        formData.append('data',JSON.stringify({
            fullname: newFullname,
            username:newUsername,
            email:newEmail,
        }))
        formData.append('images',addAvatar)
        axios.patch(API_URL+`/auth/all/${id}`,formData).then((res)=>{
            if(res.data.success){
                toast({
                  title:'Update Data Success',
                  status:'success',
                  duration: 2000,
                  isCloseable:true
                })
              }
        }).catch((err)=>{
            toast({
                title: 'Error Upload',
                description: err.message,
                status: 'error',
                duration: 2000,
                isClosable: true,
              })
        })
    } 

    console.log(newFullname,newUsername,newEmail)
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
                            <Avatar size={'sm'} src={API_URL+images}></Avatar>
                            <div>
                            <Text fontSize={'sm'} ms={5}>{fullname}</Text>
                            <Input variant={'flushed'} size={'xs'} onChange={(e)=>setAddAvatar(e.target.files[0])} type='file'/>
                            </div>
                        </div>
                        <div className='  mt-3 w-100' >
                            <div className='d-flex justify-content-center mb-4'>
                                <Text className='fw-bold' fontSize={'sm'}>Nama</Text>
                                <Input size={'sm'} ms={12} w={'60'} bg={'gray.200'} defaultValue={fullname} onChange={(e)=>setNewFullName(e.target.value)} />
                            </div>
                            <div className='d-flex justify-content-center mb-4'>
                                <Text className='fw-bold' fontSize={'sm'}>User Name</Text>
                                <Input size={'sm'} w={'60'} ms={3} bg={'gray.200'} defaultValue={username} onChange={(e)=>setNewUserName(e.target.value)} />
                            </div>
                            <div className='d-flex justify-content-center mb-4'>
                                <Text className='fw-bold' fontSize={'sm'}>Email</Text>
                                <Input size={'sm'} w={'60'} ms={12} bg={'gray.200'} defaultValue={email} onChange={(e)=>setNewEmail(e.target.value)}  />
                            </div>
                        </div>
                        <div className='d-flex justify-content-center'>
                            <Button colorScheme={'messenger'} size={'sm'} mb={10} onClick={updateData}>Submit</Button>
                        </div>
                    </div>
                </div>
            </Container>
            
        </div>
    </div>
  )
}

export default EditProfil