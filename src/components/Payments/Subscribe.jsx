import { Box, Container, Heading, VStack, Text, Button } from '@chakra-ui/react'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { server } from '../../redux/store';
import { buySubscription } from '../../redux/action/subscriptionAction';
import toast from 'react-hot-toast';
import logo from '../../assets/images/logo.png'

const Subscribe = () => {
  const dispatch = useDispatch();
  const {loading, error, subscriptionId} = useSelector(state=>state.subscription);
  const { courseError} = useSelector(state=>state.course);
  const { user} = useSelector(
    state => state.user
  );

  const [key,setKey] = useState('');

 const subscribeHandler = async ()=>{
 const {data:{key}} = await axios.get(`${server}/razorpaykey`,{withCredentials: true})
 setKey(key)

 dispatch(buySubscription())
 }

 useEffect(() => {
  if (error) {
    toast.error(error);
    dispatch({ type: 'clearError' });
  }

  if (courseError) {
    toast.error(courseError);
    dispatch({ type: 'clearError' });
  }

 if(subscriptionId){
  const openPopUp =()=>{
    const options = {
      key,
      name:"CourseBundler",
      description:"Get access to all premium content",
      image:logo,
      subscription_id:subscriptionId,
      order_id: "",
      callback_url: `${server}/paymentverification`,
      prefill: { 
          name: user.name,
          email: user.email,
          contact: ""
      },
      notes: {
          address: "6 pack programmer"
      },
      theme: {
          color: "#FFC800"
      }
    }
    const razor = new window.Razorpay(options)
    razor.open()

  }
  openPopUp()
 }


}, [dispatch,error,user.name, user.email,key,subscriptionId,courseError])

  return <Container h={'90vh'} p={'16'}>
      <Heading children='Welcome' my={'8'} textAlign={'center'}></Heading>
      <VStack boxShadow={'lg'} alignItems={'stretch'} borderRadius={'lg'} spacing={'0'}>
        <Box bg={'yellow.400'} p={'4'} css={{borderRadius: '8px 8px 0 0'}}>
          <Text color={'black'} children='Pro Pack - $299.00'/>
        </Box>
        <Box p={'4'}>
          <VStack textAlign={'center'} px={'8'} mt={'4'} spacing={'8'}>
            <Text children='Join pro Pack and Get Access to all content.'/>
            <Heading size={'md'} children='$299 Only'/>
          </VStack>

          <Button my={'8'} w={'full'} colorScheme='yellow' isLoading={loading} onClick={subscribeHandler}>Buy Now</Button>
        </Box>

        <Box bg={'blackAlpha.600'} p={'4'} css={{borderRadius: '0 0 8px 8px'}}>
          <Heading size={'sm'} color={'white'} textTransform={'uppercase'} children='100% refund at cancellation'/>
          <Text children='*Terms & Condition Apply' fontSize={'x-small'} color={'white'}/>
        </Box>
      </VStack>
  </Container>
}

export default Subscribe