var ui={};
const DECOR=require('./decor')
ui.header=function(text){
    console.log(DECOR.fg.cyan, DECOR.reverse, text, DECOR.reset);
}
ui.ul=function(text){
    console.log(DECOR.fg.cyan,'\t'+ text,DECOR.reset);
}
ui.p=function(text){
    console.log(DECOR.fg.white,DECOR.bright,text,DECOR.reset)
}
ui.question=(text)=>{
    console.log( DECOR.fg.black, DECOR.bright,text,DECOR.fg.yellow)
}
module.exports=ui;