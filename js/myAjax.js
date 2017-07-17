function myAjax(c) {
    if(!c.url){
        throw new Error('URL是必填字段')
    }
    if(!c.type){
        c.type = 'get'
    }
    var xhr = new XMLHttpRequest()
    if(c.type.toLowerCase() == 'get'){
        if(c.data){
            c.url+='?'+c.data
        }
    }
    xhr.open(c.type,c.url,true)

    if(c.type.toLowerCase() == 'get'){
        xhr.send()
    }else {
        xhr.setRequestHeader('content-type','application/x-www-form-urlencoded')
        xhr.send(c.data)
    }

    xhr.onreadystatechange = function () {
        if(xhr.readyState == 4 && xhr.status == 200){
            c.success(xhr.responseText)
        }
    }
}
