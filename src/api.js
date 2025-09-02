// src/api.js
import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:8080", // Spring Boot app चालू आहे तिथे
  headers: {
    "Content-Type": "application/json",
  },
});
