import axios from 'axios'
import Cookies from 'js-cookie'
import { PhoneFilterRequest } from '../components/bo-loc-dien-thoai'

const API_BASE_URL = 'https://server-hopestar.onrender.com'

export const getProfile = async () => {
  const jwt = Cookies.get('jwt')
  if (jwt) {
    const response = await axios.get(`${API_BASE_URL}/profile`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    })
    // console.log('Thông tin người dùng client:', response.data)
    return response.data
  }
}

export const getHome = async () => {
  try {
    const response = await axios.get(API_BASE_URL)
    return response.data
  } catch (error) {
    console.log('error home:', error)
    throw error
  }
}

export const getProductDetail = async (id: number) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${id}`)
    return response.data
  } catch (error) {
    console.error('Error fetching product-details:', error)
    throw error
  }
}

export const searchPhones = async (filter: PhoneFilterRequest) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/search`, {
      params: filter
    });
    return response.data;
  } catch (error) {
    console.error('Error searching phones:', error);
    throw error;
  }
};

export const getProductRelated = async (id:number) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/related`, {
      params: {id}
    });
    return response.data;
    console.log('Product related:', response.data)
  } catch (error) {
    console.error('Error phones related:', error);
    throw error;
  }
};
