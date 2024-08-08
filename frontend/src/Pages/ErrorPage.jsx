import React from 'react'
import { Box,Button} from '@chakra-ui/react'
import ErrorLogo from "../assets/ErrorLogo.webp"
import { useHistory } from 'react-router-dom'



const ErrorPage = () => {
  const history = useHistory();
  return (
    <Box
      display="flex"
      justifyContent="center"
    >
      <Box bg="#ffffff" h="70vh" w="50vw" display="flex" justifyContent="center" alignItems="center" flexDir="column">
           <div><img src={ErrorLogo} alt="Error Logo" /></div>
           <div><Button colorScheme='blue' onClick={function(){history.push("./"); history.go(1);}}>Go To Login Page</Button></div>
      </Box>
    </Box>
  )
}

export default ErrorPage