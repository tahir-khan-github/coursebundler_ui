import { Button, Container, Heading, Input, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from '../../redux/action/profileAction';
import { loadUser } from '../../redux/action/userAction';
import { useNavigate } from 'react-router-dom';

const UpdateProfile = () => {

    const [name,setName] = useState();
    const [email,setEmail] = useState();

    const navigate = useNavigate();

    const dispatch = useDispatch();
    const {loading} = useSelector(
      state => state.profile
    );

    const submitHandler = async (e)=>{
      e.preventDefault();
     await dispatch(updateProfile(name,email));
     dispatch(loadUser())

     navigate("/profile")
    }
    

  return (
    <Container minH={"90vh"} py={"16"}>
    <form  onSubmit={submitHandler}> 
      <Heading children="Update Profile" my={"16"} textAlign={["center","left"]} textTransform={"uppercase"}/>
      <VStack spacing={"8"}>
      <Input
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Name"
            type="text"
            focusBorderColor="yellow.500"
          />
      <Input
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Email"
            type="email"
            focusBorderColor="yellow.500"
          />
        <Button isLoading={loading} w={"full"} colorScheme='yellow' type='submit'>Update</Button>
      </VStack>
    </form>
  </Container>
  )
}

export default UpdateProfile