import {
    Avatar,
    Box,
    Button,
    Container,
    FormLabel,
    Heading,
    Input,
    VStack
  } from '@chakra-ui/react';
  import React, { useState } from 'react';
  import { Link } from 'react-router-dom';
import { register } from '../../redux/action/userAction';
import { useDispatch } from 'react-redux';

  export const fileUploadCss = {
    cursor:"pointer",
    marginLeft:"-5%",
    width:"110%",
    border:"none",
    height:"100%",
    color:"#ECC94B",
    backgroundColor:"white"
}

  const fileUploadStyle = {
    "&::file-selector-button":fileUploadCss
  }
  
  const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [imagePreview, setImagePreview] = useState('');
    const [image, setImage] = useState('');

    const changeAvatarHandler = (e)=>{
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.readAsDataURL(file);

        reader.onloadend = () =>{
            setImagePreview(reader.result)
            setImage(file);
        }
    }

    const dispatch = useDispatch();

    const submitHandler = (e)=>{
      e.preventDefault();
      const myform = new FormData();

      myform.append("name",name);
      myform.append("email",email);
      myform.append("password",password);
      myform.append("file",image);

      dispatch(register(myform));
    }
  
    return (
      <Container height={'95vh'}>
        <VStack height={'full'} justifyContent={'center'} spacing={'16'}>
          <Heading textTransform={'uppercase'} children="Registration" />
          <form onSubmit={submitHandler} style={{ width: '100%' }}>
            <Box my={'4'} display={'flex'} justifyContent={'center'}>
                <Avatar src={imagePreview} size={'2xl'}/>
            </Box>
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
              <FormLabel htmlFor="password" children="Password" />
              <Input
                required
                id="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Enter Your Password"
                type="password"
                focusBorderColor="yellow.500"
              />
            </Box>
            <Box my={'4'}>
              <FormLabel htmlFor="chooseAvatar" children="Choose Avatar" />
              <Input
               accept='image/*'
                required
                id="password"
                type="file"
                focusBorderColor="yellow.500"
                css={fileUploadStyle}
                onChange={changeAvatarHandler}
              />
            </Box>
  
            <Button my={'4'} colorScheme='yellow' type='submit'>Sign Up</Button>
            <Box my={'4'}>
              Already Signed Up ? <Link to='/login'>
                  <Button colorScheme='yellow' variant={'link'}>Login</Button>{" "}
              </Link>
              here
            </Box>
          </form>
        </VStack>
      </Container>
    );
  };
  
  export default Register;
  