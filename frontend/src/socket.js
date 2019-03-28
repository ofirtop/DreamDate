import ioClient from 'socket.io-client';

// export const SOCKET = ioClient('http://localhost:3003'); 

export const SOCKET = process.env.NODE_ENV !== 'development'?
    ioClient('') : ioClient('//localhost:3003');