const express = require('express');
//import * as express from "express"; //상관없음.(commonjs / 모듈적용된 최근 js든)
//@type/'모듈명'을 깔아줘야, 문제없이 렌더링 할수있음. 

//import { ApolloServer} from 'apollo-server-express';
//import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core'
const cors = require('cors');
const cookieParser = require('cookie-parser');
const session = require('express-session'); 
const passport = require('passport');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo');
const bodyParser = require('body-parser');

import { MySchema} from "./graphql/schema";
import { graphqlHTTP } from 'express-graphql'; 

import 'dotenv/config'
const { PORT, MONGO_URI, Local, SiteUrl} = process.env;


  const app = express();

  //App ====================================================//
    const indexRouter = require('./routes/index');
    const loginRouter = require('./routes/login');
    const userRouter = require('./routes/user');

    app.use(cookieParser(process.env.COOKIE_SECRET));

    //body-parser
    app.use(express.json());
    app.use(express.urlencoded({extended:true})); 

    app.use(cors({origin: [Local, SiteUrl], credentials: true}));
    app.disable("x-powered-by"); 
   
    //세션 
    app.use(session({
        secret: process.env.SECRET_CODE,
        //proxy : true, 
        resave: true,
        saveUninitialized: true,
        cookie:{//same-site : none, 
                //secure : true, 
                maxAge: null
               },
        store: MongoStore.create({ mongoUrl: MONGO_URI})
        }
      )); 

    //passport//
    app.use(passport.initialize()); //passport 초기화 
    app.use(passport.session()); //passport - session 연결 
    
    //app 경로 
    app.use('/', indexRouter);
    app.use('/login', loginRouter);
    app.use('/user', userRouter );

    //graphql_root
    const getUser = (current :any)=>{
        return current.user; 
    }

    app.use(bodyParser.json());
    app.use('/graphql', graphqlHTTP(async(request)=>({
        schema : MySchema,
        rootValue : await getUser(request),
        graphiql: true,
       // context : await getUser(request)
       /*context : buildContext({req, res}) 
                  graphql-passport 사용시.*/
      })
    ));

  //==================================================================// 
    //debug
      app.get("/debug", (req : any, res : any) => {
      res.json({
        "req.user": req.user, 
        "req.session": req.session,
      })
    })
  
  //==================================================================// 
    //DB연결 
    mongoose.connect(MONGO_URI, { 
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }).then(()=>console.log('mongoDB : connected'))
      .catch((error: unknown) =>console.error(error))


app.listen(PORT, ()=>console.log(`connected ${PORT}`));







