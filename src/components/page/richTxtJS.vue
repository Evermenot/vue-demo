<template>
    <div class="richTxtJS">
        <div id="editor"></div>
        <div id="selectEle">
            <el-autocomplete
                size="small"
                ref="inputRef"
                v-model="selectVal"
                class="inline-input"
                @select="selectChange"
                placeholder="请输入内容"
                :fetch-suggestions="remoteMethod"
                @keyup.native="textInput($event)"
            ></el-autocomplete>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                selectVal: '',
                selectOpts: [
                    { "value": "三食（北新泾店）", "address": "http://www.baidu.com" },
                    { "value": "Hot仙霞路）", "address": "http://www.taobao.com" },
                ],
            }
        },
        methods: {
            init() {
                let _this = this
                let editor = document.getElementById("editor")
                editor.contentEditable = true

                // 监听点击事件
                let select = document.getElementById('selectEle')
                editor.addEventListener('click', e => {
                    select.style.display = 'none'

                    let arr = editor.getElementsByTagName('a')
                    for(let i = 0; i < arr.length; i++) {
                        arr[i].style.display = 'none'
                    }
                    // 移除节点
                    let insertTagEle = document.getElementById('insertTag')
                    if(insertTagEle) {
                        insertTagEle.parentNode.removeChild( insertTagEle );
                    }
                }, false)
                // console.dir(editor)
                // 防止敲回车浏览器默认提交表单--导致页面刷新
                editor.onsubmit = function() {
                    return false;
                }
                
                // 监听键盘事件
                editor.addEventListener('keydown', e => {
                    // let selected = window.getSelection()
                    // let dom = getSelection().getRangeAt(0).endContainer;

                    if(e.keyCode === 219) {
                        setTimeout(() => {
                            for(let i = 0; i < editor.children.length; i++) {
                                // 敲回车时会生成空的div元素
                                editor.children[i].style.display = 'inline'
                            }
                            // 在光标处插入空标签方便定位，
                            // 可能还有其他方法,目前只想到这个
                            _this.insertTag();
                            // 获取空的p标签元素
                            let sDom = document.getElementById('insertTag')
                            console.dir(sDom)
                            let top = sDom.offsetTop - 0 + 16
                            let left = sDom.offsetLeft - 0 + 11

                            let select = document.getElementById('selectEle')
                            select.style.display = 'block'
                            select.style.top = top + 'px'
                            select.style.left = left + 'px'
                            _this.selectVal = ''
                            _this.$refs.inputRef.focus()
                        })
                    }
                }, false)

                // 阻止子元素上触发父元素事件
                select.addEventListener('click', e => {
                    e.stopPropagation()
                }, false)
                select.addEventListener('keydown', e => {
                    e.stopPropagation()
                }, false)
            },
            selectChange(val) {
                let select = document.getElementById('selectEle')
                select.style.display = 'none'

                let editor = document.getElementById("editor")
                editor.focus()

                this.createLink(val)

                this.selectVal = ''
            },
            textInput(e) {
                if(e.code == 'Enter') {
                    console.log(this.selectVal)
                }
            },
            remoteMethod(queryString, cb) {
                let restaurants = this.selectOpts
                let results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
                // 调用 callback 返回建议列表的数据
                cb(results);
            },
            createFilter(queryString) {
                return (restaurant) => {
                    return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) !== -1);
                };
            }, 
            insertTag() {
                document.execCommand("insertHTML", false, `<p id='insertTag' style="display:inline"></p>`)
            },
            // 创建链接
            createLink(val) {
                let hrefStr = val.address
                let insertTagEle = document.getElementById('insertTag')

                // 插入链接节点
                let divE = document.createElement("div");
                divE.innerText=val.value
                divE.className = 'divElement'
                divE.contentEditable = false
                insertTagEle.parentNode.insertBefore(divE, insertTagEle.nextSibling);

                let endStr = document.createTextNode(']')
                divE.parentNode.insertBefore(endStr, divE.nextSibling)

                // a标签内插入tip
                let aTag = document.createElement("a");
                aTag.href = hrefStr
                aTag.target = '_blank'
                aTag.className = 'aTagSty'
                aTag.contentEditable = false
                aTag.innerText='查看详情'
                divE.appendChild(aTag)

                divE.addEventListener('click', e => {
                    let arr = editor.getElementsByTagName('a')
                    for(let i = 0; i < arr.length; i++) {
                        arr[i].style.display = 'none'
                    }
                    divE.getElementsByTagName('a')[0].style.display = 'block'
                    e.stopPropagation()
                }, false)
                // 移除节点
                insertTagEle.parentNode.removeChild( insertTagEle );
                this.set_focus()
                // document.execCommand("createLink", false, `<a href="http://www.baidu.com">插入链接</a>`)
                // document.execCommand("insertHTML", false, `<a href="${hrefStr}">插入链接</a>]`)
            },
            // 将光标位置设置到末尾
            set_focus() {
                let el=document.getElementById('editor');
                //el=el[0];  //jquery 对象转dom对象
                el.focus();
                let range = document.createRange();
                range.selectNodeContents(el);
                range.collapse(false);
                let sel = window.getSelection();
                sel.removeAllRanges();
                sel.addRange(range);
            },
        },
        mounted() {
            //初始化编辑器
            this.init()
        },
    }
</script>
<style scoped>
#editor {
    width: 600px;
    height: 200px;
    border:solid 1px #ccc;
    margin-top: 20px;
    position: relative;
    padding: 10px 0;
}
#selectEle {
    display: none;
    position: absolute;
    max-width: 160px;
}
</style>
<style>
.richTxtJS .divElement {
    position: relative;
    display: inline;
    color: #429EFD;
    cursor: pointer;
}
.richTxtJS .aTagSty {
    position: absolute;
    top: -35px;
    left: 0;
    border: 1px solid #ccc;
    box-shadow: 0px 0px 5px #ddd;
    color: #444;
    padding: 5px 12px;
    white-space: nowrap;
    background: #fff;
    font-size: 12px;
    display: none;
    cursor: pointer;
}
.richTxtJS #selectEle {
    display: none;
    position: absolute;
    max-width: 160px;
}
</style>

