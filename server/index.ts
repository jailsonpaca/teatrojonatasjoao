//import { createServer } from 'http'
//import { parse } from 'url'
import next from 'next'

const port = parseInt(process.env.PORT || '3000', 10)
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const bodyParser = require('body-parser');
const express = require('express');
const handle = app.getRequestHandler()
const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  completed: Boolean,
  created_at: { type: Date, default: Date.now },
});

const Project = mongoose.model("Project", ProjectSchema);

// ============================================
// Admin Bro
const AdminBro = require("admin-bro");
const AdminBroExpress = require("@admin-bro/express");
const AdminBroMongoose = require("@admin-bro/mongoose");

// use mongoose in AdminBro
AdminBro.registerAdapter(AdminBroMongoose);

// config
const adminBroOptions = new AdminBro({
  resources: [
    {
      resource: Project,
      options: {
        properties: {
          description: { type: "richtext" },
          created_at: {
            isVisible: { edit: false, list: true, show: true, filter: true },
          },
        },
      },
    },
  ],
  locale: {
    translations: {
      labels: {
        Project: "My Projects",
      },
    },
  },
  rootPath: "/admin",
});

const router = AdminBroExpress.buildRouter(adminBroOptions);

app.prepare().then(async () => {

  //const parsedUrl = parse(req.url!, true)
  //const { pathname, query } = parsedUrl;
  const server = express();
  await mongoose.connect(`MONGO_URL`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  server.use(bodyParser.urlencoded({ extended: false }))
  server.use(bodyParser.json())
  server.use(adminBroOptions.options.rootPath, router);
  server.all('*', (req: any, res: any) => {
    return handle(req, res)
  })
  server.listen(port, (err?: any) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
  /*
      if (pathname === '/a') {
        app.render(req, res, '/a', query)
      } if (pathname === '/b') {
        app.render(req, res, '/b', query)
      } else {
        server.all('*', (req: any, res: any) => {
          return handle(req, res)
        })
      }*/
})
