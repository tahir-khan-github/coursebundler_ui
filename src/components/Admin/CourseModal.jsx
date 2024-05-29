import {
  Box,
  Button,
  Grid,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import { fileUploadCss } from '../Auth/Register';
import React, {  useState } from 'react';
import { RiDeleteBin7Fill } from 'react-icons/ri';


const CourseModal = ({
  isOpen,
  onClose,
  id,
  deleteCourseHandler,
  addLectureHandler,
  courseTitle,
  lectures = [],
  loading
}) => {
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [video, setVideo] = useState();
  const [videoPreview, setVideoPreview] = useState();

  const changeVideoHandler = e => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setVideoPreview(reader.result);
      setVideo(file);
    };
  };

  const closeHandler = () => {
    setDescription(' ');
    setTitle(' ');
    setVideo(' ');
    setVideoPreview(' ');
    onClose();
  }
  

  return (
    <Modal
      isOpen={isOpen}
      size={'full'}
      onClose={closeHandler}
      scrollBehavior="outside"
    >
      <ModalOverlay>
        <ModalContent>
          <ModalHeader>{courseTitle}</ModalHeader>
          <ModalCloseButton />
          <ModalBody p={16}>
            <Grid templateColumns={['1fr', '3fr 1fr']}>
              <Box p={['0', '16']}>
                <Box my={5}>
                  <Heading children={courseTitle} />
                  <Heading children={`#${id}`} size={'sm'} opacity={0.4} />
                </Box>
                <Heading children={'Lectures'} size={'lg'} />
                {lectures.map((item, i) => (
                  <VideoCard
                    title={item.title}
                    description={item.description }
                    num={i + 1}
                    lectureId={item._id}
                    courseId={id}
                    deleteCourseHandler={deleteCourseHandler}
                    loading={loading}
                  />
                ))}
              </Box>
              <Box>
                <form
                  onSubmit={e =>
                    addLectureHandler(e, id, title, description, video)
                  }
                >
                  <VStack spacing={4}>
                    <Heading
                      children="Add lectures"
                      size={'md'}
                      textTransform={'uppercase'}
                    />
                    <Input
                      focusBorderColor="purple.300"
                      placeholder="Title"
                      value={title}
                      onChange={e => setTitle(e.target.value)}
                    />
                    <Input
                      focusBorderColor="purple.300"
                      placeholder="Description"
                      value={description}
                      onChange={e => setDescription(e.target.value)}
                    />
                    <Input
                      accept="video/mp4*"
                      required
                      type="file"
                      focusBorderColor="purple.500"
                      css={{
                        '&::file-selector-button': {
                          ...fileUploadCss,
                          color: 'purple',
                        },
                      }}
                      onChange={changeVideoHandler}
                    />
                    {videoPreview && (
                      <video
                        controlsList="nodownload"
                        controls
                        src={videoPreview}
                      />
                    )}
                    <Button isLoading={loading} w={'full'} colorScheme="purple" type="submit">
                      Upload
                    </Button>
                  </VStack>
                </form>
              </Box>
            </Grid>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </ModalOverlay>
    </Modal>
  );
};

export default CourseModal;

function VideoCard({
  title,
  description,
  num,
  lectureId,
  courseId,
  deleteCourseHandler,
  loading
}) {
  return (
    <Stack
      direction={['column', 'row']}
      my={8}
      borderRadius={'lg'}
      boxShadow={'0 0 10px rgba(107,70,193,0.5)'}
      justifyContent={['flex-start', 'space-between']}
      p={['4', '8']}
    >
      <Box>
        <Heading size={'sm'} children={`#${num} ${title}`} />
        <Text children={description} />
      </Box>
      <Button
        color={'purple.600'}
        onClick={() => deleteCourseHandler(courseId, lectureId)}
        isLoading={loading}
      >
        <RiDeleteBin7Fill />
      </Button>
    </Stack>
  );
}
