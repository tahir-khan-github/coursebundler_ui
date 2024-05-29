import React from 'react';
import {
  Stack,
  VStack,
  Heading,
  Button,
  Text,
  Image,
  Box,
  HStack,
} from '@chakra-ui/react';
import './Home.css';
import { Link } from 'react-router-dom';
import vg from '../../assets/images/bg.png';
import introVideo from '../../assets/videos/intro.mp4'
import { CgGoogle, CgYoutube } from 'react-icons/cg';
import { SiCoursera, SiUdemy } from 'react-icons/si';
import { DiAws } from 'react-icons/di';

const Home = () => {
  return (
    <section className="home">
      <div className="container">
        <Stack
          direction={['column', 'row']}
          height="100%"
          justifyContent={['center', 'space-between']}
          alignItems="center"
          spacing={['16', '56']}
        >
          <VStack width={'full'} alignItems={['center', 'flex-end']} spacing={'8'}>
            <Heading textAlign={['center','left']} children="Learn From The Expert" size={'2xl'} />
            <Text textAlign={['center','left']} fontSize={'2xl'} fontFamily={'cursive'} children="Find Valuable Content At Reasonable Price" />
            <Link to="/courses">
              <Button size={'lg'} colorScheme="yellow">
                Explore Now
              </Button>
            </Link>
          </VStack>

          <Image className='vectorGraphics' boxSize={'md'} src={vg} objectFit={'contain'} />
        </Stack>
      </div>

      <Box padding={"8"} bg="blackAlpha.800">
        <Heading
          children="Our Brands"
          textAlign={'center'}
          color={'yellow.400'}
          fontFamily="body"
        />
        <HStack color={"white"} className='brandsBanner' justifyContent={'space-evenly'} marginTop={'4'}>
          <CgGoogle />
          <CgYoutube />
          <SiCoursera />
          <SiUdemy />
          <DiAws />
        </HStack>
      </Box>

      <div className="container2">
        <video src={introVideo} controls controlsList='nodownload nofullscreen noremoteplayback'  disablePictureInPicture disableRemotePlayback> 

        </video>
      </div>
    </section>
  );
};

export default Home;
