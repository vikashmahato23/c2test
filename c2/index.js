const express=require("express")
const mongoose=require("mongoose")

const app=express()

app.use(express.json())

const connectdb=()=>{
    return  mongoose.connect("mongodb+srv://vikash1997:Jyotibharti12@cluster0.mhoai.mongodb.net/bank?retryWrites=true&w=majority")
 }

 const userSchema= new mongoose.Schema(
    {
    firstName:{type:String,reuired:true},
    middleName:{type:String,optional:""},
    lastName:{type:String,reuired:true},
    age:{type:Number,reuired:true},
    address:{type:String,reuired:true},
    gender:{type:String,optional:"",default:"Female"},
 
    email:{type:String,required:true,unique:true},
    
  

}, 
 {
   
   timestamps:true,
},

)
const User= mongoose.model("user",userSchema);

 const BankSchema= new mongoose.Schema(
    {
     Name:{type:String,reuired:true,unique:true},
     address:{type:String,reuired:true,unique:true},
    IFSC:{type:String,reuired:true,unique:true},
    MICR:{type:Number,reuired:true,unique:true},
    
  

}, 
 {
   
   timestamps:true,
},

)
const Bank= mongoose.model("bank",BankSchema);


 const MasterSchema= new mongoose.Schema(
    {
        balance:{type:Number,reuired:true},
    
    
  

}, 
 {
   
   timestamps:true,
},

)
const Master= mongoose.model("master",MasterSchema);

 const SavingSchema= new mongoose.Schema(
    {
        account_number:{type:Number,reuired:true,unique:true},
        balance:{type:Number,reuired:true},
        interestRate:{type:Number,reuired:true}
    
    
  

}, 
 {
   
   timestamps:true,
},

)
const Saving= mongoose.model("saving",SavingSchema);


 const FixiedSchema= new mongoose.Schema(
    {
        account_number:{type:Number,reuired:true,unique:true},
        balance:{type:Number,reuired:true},
        interestRate:{type:Number,reuired:true},
        startDate:{type:Date,efault: Date.now},
        maturityDate:{type:Date,efault: Date.now},
    
    
  

}, 
 {
   
   timestamps:true,
},

)
const Fixed= mongoose.model("fixed",FixiedSchema);



app.get("/users",async(req,res)=>{
    try{
       const users=await User.find().populate({path:"masterId", select:["balance"]}).lean().exec()
       console.log(users)
       return res.status(200).send({users:users})
    }catch(err){
       
        return res.status(500).send({message:"something went worng ..try agaig later"})

    }
})

// ********************************
app.post("/users",async(req,res)=>{
    try{
        const user=await User.create(req.body)
        
        return res.status(201).send({user:user})
    }
    catch(err){
        return res.status(500).send({message:"somthing wrong"})
    }
})

// *********************************

app.get("/users/:id",async(req,res)=>{
    try{
       const user=await User.findById(req.params.id,{new:true,}).lean().exec()
    // const user=await User.findByIdAndUpdate(req.params.id,req,body);
    // for update

       return res.status(200).send({user})
    }catch(err){
        console.log(err)
        return res.status(500).send({message:"something went worng ..try agaig later"})

    }
})

// *******************
app.patch("/users/:id",async(req,res)=>{
    try{

    const user=await User.findByIdAndUpdate(req.params.id,req.body,{new:true,}).lean().exec();
    // for update

       return res.status(200).send({user})
    }catch(err){
          console.log(err)
        return res.status(500).send({message:err})

    }
})
// ***********************
// delet
app.delete("/users/:id",async(req,res)=>{
    try{
       const user=await Post.findByIdAndDelete(req.params.id).lean().exec();
       return res.status(200).send({user})
    }catch(err){
        console.log("postpatch",err)
        return res.status(500).send({userdelmessage:err})
    }

})




app.get("/bank",async(req,res)=>{
    try{
       const users=await User.find().populate({path:"masterId", select:["balance"]}).lean().exec()
       console.log(users)
       return res.status(200).send({users:users})
    }catch(err){
       
        return res.status(500).send({message:"something went worng ..try agaig later"})

    }
})



app.post("/bank",async(req,res)=>{
    try{
        const user=await User.create(req.body)
        
        return res.status(201).send({user:user})
    }
    catch(err){
        return res.status(500).send({message:"somthing wrong"})
    }
})

// *********************************

app.get("/bank/:id",async(req,res)=>{
    try{
       const user=await User.findById(req.params.id,{new:true,}).lean().exec()
    // const user=await User.findByIdAndUpdate(req.params.id,req,body);
    // for update

       return res.status(200).send({user})
    }catch(err){
        console.log(err)
        return res.status(500).send({message:"something went worng ..try agaig later"})

    }
})

// *******************
app.patch("/bank/:id",async(req,res)=>{
    try{

    const user=await User.findByIdAndUpdate(req.params.id,req.body,{new:true,}).lean().exec();
    // for update

       return res.status(200).send({user})
    }catch(err){
          console.log(err)
        return res.status(500).send({message:err})

    }
})
// ***********************
// delet
app.delete("/bank/:id",async(req,res)=>{
    try{
       const user=await Post.findByIdAndDelete(req.params.id).lean().exec();
       return res.status(200).send({user})
    }catch(err){
        console.log("postpatch",err)
        return res.status(500).send({userdelmessage:err})
    }

})




 app.listen(6000,async()=>{
    try{
var c=  await connectdb();

    }catch(err){

        console.log("err",err)
    }

console.log("Port 5000")

})