import React,{useState} from 'react';
import images from '../image/mountains-7302806.jpg';
import { useNavigate } from 'react-router-dom';
import { Box, Input, Stack, Text, Button } from '@chakra-ui/react/'
import { useDispatch } from 'react-redux';
import { loginMiddleWare } from '../action/useraction';
import Footer from '../component/footer';
import { BsFillEyeFill } from 'react-icons/bs';


const LandingPages = (props) => {
    const dispatch = useDispatch()
    const navigate=useNavigate()
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [notifLogin,setNotifLogin]=useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [visible,setVisible]=useState('password')


    console.log('email :',email)

    const onLogin=async()=>{
        setIsLoading(true)
            let res = await dispatch(loginMiddleWare(email,password))
        if(res.success){
            navigate('/home', {replace:true})
            setIsLoading(false)
        }else{
            setNotifLogin(true)
            setIsLoading(false)
        }
    }

    const showPass = ()=>{
        if(visible==="password"){
            setVisible("text")
        }else if(visible==="text"){
            setVisible("password")
        }
    }


    return (
        <div>
        <div style={{backgroundImage: `url(${images})`, backgroundSize:'cover', height:'100vh'}}>
            <div className='container pt-5'>
                <div className='d-flex justify-content-end'>
                <Box backgroundColor={'whiteAlpha.600'} shadow={'xl'}  w={400}>
            <Text textAlign={'center'} color={'blackAlpha.800'} fontSize={50} fontStyle={'unset'} mb={5} >GUILD</Text>
            <Stack spacing={3} mx={10} >
                <Input onChange={(e)=>setEmail(e.target.value)} placeholder='Email or Username' size='sm' />
                <div className='d-flex border-1' >
                <Input onChange={(e)=>setPassword(e.target.value)} placeholder='Password' size='sm' type={visible} variant={'unstyled'} borderEnd={'none'} ps={2}  />
                <span className="input-group-text bg-transparent border-0 rounded-0" onClick={showPass} ><BsFillEyeFill/></span>
                </div>
            </Stack>
            <div className='d-flex justify-content-center mt-5'>
            <Button type='button' onClick={onLogin} w={100} colorScheme={'blue'} textColor={'white'} isLoading={isLoading} isDisabled={email.length>0 && password.length>0 ?false:true && isLoading} mb={3}> SIGN IN</Button>
            </div>
            <div className='my-2'>
            </div>
                {
                    notifLogin &&
                    <Text textColor={'red.400'} textAlign={'center'}>The username you entered doesn't belong to an account. Please check your username and try again.</Text>
                }
            <Text textAlign={'center'} my={3} textColor={'gray.600'} fontSize={'revert'}  >OR</Text>
            <div className='d-flex justify-content-center'>
            <Button w={200} colorScheme={'white'}  textColor={'gray.600'} mb={5} onClick={()=>navigate('/reset')} > Forgot Password</Button>
            </div>
            <Text textAlign={'center'} mt={3} textColor={'gray.600'} fontSize={'revert'}  >DON'T HAVE AN ACCOUNT ?</Text>
            <div className='d-flex justify-content-center'>
            <Button w={200} colorScheme={'white'} textColor={'blue.600'} mb={100} onClick={()=>navigate('/register')} > SIGN UP</Button>
            </div>
        </Box>
                </div>
            </div>
            
        </div>
        <Footer/>
        </div>
    );
};

export default LandingPages;
