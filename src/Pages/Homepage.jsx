import React, { useEffect, useState } from 'react';
import { Box,Text,Avatar, List, ListItem, Button, Input, Divider } from '@chakra-ui/react';
import axios from 'axios'
import { API_URL } from '../helper';
import Navbar from '../component/Navbar';
import {useSelector} from 'react-redux'


const Homepage = () => {
  const [dataPosting, setDataPosting]=useState([])

  const {fullname,username} = useSelector((state)=>{
    console.log(state)
    return{
      fullname : state.userReducer.fullname,
      username : state.userReducer.username
    }
  })

  console.log(dataPosting)

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


  const printData=()=>{
    return dataPosting.map((val,idx)=>{
      return(
        <div className='col-lg-12'>
        <div className='card w-100 h-100 mb-3'>
          <div className='d-flex mx-2 my-2'>
          <Avatar size={'sm'}>
          </Avatar>
          <Text fontFamily={'serif'} fontSize={'md'} ms={'5'}>{val.user_name_post}</Text>
          </div>
          <img src={API_URL+ val.images} className='card-img-top w-100' style={{height:'300px'}} />
          <div className='card-body'>
          <Text as={'sup'} >20 Likes</Text>
            <p className='card-title'>{val.caption}</p>
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
      <div>
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
            <Avatar mb={5}></Avatar>
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
      </div>
    )
};

export default Homepage;
