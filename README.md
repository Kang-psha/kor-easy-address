# kor-easy-address




##### 도로명 주소 검색(html)
```html

<script type="text/javascript" src="https://cdn.jsdelivr.net/gh/Kang-psha/kor-easy-address/easy-address/easy-address.js"></script>
<link rel="stylesheet" type="text/css" href="/easy-address.css">
<!-- 최소한의 css -->

<!-- 도로명 주소검색이 필요한 곳 -->
<div id = "address-area">

</div>
```

##### 도로명 주소 검색(javascript) [[도로명주소 api 발급 link]](https://www.juso.go.kr/addrlink/devAddrLinkRequestWrite.do?returnFn=write&cntcMenu=URL)
```javascript
var easyinput = new EasyAddress('#address-area', {

        apikey: "(apikey)", //도로명주소 도로명주소검색apikey
        searchamount: 20, //한번에 출력할 개수

        //사용자 선택시 input태그에 쓰일 주소                
        selectjuso :"engAddr" , //default, null = roadAddr  (jibunAddr , roadAddr , engAddr , zipNo)
        
        event: { //사용자가 선택시 선택한 주소 출력.
            selectevent: function (address) {
                console.log(address)
            }
        },
        
        //주소 검색시 출력 여부 주소,지번(true or false) 출력할 주소앞 문구(text).
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
```
##### input안에 있는 값 가져오기
```javascript
easyinput.getinputdata()
/*
result 

inputdata => 사용자가 입력한 문구  : string
selectdata => 사용자가 선택한 주소(클릭시 , 엔터시)  : string
overword: => 사용자가 선택한주소 뒤에 오는 문자열  : string
startsWith: => 사용자가 선택했는지(클릭을,엔터를)   : boolean

*/
```
###### 상세 설명
___
도로명 주소 검색 api를 가져와 div id와 apikey 입력하면 쉽게 dropdown으로 주소목록을 보고 선택할수있습니다.

도로명 주소입력 방법
> 2글자 이상으로 입력하기만 하면됩니다

상하 이동 방법
> 상(방향키 상)  / 하(방향키 하, tab)
> 마우스 휠 , 드래그 

선택방법
> 마우스 클릭 , 상하이동후 엔터

선택이후
> 선택후에는 검색 기능이 비활성화 됩니다.
> 선택한 글자가 수정,삭제 되어야 다시 검색이 활성화됩니다.
___

###### 다음 업데이트 예상
> 드롭다운 내에 도로명 지번 영문 따로보기.

[![Hits](https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fgithub.com%2FKang-psha%2Fkor-easy-address&count_bg=%2379C83D&title_bg=%23848484&icon=&icon_color=%23E7E7E7&title=git&edge_flat=false)](https://hits.seeyoufarm.com)
