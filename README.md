# kor-easy-address




##### 도로명 주소 검색(html)
```html

<script type="text/javascript" src="/easy-address.js"></script>
<link rel="stylesheet" type="text/css" href="/easy-address.css">
<!-- 최소한의 css -->

<!-- 도로명 주소검색이 필요한 곳 -->
<div id = "address-area">

</div>
```

##### 도로명 주소 검색(javascript) [[도로명주소 api 발급 link]](https://www.juso.go.kr/addrlink/devAddrLinkRequestWrite.do?returnFn=write&cntcMenu=URL)
```javascript
var easyinput = new EasyAddress('#address-area', { // << 도로명 주소검색이 필요한 곳의 id
        //도로명 주소 api https://www.juso.go.kr/addrlink/devAddrLinkRequestWrite.do?returnFn=write&cntcMenu=URL
        apikey: "apikey", //도로명 주소api => 주소검색api > 해당 apikey
        searchamount: 20, //검색할 주소 개수 최소값5 최대값 ?
        event :{ 
            selectevent : function(address){ //사용자가 도로명을 선택(클릭 , 엔터) 하였을때 address = 선택한 주소
                console.log(address)
            }

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
###### 상세 설명___


도로명 주소 검색 api를 가져와 div id와 apikey 입력하면 쉽게 dropdown으로 주소목록을 보고 선택할수있습니다.


도로명 주소입력 방법
> 2글자 이상으로 입력하기만 하면됩니다

상하 이동 방법
> 상(방향키 상)  / 하(방향키 하, tap)
> 마우스 휠 , 드래그 

선택방법
> 마우스 클릭 , 상하이동후 엔터

선택이후
> 선택후에는 검색 기능이 비활성화 됩니다.
> 선택한 글자가 수정,삭제 되어야 다시 검색이 활성화됩니다.
___

[![Hits](https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fgithub.com%2FKang-psha%2Fkor-easy-address&count_bg=%2379C83D&title_bg=%23848484&icon=&icon_color=%23E7E7E7&title=git&edge_flat=false)](https://hits.seeyoufarm.com)
