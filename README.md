# kor-easy-address

도로명 주소 검색(html)
```html
<!-- 도로명 주소검색이 필요한 곳 -->
<div id = "address-area">

</div>
```

도로명 주소 검색(javascript)
```javascript
var easyinput = new EasyAddress('#address-area', { // << 도로명 주소검색이 필요한 곳의 id
        
        apikey: "apike", //도로명 주소api => 주소검색api > apikey
       
        event :{ 
            selectevent : function(address){ //선택 되었을때의 도로명주소
                console.log(address)
            }

        }

})
```
input안에 있는 값 가져오기
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




[![Hits](https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fgithub.com%2FKang-psha%2Fkor-easy-address&count_bg=%2379C83D&title_bg=%23848484&icon=&icon_color=%23E7E7E7&title=git&edge_flat=false)](https://hits.seeyoufarm.com)
