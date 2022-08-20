import React, { useEffect, useState } from 'react';
import { Box,Text,Avatar, List, ListItem, Button, Input, Divider, Container } from '@chakra-ui/react';
import axios from 'axios'
import { API_URL } from '../helper';
import Navbar from '../component/Navbar';
import {useSelector, useDispatch} from 'react-redux'
import {GoUnverified} from 'react-icons/go'
import { logoutAction } from '../action/useraction';
import { useNavigate } from 'react-router-dom';


const Homepage = () => {
  const [dataPosting, setDataPosting]=useState([])
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {fullname,username,images,status} = useSelector((state)=>{
    return{
      fullname : state.userReducer.fullname,
      username : state.userReducer.username,
      images : state.userReducer.images,
      status : state.userReducer.status
    }
  })

  // console.log(dataPosting[0].likes)

  const getData =()=>{
    axios.get(API_URL+'/posting')
    .then((res)=>{
      setDataPosting(res.data)
    }).catch((err)=>{
      console.log(err)
    })
  }

  React.useEffect(() => {
    getData();
}, []);

const onLogout = ()=>{
  dispatch(logoutAction())
  navigate('/')
}


  const printData=()=>{
    return dataPosting.map((val,idx)=>{
      return(
        <div className='col-lg-12' key={val.idposting}>
        <div className='card w-100 h-100 mb-3'>
          <div className='d-flex mx-2 my-2'>
          <Avatar size={'sm'} src={API_URL+val.avatar}>
          </Avatar>
          <Text fontFamily={'serif'} fontSize={'md'} ms={'5'}>{val.user_name_post}</Text>
          </div>
          <img src={API_URL+ val.images} className='card-img-top w-100' style={{height:'300px'}} />
          <div className='card-body'>
            {val.likes ?
            <Text as={'sup'} className='fw-bold' >{val.likes.length} Likes</Text>
            :
            <Text as={'sup'} className='fw-bold' >0 Likes</Text>
          }
            <p className='card-title'>{val.caption}</p>
            {
              val.comment &&
              val.comment.map((v)=>{
                console.log(v.comment)
                console.log('=======================================disini')
                return  (
                <div className='w-75'>
                <Text as={'sup'} className='fw-bold me-2'>{v.user_name_comment}</Text>
                <Text as={'sup'} className='text-muted'>{v.comment}</Text>
                </div>
                )
              })
             
            }
          <div className='mb-2'>
            <small className='text-muted'>{val.add_date.split('').splice(0,10).join('')}</small>
          </div>
          <Divider/>
          <div className='d-flex justify-content-between'>
          <Input size={'sm'} border={'none'} variant={'unstyled'} placeholder='Tambahkan Komentar anda'></Input>
          <Button size={'xs'} border={'none'} bgColor={'white'} variant={'unstyled'} textColor={'blue'}>Post</Button>
          </div>
          </div>
        </div>
        </div>
      )
    })
  }

    return (
      <div >
        {
          status == 'Unverified'?
          <>
          <Navbar/>
          <div style={{backgroundColor:'#F6F7F9', paddingTop:'20px', height:'100vh'}}>
          <Container >
            <div className='d-flex justify-content-center'>
              <Box shadow={'md'} mt={20} boxSize={'md'}  bgColor={'white'}>
                <div className='d-flex justify-content-center mb-5 mt-5'>
                  <GoUnverified size={100}/>
                  </div>
                <Text textAlign={'center'}>Your account Unverified</Text>
              <Text textAlign={'center'}>Verified Your account first for access all feature</Text>
              <div className='d-flex justify-content-center'>
              <Button mt={3} onClick={onLogout} colorScheme='telegram'>Logout</Button>
              </div>
              </Box>
            </div>
          </Container>
          </div>
          </>
          :(
            <>
        <Navbar/>
      <div style={{backgroundColor:'#F6F7F9', paddingTop:'20px'}}>
      <div className='container ' >
        <div className='row'>
          <div className='col-4 d-md-block d-none'>
          </div>
          <div className='col-lg-4 col-md-6 col-sm-6 col-xs-6 align-item-center' >
            {printData()}
          </div>
          <div className='col-lg-4 col-md-6 col-sm-6 col-xs-6'>
            <div className='d-flex'>
            <Avatar mb={5} src={API_URL+images}></Avatar>
            <div className='mt-2 ms-3'>
            <Text fontSize={'xs'} textColor={'black'}>{username}</Text>
            <Text fontSize={'xs'} className='text-muted' >{fullname}</Text>
            </div>
            </div>
            <Box border={'1px'} height={'max-content'} borderColor={'gray.400'} w={'sm'} width={'xs'} >
              <List spacing={3} mt={2}>
                <ListItem>
                  <div className='d-block'>
                <div className='d-flex mb-2 justify-content-between'>
                  <div className='d-flex'>
                  <Avatar size={'xs'} mx={5}/>
                  <Text fontSize={'xs'} mt={1}>Admin</Text>
                  </div>
                  <Button size={'xs'} colorScheme={'whiteAlpha'} textColor={'blue.400'}>Ikuti</Button>
                </div>
                <div className='d-flex mb-2 justify-content-between'>
                  <div className='d-flex'>
                  <Avatar size={'xs'} mx={5}/>
                  <Text fontSize={'xs'} mt={1}>Admin</Text>
                  </div>
                  <Button size={'xs'} colorScheme={'whiteAlpha'} textColor={'blue.400'}>Ikuti</Button>
                </div>
                <div className='d-flex mb-2 justify-content-between'>
                  <div className='d-flex'>
                  <Avatar size={'xs'} mx={5}/>
                  <Text fontSize={'xs'} mt={1}>Admin</Text>
                  </div>
                  <Button size={'xs'} colorScheme={'whiteAlpha'} textColor={'blue.400'}>Ikuti</Button>
                </div>
                <div className='d-flex mb-2 justify-content-between'>
                  <div className='d-flex'>
                  <Avatar size={'xs'} mx={5}/>
                  <Text fontSize={'xs'} mt={1}>Admin</Text>
                  </div>
                  <Button size={'xs'} colorScheme={'whiteAlpha'} textColor={'blue.400'}>Ikuti</Button>
                </div>
                  </div>
                </ListItem>
              </List>
            </Box>
          </div>
        </div>
      </div>
      </div>
      </>
    )}
      </div>
    )
};

export default Homepage;
