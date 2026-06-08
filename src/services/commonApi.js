import axios from 'axios'

const commonApi = async(reqUrl,reqMethod,reqData,reqHeader)=>{
    const config = {
        url:reqUrl,
        method:reqMethod,
        data:reqData,
        headers:reqHeader? reqHeader: {'Content-Type':'application/json'}
    }

    try{
      const res = await axios(config)
      return res
    }
    catch(err){
      console.log("API Error:", err)
      return err.response || { status: 500, data: "Network Error or Server not reachable" }
    }
}

export default commonApi