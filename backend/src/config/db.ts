
import mongoose from 'mongoose'

const connectTodb=async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
    } catch (error) {
        console.log('internal error',error)
        process.exit(1)
    }
}
export default connectTodb;