let baseUrl = ""
if(process.env.NODE_ENV=='development') {
    baseUrl = "http://192.168.1.203:3000"  //开发环境url       
}else{
    baseUrl = "http://192.168.1.55:8001"   //生产环境url
}
 
export default baseUrl;