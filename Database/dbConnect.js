let mongoose=require("mongoose")
const {MONGODB_SRV}=require('../config.json')
module.exports={
    connectDb:()=>{
        mongoose.connect(MONGODB_SRV, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(() => {
            console.log("Connected To The Database ✅✅");
        }).catch((err) => {
            console.log(err);
        })
    }
}