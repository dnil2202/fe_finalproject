import { Text } from '@chakra-ui/react';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const NotFoundPage = (props) => {
    // const navigate = useNavigate();
    // const { iduser } = useSelector((state) => {
    //     return {
    //         iduser: state.userReducer.iduser
    //     }
    // });

    // React.useEffect(() => {
    //     console.log(iduser)
    //     if (iduser) {
    //         navigate('/', { replace: true });
    //     }
    // }, [iduser]);

    return <div className='container main-page'>
        <Text textAlign='center' fontSize='6xl'>
            PAGE NOT FOUND
        </Text>
    </div>
}

export default NotFoundPage;