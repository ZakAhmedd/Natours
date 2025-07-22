/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51RlrsqD7ToI3X3ypvefYTLlln6i660RGc9DqmY6XucYrMy2bIpU2AQtLJclv9w9hOzF0umOzyZMdxTvbIIHP0kBn00iVATGTXY');

export const bookTour = async tourId => {
  try {
    // 1. Get checkout session from API
    const session = await axios(`/api/v1/bookings/checkout-session/${tourId}`);

    // 2. Create checkout form + charge credit card
    const stripe = await stripePromise;
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id
    });

  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
