import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'

const API_URL = 'http://uat.efuel.petrolimexaviation.com/api'

const api = axios.create({ baseURL: API_URL })
api.interceptors.request.use(
  async config => {
    const token = await AsyncStorage.getItem('token')
    config.headers = {
      'Authorization': 'Bearer ' + token
    }
    return config
  },
  err => Promise.reject(err)
)
api.interceptors.response.use(
  res => res
)
export const login = (data) => api.post('login', data)
export const getProfile = () => api.get('profile')
export const getExpTicket = () => api.get('expreceipt')
export const getImpTicket = () => api.get('impreceipt')
export const getCustomers = () => api.get('customer')
export const getLTP = (params) => api.get('ltp', { params })
export const getLTPById = (id) => api.get('ltp', { params: { id } })
export const getVehicle = (params) => api.get('vehicle', { params })
export const getVehicleById = (id) => api.get(`vehicle/${id}`)
export const getInventory = (params) => api.get('inventory', { params })
export const getDriver = (params) => api.get('driver', { params })
export const getDriverById = (id) => api.get(`driver/${id}`)
export const getProduct = (params) => api.get('product', { params })
export const getProductById = (id) => api.get(`product/${id}`)
export const getSaleType = (params) => api.get('saletype', { params })
export const getLoadingType = (params) => api.get('loadingtype', { params })
// export default { login, getProfile }