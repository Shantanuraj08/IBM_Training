function clock(){
    let ele=document.getElementById("myclock")
    let date=new Date()
    let h=date.getHours()
    let m=date.getMinutes()
    let s=date.getSeconds()
    let time = h+":"+m+":"+s

    setTimeout(()=>{
        clock()
    },1000)
    ele.innerText=time
}
clock()