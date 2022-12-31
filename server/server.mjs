import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import { makeExecutableSchema } from '@graphql-tools/schema';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';

import express from 'express';
import http from 'http';
import cors from 'cors';
import { writeFile } from "fs";
import bodyParser from 'body-parser';

import { Server } from 'socket.io';


import "./config/database.mjs";
import { typeDefs } from './config/config.mjs';

import {
  panelResolver,
  addPanelResolver,
  allPanelesResolver,
  updatePanelResolver,
  deletePanelResolver,
} from './controllers/PanelController.mjs';
import {
  tareaResolver,
  addTareaResolver,
  allTareasResolver,
  updateTareaResolver,
  deleteTareaResolver,
  moveTareaResolver,
} from './controllers/TareasController.mjs';

import { pubsub } from './pubsub/index.mjs';
import { TAREA_MOVED } from './pubsub/eventos/index.mjs';


// se crean los resolvers
const resolvers = {
  Query: {
    hello: () => 'world',
    panel: panelResolver,
    tarea: tareaResolver,

    allPaneles: allPanelesResolver,
    allTareas: allTareasResolver,
  },

  Mutation: {
    addPanel: addPanelResolver,
    updatePanel: updatePanelResolver,
    deletePanel: deletePanelResolver,

    addTarea: addTareaResolver,
    updateTarea: updateTareaResolver,
    moveTarea: moveTareaResolver,
    deleteTarea: deleteTareaResolver,
  },

  Subscription: {
    hello: {
      // Example using an async generator
      subscribe: async function* () {
        for await (const word of ['Hello', 'Bonjour', 'Ciao']) {
          yield { hello: word };
        }
      },
    },
    tareaMoved: {
      // More on pubsub below
      subscribe: () => pubsub.asyncIterator([TAREA_MOVED]),
    },
  },
}

const app = express();
const httpServer = http.createServer(app);

const io = new Server(httpServer);

const notifyTaskNotification = (message) => {
  io.emit('taskNotification', message);
}
const notifyError = (message) => {
  io.emit('error', message);
}

io.on('connection', (socket) => {
  console.log('a user connected');


  // panels
  socket.on('addPanel', (panel) => {
    console.log('addPanel', panel);

    try {
      addPanelResolver(null, {
        _id: +(new Date()),
        titulo: panel.title,
        descripcion: panel.description,
      })
      notifyTaskNotification('panel agregado')
    } catch (error) {
      notifyError(error.toString())
    }
  })

  socket.on('deletePanel', (id) => {
    try {
      deletePanelResolver(null, { _id: id })
      notifyTaskNotification('panel eliminado')
    } catch (error) {
      notifyError(error.toString())
    }
  })


  // tareas
  socket.on('addTarea', ({ id, tarea }) => {
    console.log('addTarea', { id, tarea }, 'tarea.columna', tarea.columna);

    if (tarea.title === '0') {
      notifyError('no se puede agregar una tarea con titulo 0')
      return
    }

    try {
      addTareaResolver(null, {
        _id: id,
        titulo: tarea.title,
        descripcion: tarea.description,
        panelId: tarea.panelId,
        fileName: tarea.fileName,
        estado: tarea.estado,
        columna: tarea.columna,
      })
      notifyTaskNotification('tarea agregada')
    } catch (error) {
      notifyError(error.toString())
    }
  })

  socket.on('uploadTareaFile', ({ file, fileName }, callback) => {
    console.log('uploadTareaFile', file);

    try {
      writeFile(`./webapp/tmp/upload/${fileName}`, file, (err) => {
        callback({ message: err ? `failure ${err.toString()}}` : "success" });
      })

      notifyTaskNotification('archivo subido')
    } catch (error) {
      notifyError(error.toString())
    }
  })

  socket.on('deleteTarea', (id) => {
    console.log('deleteTarea', id);

    try {
      deleteTareaResolver(null, { _id: id })
      notifyTaskNotification('tarea eliminada')
    } catch (error) {
      notifyError(error.toString())
    }
  })

  socket.on('modifyTarea', ({ id, tarea }) => {
    console.log('modifyTarea', { id, tarea });

    try {
      updateTareaResolver(null, {
        _id: id,
        titulo: tarea.title,
        descripcion: tarea.description,
        fileName: tarea.fileName,
        columna: tarea.columna,
      })
      notifyTaskNotification('tarea modificada')
    } catch (error) {
      notifyError(error.toString())
    }
  })

  socket.on('moveTarea', ({ id, tarea }) => {
    console.log('moveTarea', { id, tarea });

    try {
      updateTareaResolver(null, {
        _id: id,
        columna: tarea.columna,
      })
      notifyTaskNotification('tarea movida')
    } catch (error) {
      notifyError(error.toString())
    }
  })


  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

const schema = makeExecutableSchema({ typeDefs, resolvers });

// Set up Apollo Server
const server = new ApolloServer({
  schema,
  plugins: [
    // Proper shutdown for the HTTP server.
    ApolloServerPluginDrainHttpServer({ httpServer }),

    // Proper shutdown for the WebSocket server.
    {
      async serverWillStart() {
        return {
          async drainServer() {
            await serverCleanup.dispose();
          },
        };
      },
    },
  ],
});
await server.start();

const wsServer = new WebSocketServer({
  // This is the `httpServer` we created in a previous step.
  server: httpServer,
  // Pass a different path here if app.use
  // serves expressMiddleware at a different path
  path: '/graphql',
});

const serverCleanup = useServer({ schema }, wsServer);

app.use(
  '/graphql',
  cors(),
  bodyParser.json(),
  expressMiddleware(server),
);

app.use('/', express.static('webapp'));

await new Promise((resolve) => httpServer.listen({ port: 2000 }, resolve));
console.log(`🚀 Server ready at http://localhost:2000/pages`);
