/*封装ajax请求，函数返回的是promise对象*/
import axios from 'axios'
export  default  function ajax(url , data={}, type='GET') {
    if(type === 'GET'){
        //对请求参数进行拼串
        // data: {username: tom, password: 123}
        // dataStr: username=tom&password=123
        let dataStr = '';//数据拼接字符串
        Object.keys(data).forEach((key)=>{
            dataStr += key + '=' + data[key] + '&'
        });
        //当有dataStr有值时，对路径进行拼接
        if(dataStr){
            //将最后多余的&去掉。通过substring（）截串
            dataStr =  dataStr.substring(0,dataStr.length-1)
            url = url + '?'+ dataStr
        }
        return axios.get(url)
    }else {
        return axios.post(url,data)//data包含请求体数据的对象
    }
}
