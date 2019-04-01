import ioClient from 'socket.io-client';
import config from '@/config.js';

// export const SOCKET = ioClient('http://localhost:3003'); 

export const SOCKET = ioClient(config.BASE_URL);