//version 2.0
var EasyAddress = function (areaid, option) {
    this.areaid = areaid;
    this.option = option;

    let address_area = (areaid);
    let input = document.createElement("input");
    input.setAttribute("type", "text");
    input.setAttribute("class", "psha-input");



    document.querySelector(areaid).append(input);
    input.addEventListener('input', function (event) {
        getaddress(option.apikey, input.value, option.searchamount)
    })



    var address_mouseout = true;
    document.querySelector(areaid).addEventListener("mouseover", function () {

        address_mouseout = false;
    })
    document.querySelector(areaid).addEventListener("mouseout", function () {
        address_mouseout = true;

    })

    input.addEventListener("focusout", function (e) {
        // input.addEventListener("focusout", function (e) {


        presskeyword = "";

        if (address_mouseout) {
            closeddropdown();
        } else {

        }

    })
    input.addEventListener("focusin", function () {

        getaddress(option.apikey, input.value, option.searchamount)
    })

    var curser_count = 0;
    var max_curser_count = 0;
    input.addEventListener("keyup", function (e) {

        if (e.key == "ArrowDown" || e.key == "Tab") { //아래로

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


        } else if (e.key == "Enter") {
            if (dataarr[curser_count]) {
                donetext = dataarr[curser_count].innerText + " ";
                input.value = dataarr[curser_count].innerText + " ";
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
        if (!(keyword.startsWith(donetext))) {
            donetext = "";
        }

        if (donetext == "" || !(keyword.startsWith(donetext))) {

            if (keyword != presskeyword) {
                presskeyword = keyword;
                
                url = "https://www.juso.go.kr/addrlink/addrLinkApi.do?keyword=" + keyword + "&confmKey=" + apikey + "&resultType=json&"

                if (countPerPage > 5) {
                    url += "countPerPage=" + countPerPage
                } else {
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

        if (data.length <= 0) {
            closeddropdown();
            return false

        } else {
            dropdownarea.setAttribute("class", "psha-dropdown");
            max_curser_count = data.length;

            for (let i = 0; i < data.length; i++) {

                let inner = document.createElement("div");
                inner.setAttribute("class", "psha-dropdown-data");
                if (option.jibun.view != false) {
                    let jibunarea = document.createElement("div");
                    jibunarea.setAttribute("class", "jusoarea jibunarea");

                    let jibuntextarea = document.createElement("div");
                    jibuntextarea.setAttribute("class", "jusotext jibuntext")

                    if (option.jibun.text) {
                        let jibuntext = document.createTextNode(option.jibun.text)
                        jibuntextarea.appendChild(jibuntext);
                    } else {
                        let jibuntext = document.createTextNode("지번주소")
                        jibuntextarea.appendChild(jibuntext);
                    }
                    let jibunaddrarea = document.createElement("div");
                    jibunaddrarea.setAttribute("class", "jusoaddr jibunaddr")
                    let jibunaddr = document.createTextNode(data[i].jibunAddr)

                    jibunaddrarea.appendChild(jibunaddr);


                    jibunarea.appendChild(jibuntextarea)
                    jibunarea.appendChild(jibunaddrarea)
                    inner.appendChild(jibunarea)
                }

                if (option.road.view != false) {
                    let roadarea = document.createElement("div");
                    roadarea.setAttribute("class", "jusoarea roadarea");

                    let roadtextarea = document.createElement("div");
                    roadtextarea.setAttribute("class", "jusotext roadtext")

                    if (option.road.text) {
                        let roadtext = document.createTextNode(option.road.text)
                        roadtextarea.appendChild(roadtext);
                    } else {
                        let roadtext = document.createTextNode("도로명")
                        roadtextarea.appendChild(roadtext);
                    }
                    let roadaddrarea = document.createElement("div");
                    roadaddrarea.setAttribute("class", "jusoaddr roadaddr")
                    let roadaddr = document.createTextNode(data[i].roadAddr)

                    roadaddrarea.appendChild(roadaddr);


                    roadarea.appendChild(roadtextarea)
                    roadarea.appendChild(roadaddrarea)
                    inner.appendChild(roadarea)
                }

                if (option.eng.view != false) {
                    let engarea = document.createElement("div");
                    engarea.setAttribute("class", "jusoarea engarea");

                    let engtextarea = document.createElement("div");
                    engtextarea.setAttribute("class", "jusotext engtext")

                    if (option.eng.text) {
                        let engtext = document.createTextNode(option.eng.text)
                        engtextarea.appendChild(engtext);
                    } else {
                        let engtext = document.createTextNode("지번주소")
                        engtextarea.appendChild(engtext);
                    }
                    let engaddrarea = document.createElement("div");
                    engaddrarea.setAttribute("class", "jusoaddr engaddr")
                    let engaddr = document.createTextNode(data[i].engAddr)

                    engaddrarea.appendChild(engaddr);


                    engarea.appendChild(engtextarea)
                    engarea.appendChild(engaddrarea)
                    inner.appendChild(engarea)
                }

                if (option.zipNo.view != false) {
                    let zipNoarea = document.createElement("div");
                    zipNoarea.setAttribute("class", "jusoarea zipNoarea");
                    let zipNotextarea = document.createElement("div");
                    zipNotextarea.setAttribute("class", "jusotext zipNotext")

                    if (option.zipNo.text) {
                        let zipNotext = document.createTextNode(option.zipNo.text)
                        zipNotextarea.appendChild(zipNotext);
                    } else {
                        let zipNotext = document.createTextNode("우편번호")
                        zipNotextarea.appendChild(zipNotext);
                    }
                    let zipNoaddrarea = document.createElement("div");
                    zipNoaddrarea.setAttribute("class", "jusoaddr zipNoaddr")
                    let zipNoaddr = document.createTextNode(data[i].zipNo)

                    zipNoaddrarea.appendChild(zipNoaddr);


                    zipNoarea.appendChild(zipNotextarea)
                    zipNoarea.appendChild(zipNoaddrarea)

                    inner.appendChild(zipNoarea)
                }

            
                inner.addEventListener("mousedown", function () {
                    selectmousedown = true;
                    return false
                });

                inner.addEventListener("mouseup", function () {

                    if (selectmousedown) {

                       
                        

                        if(typeof option.selectjuso != "undefined"){
                            if(option.selectjuso == "jibinAddr"){

                                option.event.selectevent(data[i].jibinAddr);
                                input.value = data[i].jibinAddr + " ";
                                donetext = data[i].jibinAddr + " ";

                            }else if(option.selectjuso == "roadAddr"){
                                option.event.selectevent(data[i].roadAddr);
                                input.value = data[i].roadAddr + " ";
                                donetext = data[i].roadAddr + " ";

                            }else if(option.selectjuso == "engAddr"){
                                option.event.selectevent(data[i].engAddr);
                                input.value = data[i].engAddr + " ";
                                donetext = data[i].engAddr + " ";

                            }else if(option.selectjuso == "zipNo"){
                                option.event.selectevent(data[i].zipNo);
                                input.value = data[i].zipNo + " ";
                                donetext = data[i].zipNo + " ";

                            }
                        }else{
                           
                            
                            option.event.selectevent(data[i].roadAddr);
                            input.value = data[i].roadAddr + " ";
                            donetext = data[i].roadAddr + " ";
                        }

                        input.focus();
                        closeddropdown();
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


    this.getinputdata = function () {
        var startsWith = false;
        var inputdata = input.value;
        var selectdata = donetext;
        if (inputdata.startsWith(selectdata)) {
            if (selectdata == "") {
                startsWith = false;
            } else {
                startsWith = true;
            }


        } else {
            startsWith = false;

        }
        return {
            inputdata: inputdata,
            selectdata: selectdata,
            startsWith: startsWith,
            overword: inputdata.replace(selectdata, "")
        }
    }


}



// used
window.onload = function () {
    drwa_address();
}

function drwa_address() {

    var easyinput = new EasyAddress('#address-area', {

        apikey: "(apikey)",
        searchamount: 20,

        selectjuso :"engAddr" , //default, null = roadAddr  (jibunAddr , roadAddr , engAddr , zipNo)
        event: {
            selectevent: function (address) {
                console.log(address)
            }

        },
        
        jibun: {
            view: true, //default,null =  true
            text : "지번주소"//default,null =  "지번주소"
        },

        road: {
            view: true, //default,null =  true
            text : "도로명" //default,null =  "도로명"
        },

        eng: {
            view: true,//default,null =  true
            text: "영문주소"//default,null =  "영문주소"

        },

        zipNo: {
            view: true, //default,null =  true
            text: "우편번호" //default,null =  "우편번호"
        }



    })


    window.addEventListener("keyup", function (e) {

        if (e.key == "ArrowLeft") {
            console.log(easyinput.getinputdata());
        }

    })

}




