import { Alert, AlertIcon } from '@chakra-ui/react'
import { transform } from 'framer-motion'
import React from 'react'

const Error = ({message}) => {
  return <Alert status='error' position={"fixed"} bottom={"4"} left={"50%"} transform={"translate(-50%)"} w={"container.lg"}>
    <AlertIcon/>
      {message}

  </Alert>
}

export default Error
