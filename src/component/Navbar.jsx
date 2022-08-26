import React, {useState,useRef,useEffect} from 'react'
import {
    chakra,
    Box,
    Flex,
    useColorModeValue,
    HStack,
    Button,
    Text,
    Avatar,
    Input,
    MenuButton,
    Menu,
    MenuList,
    MenuItem,
    Container,
    useToast,
    Divider,
  } from "@chakra-ui/react";
  import {AiFillHome,AiFillPlusCircle} from "react-icons/ai";
  import { useNavigate } from 'react-router-dom';
  import {useDispatch, useSelector} from 'react-redux'
import { logoutAction } from '../action/useraction';
import { API_URL } from '../helper';

const Navbar = (props) => {
  
    const navigate = useNavigate()
    const dispatch=useDispatch()



    const{status,images,username}= useSelector((state)=>{
      return {
          username:state.userReducer.username,
          status:state.userReducer.status,
          images:state.userReducer.images
          
      }
  })

    const onLogout = ()=>{
      dispatch(logoutAction())
      navigate('/')
    }

  return (
    <Container>
      <Flex alignItems="center" justifyContent="space-around" mx="auto">
        <Flex>
          <chakra.h1 fontSize="xl" fontStyle={'oblique'} fontWeight="bold" me={'40'} >
            GUILD
          </chakra.h1>
        </Flex>
        <HStack display="flex" alignItems="center" spacing={1}>
        <Input placeholder='search' width={'250px'} size={'sm'} rounded={'3xl'}  />
          <HStack>
            <Button variant="ghost" onClick={()=>navigate('/home')}><AiFillHome size={24}/></Button>
            {/* <Button variant="ghost" ><AiFillMessage size={24}/></Button> */}
            {
              status == 'Verified' &&
              <>
            <Button variant="ghost" onClick={props.onClickOpenModal}><AiFillPlusCircle size={24}/></Button>
           
              </>
            }
            {/* <Button variant="ghost"><AiFillHeart size={24}/></Button> */}
            <Menu>
              <MenuButton>
                <div className='d-flex'>
                <Text as={'sup'} mt={5} me={2}textColor={status=='Unverified'?'red.400':'blue.600'} className='fw-bold'>{username}</Text>
                <Avatar size={'sm'} src={API_URL+images}></Avatar>
                </div>
              </MenuButton>
              <MenuList width={'fit-content'} >
                <MenuItem onClick={()=>navigate(`/profil/`)}>Profile</MenuItem>
                <MenuItem>Setting</MenuItem>
                <Divider/>
                <MenuItem onClick={onLogout}>Logout</MenuItem>
              </MenuList>
            </Menu>
          </HStack>
        </HStack>
      </Flex>
            </Container>
  )
    
}

export default Navbar