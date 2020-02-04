import axios from 'axios'

const axiosInstance = axios.create({
	baseURL: 'http://35.200.220.218',
	timeout: (60 * 1000), // accept integers in milisecond = 1min
})

export default axiosInstance