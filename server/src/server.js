require('dotenv').config()
const express=require('express')
const bodyParser=require('body-parser')
const cors=require('cors')
const database=require('./database/database')
const app=express()
app.use(bodyParser.json());
app.use(express.static('./public'))
app.use(cors())


//// middleware
const mw=require('./middleware/auth')
app.use(mw)

//// storage route
const storageRoute=require('./routes/storage')

//// admin route
const adminRoute=require('./routes/admin')

//// products route
const productsRouter=require('./routes/products')

//// comments route
const commentsRouter=require('./routes/comments')

//// users route
const usersRouter=require('./routes/users')

//// orders route
const ordersRouter=require('./routes/orders')

//// offers
const offersRouter=require('./routes/offers')

//// basket router
const basketRouter=require('./routes/basket')

////
app.use('/storage/image',storageRoute)
app.use('/api/admin',adminRoute)
app.use('/api/products',productsRouter)
app.use('/api/comments',commentsRouter)
app.use('/api/users',usersRouter)
app.use('/api/orders',ordersRouter)
app.use('/api/offers',offersRouter)
app.use('/api/basket',basketRouter)

app.listen(process.env.PORT,()=>console.log(`server is running on port ${process.env.PORT}`))
