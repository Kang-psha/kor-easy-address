var EasyAddress = function (areaid, option) {
    this.areaid = areaid;
    this.option = option;
    
    let address_area = (areaid);
    let input = document.createElement("input");
    input.setAttribute("type", "text");
    input.setAttribute("class", "psha-input");


   
    document.querySelector(areaid).prepend(input);
    input.addEventListener('input', function (event) {
        getaddress(option.apikey, input.value ,option.searchamount)
    })



    var address_mouseout = true;
    document.querySelector(areaid).addEventListener("mouseover",function(){
      
        address_mouseout = false;
    })
    document.querySelector(areaid).addEventListener("mouseout",function(){
        address_mouseout = true;
    
    })

    input.addEventListener("focusout", function (e) {
        
        presskeyword = "";
   
        if(address_mouseout){
            closeddropdown();
        }else{

        }
        
    })
    input.addEventListener("focusin", function () {
       
        getaddress(option.apikey, input.value , option.searchamount)
    })

    var curser_count = 0;
    var max_curser_count = 0;
    input.addEventListener("keyup", function (e) {
    
        if (e.key == "ArrowDown" || e.key == "Tab") {
           
            curser_count++
            if (curser_count >= max_curser_count) {
                curser_count = 0;
                focuse_address_data(0);
            } else {
                focuse_address_data(curser_count);
            }
            return false
        } else if (e.key == "ArrowUp") { 
            curser_count--
            if (curser_count < 0) {
                curser_count = max_curser_count - 1;
                focuse_address_data(max_curser_count - 1);
            } else {
                focuse_address_data(curser_count);
            }

            e.preventDefault = false
            return false


        }else if(e.key == "Enter"){
            if(dataarr[curser_count]){
                donetext = dataarr[curser_count].innerText + " ";
                input.value =  dataarr[curser_count].innerText + " ";
                input.focus();
                closeddropdown();
                option.event.selectevent(dataarr[curser_count].innerText);
            }
            
        }
        return false;
    })

    let dropdownarea = document.createElement("div");
    dropdownarea.setAttribute("class", "psha-dropdown closed");
    document.querySelector(areaid).append(dropdownarea);
    var curDown = false,
        curYPos = 0

    dropdownarea.addEventListener("mousemove", function (m) {
        if (curDown) {

           
            if ((curYPos - m.pageY) > 6 || (curYPos - m.pageY) < -6) {
                dropdownarea.scrollBy(0, (curYPos - m.pageY))
                curYPos = m.pageY;
            }

            dropdownarea.classList.add("scroll");
            selectmousedown = false
        }

    });

    dropdownarea.addEventListener("mousedown", function (m) {
        curYPos = m.pageY;
        curDown = true;


    });

    window.addEventListener("mouseup", function () {
        dropdownarea.add
        curDown = false;
        dropdownarea.classList.remove("scroll");
    });


    var donetext = ""
    var presskeyword = ""

    function getaddress(apikey, keyword, countPerPage) {
        if(!(keyword.startsWith(donetext))){
            donetext = "";
        }

        if(donetext == "" || !(keyword.startsWith(donetext))){
           
            if(keyword != presskeyword){
                presskeyword = keyword;
                
                url = "https://www.juso.go.kr/addrlink/addrLinkApi.do?keyword=" + keyword + "&confmKey=" + apikey + "&resultType=json&"

                if(countPerPage > 5){
                    url += "countPerPage=" +countPerPage
                }else{
                    url += "countPerPage=5"
                }

                fetch(encodeURI(url), {
                    method: "get"
                }).then(resp => {
                    const respJson = resp.json()
                    return respJson 
                }).then(data => {
                    curser_count = -1
        
                    deletechileall(dropdownarea);
                    innerdata(data.results.juso)
                }).catch(excResp => {
                    
                })
            }
           
        }

    }
    var selectmousedown = false
    var dataarr = [];

    function innerdata(data) {
        dataarr = [];
        
        
       
        if(data.length <= 0 ){
            closeddropdown();
            return false
            
        }else{
            dropdownarea.setAttribute("class", "psha-dropdown");
            max_curser_count = data.length;
    
            for (let i = 0; i < data.length; i++) {
    
                let inner = document.createElement("div");
                inner.setAttribute("class", "psha-dropdown-data");
                let innertext = document.createTextNode(data[i].roadAddr)
                inner.appendChild(innertext);
                inner.addEventListener("mousedown", function () {
                    selectmousedown = true;
                    return false
                });
    
                inner.addEventListener("mouseup", function () {
                    
                    if (selectmousedown) {
                      
                        input.value = data[i].roadAddr + " ";
                        donetext = data[i].roadAddr + " ";
                        input.focus();
                        closeddropdown();
                        option.event.selectevent(data[i].roadAddr);
                    }
                });
    
                dataarr.push(inner);
                dropdownarea.append(inner)
    
            }
        }
        
    }

    function deletechileall(parents) {
        while (parents.hasChildNodes()) {
            parents.removeChild(parents.firstChild);
        }
    }
    function closeddropdown() {
        while (dropdownarea.hasChildNodes()) {
            dropdownarea.removeChild(dropdownarea.firstChild);
        }
        dropdownarea.classList.add("closed");
    }

    function focuse_address_data(num) {

      

        for (var i = 0; i < dataarr.length; i++) {

            dataarr[i].classList.remove("focused");


        }
        var totop = dataarr[num].getBoundingClientRect().top - dropdownarea.getBoundingClientRect().top
        var tobottom = dataarr[num].getBoundingClientRect().bottom - dropdownarea.getBoundingClientRect().bottom
        if (totop < 0) {

            dropdownarea.scrollBy(0, totop)

        } else if (0 < tobottom) {
           
            dropdownarea.scrollBy(0, tobottom + 2);
        }

      
        dataarr[num].classList.add("focused");
    }


    this.getinputdata = function(){
        var startsWith = false;
        var inputdata = input.value;
        var selectdata = donetext ;
        if(inputdata.startsWith(selectdata)){
            if(selectdata == ""){
                startsWith = false;
            }else{
                startsWith = true;
            }
            
         
        }else{
            startsWith = false;
            
        }
        return {
            inputdata : inputdata, 
            selectdata : selectdata ,
            startsWith : startsWith,
            overword : inputdata.replace(selectdata , "")
        }
    }
   
    
}


window.onload = function () {
    drwa_address();
}

function drwa_address() {

    var easyinput = new EasyAddress('#address-area', {

        apikey: "devU01TX0FVVEgyMDIyMDUxOTE3MTQ0MzExMjU5MDU=",
       
        event :{
            selectevent : function(address){
                console.log(address)
            }

        }

    })
    
    var easyinput2 = new EasyAddress('#address-area2', {

        apikey: "devU01TX0FVVEgyMDIyMDUxOTE3MTQ0MzExMjU5MDU=",
        searchamount: 20,
    })

    window.addEventListener("keyup",function(e){
    
        if(e.key == "ArrowLeft"){
            console.log(easyinput.getinputdata());
        }
        
    })

}




