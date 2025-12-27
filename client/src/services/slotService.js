// /client/src/services/slotService.js
import axiosInstance from './axiosInstance';

// Fetch all slots (supports query params if needed)
const getSlots = async (params) => {
    const response = await axiosInstance.get('/slots', { params });
    console.log(params);
    return response.data;
};

// Fetch single slot by ID
const getSlotById = async (id) => {
    const response = await axiosInstance.get(`/slots/${id}`);
    return response;
};

// Create a new slot
const createSlot = async (data) => {
    const response = await axiosInstance.post('/slots', data);
    return response;
};

// Join a slot
const joinSlot = async (id) => {
    const response = await axiosInstance.post(`/slots/${id}/join`);
    return response.data;
};

// Leave a slot
const leaveSlot = async (id) => {
    const response = await axiosInstance.post(`/slots/${id}/leave`);
    return response.data;
};

// Cancel a slot
const cancelSlot = async (id) => {
    const response = await axiosInstance.post(`/slots/${id}/cancel`);
    return response.data;
};

// Get user's slots (created or joined)
const getMySlots = async () => {
    const response = await axiosInstance.get('/slots/my-slots');
    return response.data;
};


export default {
    getSlots,
    getSlotById,
    createSlot,
    joinSlot,
    leaveSlot,
    cancelSlot,
    getMySlots,
};
