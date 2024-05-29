import {
  Button,
  Container,
  HStack,
  Heading,
  Input,
  Stack,
  Text,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import CourseCard from './CourseCard/CourseCard';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCourses } from '../../redux/action/courseAction';
import toast from 'react-hot-toast';
import { addToPlaylist } from '../../redux/action/profileAction';
import { loadUser } from '../../redux/action/userAction';

const Courses = () => {
  const [keyword, setKeyword] = useState('');
  const [category, setCategory] = useState('');

  const dispatch = useDispatch();


  const categories = [
    'Web development',
    'Artificial Intelligence',
    'Data Structer & Algorithm',
    'App Development',
    'Data Science',
    'Game Development',
  ];

  const addToPlaylistHandler = async (courseId) =>{
    await dispatch(addToPlaylist(courseId));
    dispatch(loadUser())
  }

  const {courses,loading,error,message} = useSelector(
    state => state.course
  );

  useEffect(() => {
    dispatch(getAllCourses(keyword,category))

    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }

    if (message) {
      toast.success(message);
      dispatch({ type: 'clearMessage' });
    }

  }, [dispatch,error,category,keyword,message])

  

  return (
    <Container minH={'95vh'} maxW="container.lg" paddingY={'8'}>
      <Heading children="All Courses" m={'8'} />

      <Input
        value={keyword}
        onChange={e => setKeyword(e.target.value)}
        placeholder="Search a course..."
        type={'text'}
        focusBorderColor="yellow.500"
      />

      <HStack
        overflowX={'auto'}
        paddingY={'8'}
        css={{
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        }}
      >
        {categories.map((item, index) => (
          <Button key={index} minW={'60'} onClick={() => setCategory(item)}>
            <Text children={item} />
          </Button>
        ))}
      </HStack>

      <Stack
        direction={['column', 'row']}
        flexWrap={'wrap'}
        justifyContent={['flex-start', 'space-evenly']}
        alignItems={['center', 'flex-start']}
      >
         {
          courses.length > 0 ?  courses.map((item,index)=>(
            <CourseCard 
            key={index}
            views={item.views}
            title={item.title}
            imageSrc={item.poster.url}
            id={item._id}
            creator={item.createdBy}
            addToPlaylistHandler={addToPlaylistHandler}
            description={item.description}
            lectureCount={item.numberOfVideos}
            loading={loading}
            />
           )
          ) : <Heading children="Course Not Found"/>
        }
       
      </Stack>
    </Container>
  );
};

export default Courses;
