import { Avatar, Button, Container, HStack, Heading, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, Text, VStack, useDisclosure } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { RiDeleteBin7Fill } from 'react-icons/ri'
import { Link } from 'react-router-dom'
import { fileUploadCss } from '../Auth/Register'
import { removeFromPlaylist, updateProfilePicture } from '../../redux/action/profileAction'
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast';
import { loadUser } from '../../redux/action/userAction'
import { cancelSubscription } from '../../redux/action/subscriptionAction'


const Profile = ({user}) => {

    

    const {isOpen,onClose,onOpen} = useDisclosure()

    const dispatch = useDispatch();
    const { message, error, loading} = useSelector(
        state => state.profile
      );
    const { message:subscriptionMessage, error:subscriptionError, loading:subscriptionLoading} = useSelector(
        state => state.subscription
      );
      
      useEffect(() => {
        if (error) {
          toast.error(error);
          dispatch({ type: 'clearError' });
        }
    
        if (message) {
          toast.success(message);
          dispatch({ type: 'clearMessage' });
        }

        if (subscriptionError) {
            toast.error(subscriptionError);
            dispatch({ type: 'clearError' });
          }
      
          if (subscriptionMessage) {
            toast.success(subscriptionMessage);
            dispatch({ type: 'clearMessage' });
            dispatch(loadUser())
          }
      }, [dispatch, error, message,subscriptionMessage,subscriptionError]);

    const changeImageSubmitHandler = async (e, image)=>{
        e.preventDefault()
        const myform = new FormData();
        myform.append("file",image);

        await dispatch(updateProfilePicture(myform));
        dispatch(loadUser())
    }

    const removeFromPlaylistHandler = async (id)=>{
        await dispatch(removeFromPlaylist(id))
        dispatch(loadUser())
    }

    const cancelSubscriptionHandler =()=>{
        dispatch(cancelSubscription())
    }

  return <Container minH={"90vh"} minW={"container.lg"} py={"8"}>
    <Heading children="Profile" textTransform={"uppercase"} m={"8"}/>
    <Stack justifyContent={"flex-start"} direction={["column","row"]} alignItems={"center"} spacing={["8","16"]} padding={"8"}>
        <VStack>
            <Avatar boxSize={"48"} src={user.avatar.url}/>
            <Button  onClick={onOpen} colorScheme="yellow" variant={"ghost"}>
                Change Photo
            </Button>
        </VStack>
        <VStack spacing={"4"} alignItems={["center","flex-start"]}>
            <HStack>
                <Text children="Name"/>
                <Text children={user.name}/>
            </HStack>{' '}
            <HStack>
                <Text children="Email"/>
                <Text children={user.email}/>
            </HStack>
            <HStack>
                <Text children="CreatedAt"/>
                <Text children={user.createdAt.split("T")[0]}/>
            </HStack>
            {
                user.role !== "admin" && (
                    <HStack>
                       <Text children="Subscription" fontWeight={"bold"}/>
                        {
                         user.subscription && user.subscription.status === "active"? (<Button onClick={cancelSubscriptionHandler} isLoading={subscriptionLoading} color="yellow.500" variant={"unstyled"}>Cancel Subscription</Button>) : (<Link to={"/subscribe"}><Button colorScheme='yellow'>Subscribe</Button></Link>) 
                        }
                    </HStack>
                )
            }
            <Stack direction={["column","row"]} alignItems={"center"}>
                <Link to={"/updateprofile"}>
                    <Button>
                        Update Profile
                    </Button>
                </Link>
                <Link to={"/changepassword"}>
                    <Button>
                        Change Password
                    </Button>
                </Link>
            </Stack>
        </VStack>
    </Stack>
    <Heading children="Playlist" size={"md"} my={"8"}/>
        {
            user.playlist.length > 0 && (
                <Stack direction={["column","row"]} alignItems={"center"} flexWrap={"wrap"} p={"4"}>
                    {
                        user.playlist.map((element)=>(
                            <VStack w={"48"} m="2" key={element.course}>
                                <Image boxSize={"full"} objectFit={"contain"} src={element.poster}/>
                                <HStack>
                                    <Link to={`/course/${element.course}`}>
                                        <Button variant={"ghost"} colorScheme='yellow'>
                                            Watch Now
                                        </Button>
                                    </Link>
                                    <Button isLoading={loading} onClick={()=>removeFromPlaylistHandler(element.course)}>
                                        <RiDeleteBin7Fill />
                                    </Button>
                                </HStack>
                            </VStack>
                        ))
                    }
                </Stack>
            )
        }

    <ChangePhotoBox isOpen={isOpen} onClose={onClose} chnageImageSubmitHandler={changeImageSubmitHandler} loading={loading}/>
  </Container>
}

export default Profile

function ChangePhotoBox({isOpen,onClose,chnageImageSubmitHandler,loading}){
    
    const [imagePreview, setImagePreview] = useState('');
    const [image, setImage] = useState('');
    const changeImage = (e)=>{
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.readAsDataURL(file);

        reader.onloadend = () =>{
            setImagePreview(reader.result)
            setImage(file);
        }
    }

    const closeHandler = ()=>{
        onClose();
        setImagePreview("");
        setImage("");
    }

    return(
        <Modal isOpen={isOpen} onClose={closeHandler}>
            <ModalOverlay backdropFilter={'blur(10px)'}/>
            <ModalContent>
                <ModalHeader>Change Photo</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Container>
                    <form onSubmit={e => chnageImageSubmitHandler(e, image)}> 
                        <VStack spacing={"8"}>
                            {
                            imagePreview && <Avatar src={imagePreview} boxSize={"48"} />
                            }
                            <Input type={"file"} css={{"&::file-selector-button":fileUploadCss}} onChange={changeImage}/>
                            <Button isLoading={loading} w={"full"} colorScheme='yellow' type='submit'>Change</Button>
                        </VStack>
                    </form>
                </Container>
              </ModalBody>
              <ModalFooter>
                <Button mr={"3"} onClick={closeHandler}>
                    Cancel
                </Button>
              </ModalFooter>
            </ModalContent>
        </Modal>
    )
}