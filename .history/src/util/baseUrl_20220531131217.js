let baseUrl = ""
switch (process.env.NODE_ENV) {
    case 'development':
        baseUrl = "http://192.168.1.203:3000"  //开发环境url       
        break
    case 'production':
        baseUrl = "http://192.168.1.55:8001"   //生产环境url
        break
}
 
export default baseUrl;