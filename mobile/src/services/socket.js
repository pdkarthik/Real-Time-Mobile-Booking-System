import { io } from 'socket.io-client';

const SOCKET_URL = 'http://10.0.2.2:5000'; // Match your backend server URL

class SocketService {
  socket = null;

  connect() {
    if (!this.socket) {
      this.socket = io(SOCKET_URL);
      
      this.socket.on('connect', () => {
        console.log('Connected to socket server:', this.socket.id);
      });

      this.socket.on('disconnect', () => {
        console.log('Disconnected from socket server');
      });
    }
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  onSlotBooked(callback) {
    if (this.socket) {
      this.socket.on('slotBooked', callback);
    }
  }

  offSlotBooked(callback) {
    if (this.socket) {
      this.socket.off('slotBooked', callback);
    }
  }
}

const socketService = new SocketService();
export default socketService;
