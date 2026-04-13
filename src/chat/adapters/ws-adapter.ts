import { IoAdapter } from '@nestjs/platform-socket.io';
import { INestApplicationContext } from '@nestjs/common';

export class WsAdapter extends IoAdapter {
  constructor(app: INestApplicationContext) {
    super(app);
  }

  createIOServer(port: number, options?: any): any {
    const server = super.createIOServer(port, {
      ...options,
      cors: {
        origin: '*',
      },
    });

    // ✅ Connection-level middleware (BEST PRACTICE)
    server.use((socket, next) => {
      const token = socket.handshake.auth?.token;

      console.log("Adapter middleware token:", token);

      if (!token) {
        return next(new Error("No token provided"));
      }

      if (token !== "valid-token") {
        return next(new Error("Invalid token"));
      }

      // Optional: attach user
      socket.data.user = { id: 1, name: "Demo User" };

      next();
    });

    console.log('Custom WebSocket Adapter Initialized');
    return server;
  }
}