import { Box, Button, Container, FormLabel, Heading, Input, Textarea, VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { contactUs } from '../../redux/action/othersAction';
import toast from 'react-hot-toast';

const Contacts = () => {

  const dispatch = useDispatch();
  const {error, message: Successmessage} = useSelector(state => state.other);



  const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const submitHandler = (e)=>{
      e.preventDefault();
      dispatch(contactUs(name, email, message))
    }

    useEffect(() => {
      if (error) {
        toast.error(error);
        dispatch({ type: 'clearError' });
      }
  
      if (Successmessage) {
        toast.success(Successmessage);
        dispatch({ type: 'clearMessage' });
      }

    }, [dispatch, error, Successmessage]);

  return (
    <Container h={'90vh'}>
      <VStack h={"full"} justifyContent={"center"} spacing={"8"}>
        <Heading children="Contact Us" />

        <form style={{ width: '100%' }} onSubmit={submitHandler}>
          <Box my={'4'}>
            <FormLabel htmlFor="name" children="Name" />
            <Input
              required
              id="name"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Enter Your Name"
              type="text"
              focusBorderColor="yellow.500"
            />
          </Box>
          <Box my={'4'}>
            <FormLabel htmlFor="email" children="Email Address" />
            <Input
              required
              id="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="abc@gmail.com"
              type="email"
              focusBorderColor="yellow.500"
            />
          </Box>
          <Box my={'4'}>
            <FormLabel htmlFor="message" children="Message" />
            <Textarea
              required
              id="message"
              value={message}
              onChange={e => setMessage(e.target.value)}
              placeholder="Enter You Message"
              focusBorderColor="yellow.500"
            />
          </Box>
          <Button my={'4'} colorScheme='yellow' type='submit'>Send Mail</Button>
            <Box my={'4'}>
              Request for a course ? <Link to='/request'>
                  <Button colorScheme='yellow' variant={'link'}>Click</Button>{" "}
              </Link>
              here
            </Box>
        </form>
      </VStack>
    </Container>
  );
};

export default Contacts;
