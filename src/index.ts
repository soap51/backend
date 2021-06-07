import express, { Application, Request, Response } from 'express'
import mongoose from 'mongoose'
import route from './routes'
import dotenv from 'dotenv';
import { connect } from './utils/database';
dotenv.config();

connect();

const port = process.env.PORT || 3000;

const app: Application = express()

app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin' , '*'); // Any Host can use API , Parameter 2 is URL you want to allow CORS
    res.header(
        'Access-Control-Allow-Headers' , 
        'Origin , X-Requested-With , Content-Type , Accept , Authorization'
    ) // Allow Any Header
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods' , 'PUT, POST, PATCH, DELETE , GET')
        return res.status(200).json({})
    }
    next();
})

app.use(express.urlencoded({extended : false}))
app.use(express.json())
app.use('/api',route);

const http = require('http');

const server = http.createServer(app);

server.listen(port)