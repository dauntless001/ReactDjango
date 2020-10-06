import Axios from 'axios'


export const AxiosGet = url =>{
    return(
        Axios({
            method : 'GET',
            url : url
        })
    )
}

export const AxiosDelete = url =>{
    return(
        Axios({
            method : 'DELETE',
            url : url
        })
    )
}

export const AxiosPost = url =>{
    return(
        Axios({
            method : 'POST',
            url : url
        })
    )
}