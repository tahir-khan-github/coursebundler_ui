import { Box, Button, Container, FormLabel, Heading, Input, Textarea, VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { courseRequest } from '../../redux/action/othersAction';
import toast from 'react-hot-toast';
import { getAllCourses } from '../../redux/action/courseAction';

const Request = () => {

  const dispatch = useDispatch();
  const {error, message} = useSelector(state => state.other);

  const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [course, setCourse] = useState('');

    const submitHandler = (e)=>{
      e.preventDefault();
      dispatch(courseRequest(name, email, course))
    }

    useEffect(() => {
      if (error) {
        toast.error(error);
        dispatch({ type: 'clearError' });
      }
  
      if (message) {
        toast.success(message);
        dispatch({ type: 'clearMessage' });
      }

      dispatch(getAllCourses());
      
    }, [dispatch, error, message]);

  return (
    <Container h={'90vh'}>
      <VStack h={"full"} justifyContent={"center"} spacing={"8"}>
        <Heading children="Request New Course" />

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
            <FormLabel htmlFor="message" children="Course" />
            <Textarea
              required
              id="course"
              value={course}
              onChange={e => setCourse(e.target.value)}
              placeholder="Explain the course"
              focusBorderColor="yellow.500"
            />
          </Box>
          <Button my={'4'} colorScheme='yellow' type='submit'>Send Mail</Button>
            <Box my={'4'}>
              See available courses ! <Link to='/courses'>
                  <Button colorScheme='yellow' variant={'link'}>Click</Button>{" "}
              </Link>
              here
            </Box>
        </form>
      </VStack>
    </Container>
  );
};

export default Request