let baseUrl = ""
if(process.env.NODE_ENV == 'development') {
    baseUrl = "http://192.168.1.203:8888"  //开发环境url       
}else if(process.env.NODE_ENV == 'production') {
    baseUrl = "http://192.168.1.55:8001"   //生产环境url
}
 
export default baseUrl;