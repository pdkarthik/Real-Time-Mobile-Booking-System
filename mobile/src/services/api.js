import axios from 'axios';

const API_URL = 'https://real-time-mobile-booking-system.onrender.com/api'; // Use 10.0.2.2 for Android emulator to access localhost

export const fetchExperts = async (page = 1, search = '', category = '') => {
  const response = await axios.get(`${API_URL}/experts`, {
    params: { page, search, category }
  });
  return response.data;
};

export const fetchExpertDetails = async (id) => {
  const response = await axios.get(`${API_URL}/experts/${id}`);
  return response.data;
};

export const createBooking = async (bookingData) => {
  const response = await axios.post(`${API_URL}/bookings`, bookingData);
  return response.data;
};

export const fetchMyBookings = async (email) => {
  const response = await axios.get(`${API_URL}/bookings`, { params: { email } });
  return response.data;
};

export const fetchExpertBookings = async (expertId, date) => {
  const response = await axios.get(`${API_URL}/bookings/expert/${expertId}`, { params: { date } });
  return response.data;
};

export const updateBookingStatus = async (bookingId, status) => {
  const response = await axios.patch(`${API_URL}/bookings/${bookingId}/status`, { status });
  return response.data;
};
