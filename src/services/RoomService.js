import axios from 'axios';

const BASE_URL = "http://localhost:8080/rooms";

export const getAllRooms = () => axios.get(BASE_URL);

export const addRoom = (room) =>
  axios.post(BASE_URL, room, {
    headers: {
      "Content-Type": "application/json"
    }
  });

export const deleteRoom = (id) => axios.delete(`${BASE_URL}/${id}`);

export const getRoomById = (id) => axios.get(`${BASE_URL}/${id}`);

export const updateRoom = (id, room) =>
  axios.put(`${BASE_URL}/${id}`, room, {
    headers: {
      "Content-Type": "application/json"
    }
  });
