module.exports = {
  checkAndFix: function(data){
    data.forEach(d=>{
      if(d.riskLevel>100) d.riskLevel=100;
      if(d.projectedLossUSD<0) d.projectedLossUSD=0;
      if(d.extremeScenariosCount<0) d.extremeScenariosCount=0;
      if(d.score>100) d.score=100;
    });
  }
};