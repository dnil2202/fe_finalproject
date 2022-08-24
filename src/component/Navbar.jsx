import React, {useState,useRef,useEffect} from 'react'
import {
    chakra,
    Box,
    Flex,
    useColorModeValue,
    VisuallyHidden,
    HStack,
    Button,
    useDisclosure,
    Text,
    Avatar,
    Input,
    MenuButton,
    Menu,
    MenuList,
    MenuItem,
    Container,
    useToast,
  } from "@chakra-ui/react";
  import { AiOutlineMenu, AiFillHome, AiFillMessage,AiFillPlusCircle,AiFillHeart} from "react-icons/ai";
  import { useNavigate } from 'react-router-dom';
  import images from '../image/image-1271454.png'
  import {useDispatch, useSelector} from 'react-redux'
import { logoutAction } from '../action/useraction';
import axios from 'axios';
import { API_URL } from '../helper';

const Navbar = (props) => {
  
    const bg = useColorModeValue("white", "gray.800");
    const navigate = useNavigate()
    const dispatch=useDispatch()
    const toast = useToast()



    const{id,status,images}= useSelector((state)=>{
      return {
          id:state.userReducer.idusers,
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
    <React.Fragment>
      <Flex alignItems="center" justifyContent="space-around" mx="auto">
        <Flex>
          <chakra.h1 fontSize="xl" fontStyle={'oblique'} fontWeight="bold" me={'40'} >
            GUILD
          </chakra.h1>
        </Flex>
        <HStack display="flex" alignItems="center" spacing={1}>
        <Input placeholder='search' width={'250px'} size={'sm'} rounded={'3xl'}  />
          <HStack
            spacing={1}
            color="brand.500"
            display={{ base: "none", md: "inline-flex" }}
          >
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
                <Text as={'sup'} mt={5} me={2}textColor={status=='Unverified'?'red.400':'blue.600'} className='fw-bold'>{status}</Text>
                <Avatar size={'sm'} src={API_URL+images}></Avatar>
                </div>
              </MenuButton>
              <MenuList width={'fit-content'} >
                <MenuItem onClick={()=>navigate(`/profil/`)}>Profile</MenuItem>
                <MenuItem>Setting</MenuItem>
                <hr/>
                <MenuItem onClick={onLogout}>Logout</MenuItem>
              </MenuList>
            </Menu>
          </HStack>
        </HStack>
      </Flex>
  </React.Fragment>
            </Container>
  )
    
}

export default Navbar