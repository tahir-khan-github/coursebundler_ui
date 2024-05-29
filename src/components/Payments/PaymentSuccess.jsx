import { Box, Button, Container, Heading, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import { RiCheckboxCircleFill } from 'react-icons/ri'
import { Link, useSearchParams } from 'react-router-dom'

const PaymentSuccess = () => {

const reference = useSearchParams()[0].get("reference");

  return <Container h={'90vh'} p='16'>
    <Heading my={'8'} textAlign={'center'} children='You have Pro Pack'/>
    <VStack boxShadow={'lg'} pb={'16'} textAlign={'center'} borderRadius={'lg'}>
      <Box bg={'yellow.400'} p={'4'} css={{borderRadius: '8px 8px 0 0'}} w={'full'}>
            <Text color={'black'} children='Payment Success'/>
      </Box>
      <Box p={'4'}>
          <VStack textAlign={'center'} px={'8'} mt={'4'} spacing={'8'}>
            <Text>Congratulation You're a pro member, You have access to premium content.</Text>
            <Heading size={'4xl'}>
              <RiCheckboxCircleFill />
            </Heading>
          </VStack>
      </Box>

      <Link to={"/profile"}>
        <Button variant={"ghost"}>Go to profile</Button>
      </Link>

      <Heading size={"xs"} children={reference} />

    </VStack>
  </Container>
}

export default PaymentSuccess