import {
  Box,
  Grid,
  HStack,
  Heading,
  Progress,
  Stack,
  Text,
} from '@chakra-ui/react';
import cursor from '../../assets/images/cursor.png';
import React, { useEffect } from 'react';
import Sidebar from './Sidebar';
import { RiArrowDownLine, RiArrowUpLine } from 'react-icons/ri';
import { DoughnutChart, LineChart } from './Charts/Chart';
import { useDispatch, useSelector } from 'react-redux';
import { getDashboardStats } from '../../redux/action/adminAction';
import Loader from '../Layout/Loader';

const Databox = ({ title, qty, qtyPercentage, profit }) => (
  <Box
    w={['full', '20%']}
    boxShadow={'-2px 0 10px rgba(107,70,193, 0.5)'}
    padding={8}
    borderRadius={'lg'}
  >
    <Text children={title} />
    <HStack spacing={6}>
      <Text fontWeight={'bold'} fontSize={'2xl'} children={qty} />
      <HStack>
        <Text children={`${qtyPercentage}%`} />
        {profit ? (
          <RiArrowUpLine color="green" />
        ) : (
          <RiArrowDownLine color="red" />
        )}
      </HStack>
    </HStack>
    <Text opacity={0.6} children="Since last month" />
  </Box>
);

const Bar = ({ title, value, profit }) => (
  <Box py={4} px={['0', '20']}>
    <Heading size={'sm'} children={title} mb={2} />
    <HStack w={'full'} alignItems={'center'}>
      <Text children={profit ? '0%' : `-${value}%`} />
      <Progress w={'full'} value={profit ? value : 0} colorScheme="purple" />
      <Text children={`${value > 100 ? value : 100}%`} />
    </HStack>
  </Box>
);

const Dashboard = () => {
  const dispatch = useDispatch();
  const {
    loading,
    stats,
    usersCount,
    subscriptionsCount,
    viewsCount,
    usersPercent,
    subscriptionsPercent,
    viewsPercent,
    usersProfit,
    subscriptionsProfit,
    viewsProfit,
  } = useSelector(state => state.admin);

  useEffect(() => {
    dispatch(getDashboardStats());
  }, [dispatch]);

  return (
    <Grid
      css={{
        cursor: `url(${cursor}), default`,
      }}
      minH={'100vh'}
      templateColumns={['1fr', '5fr 1fr']}
    >
      {loading || !stats ? (
        <Loader color="purple" />
      ) : (
        <Box boxSize={'border-box'} py={'16'} px={['4', '0']}>
          <Text
            textAlign={'center'}
            opacity={0.5}
            children={`last change was on ${String(new Date(stats[11].createdAt)).split('G')[0]}`}
          />
          <Heading
            children={'Dashboard'}
            ml={['0', '16']}
            mb={16}
            textAlign={['center', 'left']}
          />
          <Stack
            direction={['column', 'row']}
            minH={24}
            justifyContent={'space-evenly'}
          >
            <Databox title="Views" qty={viewsCount} qtyPercentage={viewsPercent} profit={viewsProfit} />
            <Databox title="Users" qty={usersCount} qtyPercentage={usersPercent} profit={usersProfit} />
            <Databox
              title="Subscription"
              qty={subscriptionsCount}
              qtyPercentage={subscriptionsPercent}
              profit={subscriptionsProfit}
            />
          </Stack>
          <Box
            m={['0', '16']}
            borderRadius={'lg'}
            p={['0', '16']}
            mt={['4', '16']}
            boxShadow={'-2px 0 10px rgba(107,70,193, 0.5)'}
          >
            <Heading
              textAlign={['center', 'left']}
              size={'md'}
              children="Views Graph"
              pt={['8', '0']}
              ml={['0', '16']}
            />
            <LineChart views={stats.map(item=> item.views)}/>
          </Box>
          <Grid templateColumns={['1fr', '2fr 1fr']}>
            <Box p="4">
              <Heading
                textAlign={['center', 'left']}
                size={'md'}
                children="Progress Bar"
                my={'8'}
                ml={['0', '16']}
              />
              <Box>
                <Bar profit={viewsProfit} title="Veiws" value={viewsPercent} />
                <Bar profit={usersProfit} title="Users" value={usersPercent} />
                <Bar profit={subscriptionsProfit} title="Subscription" value={subscriptionsPercent} />
              </Box>
            </Box>
            <Box p={['0', '16']} boxSizing="border-box" py={4}>
              <Heading
                textAlign={'center'}
                size={'md'}
                mb={'4'}
                children={'Users'}
              />
              <DoughnutChart users={[subscriptionsCount,usersCount - subscriptionsCount]} />
            </Box>
          </Grid>
        </Box>
      )}
      <Sidebar />
    </Grid>
  );
};

export default Dashboard;
