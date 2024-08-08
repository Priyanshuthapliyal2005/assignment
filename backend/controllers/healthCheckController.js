const healthCheckController={
    healthCheck(req,res){
       const health={
        uptime:process.uptime(),
        resposetime:process.hrtime(),
        message:"ok",
        timestamp:Date.now()
       }
       try{
        res.status(200).json(health);
       }catch(err){
         res.status(404).json({msg:err});
       }
    }
}

module.exports= {healthCheckController};