
function getArrRandomly(arr) {
    var len = arr.length;
    //首先从最小的数开始遍历，之后递增
    for (var i = 0; i < len; i++) {
        var randomIndex = Math.floor(Math.random()*(len-i));//这里一定要注意，后面不管是（i+1）还是（len-i），它们是时变的。
        var itemAtIndex = arr[randomIndex];
        arr[randomIndex] = arr[i];
        arr[i] = itemAtIndex;
    }
    //每一次遍历，都相当于把从数组中随机抽取（不重复，因为）一个元素放到数组的最前面（索引顺序为0，1，2...len-1）
    return arr;
}
function urlParse () {
    let url = window.location.search;
    let obj = {};
    let reg = /[?&][^?&]+=[^?&]+/g;
    let arr = url.match(reg);
    // ['?id=123232', '&a=b']
    if (arr) {
        arr.forEach((item) => {
            let tempArr = item.substring(1).split('=');
            let key = decodeURIComponent(tempArr[0]);
            let val = decodeURIComponent(tempArr[1]);
            obj[key] = val;
        });
    }
    return obj;
};
function initFont(fontArr) {
    var fontArrSize = fontArr.length;
    for(var i = 0; i < fontArrSize; i++) {
        var id = 'font' + i;
        $("#mainBox").append(
                '<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" id="'+ id +'" class="itemWrap">'+
                  '<line x1="0" y1="0" x2="200" y2="200" stroke="#DDD" />'+
                  '<line x1="200" y1="0" x2="0" y2="200" stroke="#DDD" />'+
                  '<line x1="100" y1="0" x2="100" y2="200" stroke="#DDD" />'+
                  '<line x1="0" y1="100" x2="200" y2="100" stroke="#DDD" />'+
                '</svg>'+
                '<button id="'+ id +'-write" class="btn-success">示范写</button>'+
                '<button id="'+ id +'-reset" class="btn-info">我来写</button>'
        )
        var writer = HanziWriter.create(id, fontArr[i], {
          width: 200,
          height: 200,
          padding: 5,
          drawingWidth: 40,
          showOutline: true
        });
        writer.quiz();
        (function (writer, id){
            document.getElementById( id +'-write').addEventListener('click', function() {
              writer.animateCharacter();
            });
            document.getElementById( id +'-reset').addEventListener('click', function () {
              writer.quiz();
            });
        })(writer, id);
    }
}