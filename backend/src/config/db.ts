
import mongoose from 'mongoose'
import { MONGO_URI } from '../constant/env'

const connectTodb=async()=>{
    try {
        await mongoose.connect(MONGO_URI)
        console.log('succesfully connect to database')
    } catch (error) {
        console.log('internal error',error)
        process.exit(1)
    }
}
export default connectTodb;