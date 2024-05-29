import { Button, HStack, Heading, Image, Stack, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';
import './CourseCard.css'

const CourseCard = ({
  views,
  title,
  imageSrc,
  id,
  addToPlaylistHandler,
  creator,
  description,
  lectureCount,
  loading
}) => {
  return (
    <VStack className="coursecard" alignItems={['center', 'flex-start']}>
      <Image src={imageSrc} boxSize="60" objectFit={'contain'} />
      <Heading
        children={title}
        textAlign={['center', 'left']}
        maxW="200px"
        fontFamily={'sans-serif'}
        noOfLines={'3'}
        size={'sm'}
      />
      <Text children={description} noOfLines={'2'} />

      <HStack>
        <Text
          children={'Creator'}
          fontWeight={'bold'}
          textTransform={'uppercase'}
        />
        <Text
          children={creator}
          fontFamily={'body'}
          textTransform={'uppercase'}
        />
      </HStack>

      <Heading
        textAlign={'center'}
        size={'xs'}
        children={`Lectures - ${lectureCount}`}
        textTransform={'uppercase'}
      />
      <Heading
        size={'xs'}
        children={`Veiws - ${views}`}
        textTransform={'uppercase'}
      />

    <Stack direction={['column','row']} alignItems='center'>
      <Link to={`/course/${id}`}>
        <Button  colorScheme={'yellow'}>Watch Now</Button>
      </Link>
      <Button variant={'ghost'} colorScheme={'yellow'} isLoading={loading} onClick={()=>addToPlaylistHandler(id)}>Add to playlist</Button>
    </Stack>
    </VStack>
  );
};

export default CourseCard;
