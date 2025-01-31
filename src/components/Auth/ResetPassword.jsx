import { Button, Container, Heading, Input, VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { resetPassword } from '../../redux/action/profileAction';
import toast from 'react-hot-toast';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const navigate = useNavigate()

  const params = useParams();

  const dispatch = useDispatch();
  const {error, message, loading} = useSelector(
    state => state.profile
  );

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }

    if (message) {
      toast.success(message);
      dispatch({ type: 'clearMessage' });
      navigate("/login")
    }
  }, [dispatch, error, message]);

  const submitHandler = (e)=>{
    e.preventDefault();
    dispatch(resetPassword(params.token, password));
  }


  return (
    <Container py={"16"} h={"90vh"}>
      <form onSubmit={submitHandler}>
        <Heading
          children="Reset Password"
          my={'16'}
          textTransform={'uppercase'}
          textAlign={['center', 'left']}
        />
        <VStack spacing={'8'}>
          <Input
            required
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="New Password"
            type="password"
            focusBorderColor="yellow.500"
          />
          <Button isLoading={loading} type="submit" w={'full'} colorScheme="yellow">
            Reset Password
          </Button>
        </VStack>
      </form>
    </Container>
  );
};

export default ResetPassword;
