import { server } from '../store';
import axios from 'axios';

export const buySubscription = () => async (dispatch) => {
  try {
    dispatch({ type: 'buySubscriptionRequest' });

    const { data } = await axios.get(
      `${server}/subscribe`,
      {
        withCredentials: true, // to store cookies in browser
      }
    );
    console.log(data);

    dispatch({ type: 'buySubscriptionSuccess', payload: data.subscriptionId });

  } catch (error) {
    console.log(error.response.data.message);
    dispatch({ type: 'buySubscriptionFail', payload: error.response.data.message });
  }
};

export const cancelSubscription = () => async (dispatch) => {
  try {
    dispatch({ type: 'cancelSubscriptionRequest' });

    const { data } = await axios.delete(
      `${server}/subscribe/cancel`,
      {
        withCredentials: true, // to store cookies in browser
      }
    );
    console.log(data);

    dispatch({ type: 'cancelSubscriptionSuccess', payload: data.message });

  } catch (error) {
    console.log(error.response.data.message);
    dispatch({ type: 'cancelSubscriptionFail', payload: error.response.data.message });
  }
};