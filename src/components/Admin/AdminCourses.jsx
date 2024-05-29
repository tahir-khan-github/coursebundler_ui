import {
  Box,
  Button,
  Grid,
  HStack,
  Heading,
  Image,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from '@chakra-ui/react';
import cursor from '../../assets/images/cursor.png';
import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import { RiDeleteBinFill } from 'react-icons/ri';
import CourseModal from './CourseModal';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCourses, getCourseLectures } from '../../redux/action/courseAction';
import { addLecture, deleteCourse, deleteLecture } from '../../redux/action/adminAction';
import toast from 'react-hot-toast';

const AdminCourses = () => {
  const [courseId,setCourseId] = useState('')
  const [courseTitle,setcourseTitle] = useState('')

  const {isOpen,onClose,onOpen} = useDisclosure();
  const dispatch = useDispatch();


  const {courses, lectures} = useSelector(state => state.course)

  const {loading, error, message} = useSelector(state => state.admin)

  const courseDetailhandler=(courseId,title)=>{
    dispatch(getCourseLectures(courseId))
    setCourseId(courseId)
    setcourseTitle(title)
    onOpen();
  }
  const deleteHandler=(courseId)=>{
    dispatch(deleteCourse(courseId))
  }

  const deleteCourseHandler= async (courseId,lectureId)=>{
    await dispatch(deleteLecture(courseId,lectureId));

    dispatch(getCourseLectures(courseId))
  }
  const addLectureHandler=async (e,courseId,title,description,video)=>{
    e.preventDefault()
    const myform = new FormData();

    myform.append("title",title);
    myform.append("description",description);
    myform.append("file",video);

   await  dispatch(addLecture(courseId,myform));

   dispatch(getCourseLectures(courseId))
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
    dispatch(getAllCourses())
  }, [dispatch, error, message])
  

  return (
    <Grid
      css={{
        cursor: `url(${cursor}), default`,
      }}
      minH={'100vh'}
      templateColumns={['1fr', '5fr 1fr']}
    >
      <Box p={['0', '8']} overflowX={'auto'}>
        <Heading
          textTransform={'uppercase'}
          children="All Courses"
          my={16}
          textAlign={['center', 'left']}
        />

        <TableContainer w={['100vw', 'full']}>
          <Table variant={'simple'} size={'lg'}>
            <TableCaption>All available courses in the database</TableCaption>

            <Thead>
              <Tr>
                <Th>Id</Th>
                <Th>Poster</Th>
                <Th>Title</Th>
                <Th>Category</Th>
                <Th>Creator</Th>
                <Th isNumeric>Views</Th>
                <Th isNumeric>Lectures</Th>
                <Th isNumeric>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {courses.map(item => (
                <Row courseDetailhandler={courseDetailhandler} deleteHandler={deleteHandler} key={item._id} item={item} loading={loading} />
              ))}
            </Tbody>
          </Table>
        </TableContainer>

        <CourseModal isOpen={isOpen} onClose={onClose} courseTitle={courseTitle} id={courseId} deleteCourseHandler={deleteCourseHandler} addLectureHandler={addLectureHandler} lectures={lectures} loading={loading}/>
      </Box>
      <Sidebar />
    </Grid>
  );
};

export default AdminCourses


function Row({ item ,courseDetailhandler, deleteHandler, loading}) {
  return (
    <Tr>
      <Td>#{item._id}</Td>
      <Td>
        <Image src={item.poster.url} />
      </Td>
      <Td>{item.title}</Td>
      <Td textTransform={"uppercase"}>{item.category}</Td>
      <Td>{item.createdBy}</Td>
      <Td isNumeric>{item.views}</Td>
      <Td isNumeric>{item.numberOfVideos}</Td>
  
      <Td isNumeric>
        <HStack justifyContent={'flex-end'}>
          <Button onClick={()=>courseDetailhandler(item._id, item.title)} variant={'outline'} color={'purple'} isLoading={loading}>
            View Lectures
          </Button>
          <Button onClick={()=>deleteHandler(item._id)} isLoading={loading}>
            <RiDeleteBinFill />
          </Button>
        </HStack>
      </Td>
    </Tr>
  );
}