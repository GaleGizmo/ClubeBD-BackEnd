const User=require("./user.model")

const logUser=async(req, res)=>{
    try{
        const {userId}=req.body
        const user=await User.findById(userId)
        if(user){
           user.logged=true
           await user.save()
           return res.status(200).json({message:"Usuario logado", user:user})
        }else{
          return res.status(404).json({ message: "Usuario non atopado" });
        }
    }catch(err){
        console.log(err)
    }
}

const getAvailableUsers=async(req, res)=>{
    try{
        const users=await User.find({logged:false})
        if (!users) return res.status(404).json({ message: "Non hai usuarios dispoñibles" });
        return res.status(200).json({users:users})
    }catch(err){
        console.log(err)
    }
}

const logOutUser=async(req, res)=>{
    try{
        const {userId}=req.body
        const user=await User.findById(userId)
        if(user){
           user.logged=false
           await user.save()
           return res.status(200).json({message:"Usuario deslogado", user:user})
        }else{
          return res.status(404).json({ message: "Usuario non atopado" });
        }
    }catch(err){
        console.log(err)
    }
}

const getUserRatings=async(req, res)=>{
    try{
        const {userId}=req.body
        
        const user=await User.findById(userId)
        if(user){
           return res.status(200).json(user.rated_comics)
        }else{
          return res.status(404).json({ message: "Usuario non atopado" });
        }
    }catch(err){
        console.log(err)
    }
}
module.exports={
    logUser, getAvailableUsers, logOutUser, getUserRatings
}