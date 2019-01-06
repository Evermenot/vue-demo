<template>
    <div>
        <el-input v-model="content" placeholder="请输入内容"></el-input>
        <quillEditor ref="editor" id="editor" :content="content"></quillEditor>
    </div>
</template>

<script>
// require styles
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

import { quillEditor } from "vue-quill-editor";

export default {
    components: {
        quillEditor: quillEditor
    },
    data: function() {
        return {
            content: "hello world"
        };
    },
    methods: {
        insertLink(url, editor) {
            console.log(123, editor)
            const range = editor.getSelection();
            console.log( editor.getSelection() )
            const name = 'a链接'
            editor.insertEmbed(range.index, 'link', {href: url, innerText: name}, "api")
        }
    },
    mounted() {
        let Link = Quill.import('formats/link')
        class FileBlot extends Link {
            static create(value) {
                let node = undefined
                if ( value && !value.href ){
                    node = super.create(value);  
                }else{
                    node = super.create(value.href);  
                    node.setAttribute('download', true);  // 左键点击即下载
                    node.innerText = value.innerText;
                }
                return node
            }
        }
        FileBlot.blotName = 'link'
        FileBlot.tagName = 'A'
        Quill.register(FileBlot)

        



        let edt = document.getElementById("editor");
        // 监听键盘事件
        let _this = this
        edt.addEventListener( "keydown", e => {
            if (e.keyCode === 219) {
                // let content = "<a href='http://www.baidu.com'>链接</a>]";
                // this.content = `<el-input v-model='content'><el-input>`
                _this.insertLink("http://www.baidu.com", _this.$refs['editor']['quill'])
            }
        }, false);
    }
};
</script>

<style scoped>

</style>
<style>
.ql-toolbar.ql-snow {
    display: none;
}
.ql-toolbar.ql-snow + .ql-container.ql-snow {
    border-top: 1px solid #ccc;
}
.ql-editor {
    margin-top: 100px;
    border-top: 1px solid #ccc;
}
.ql-action {
    display: none;
}
.ql-remove {
    display: none;
}
.ql-tooltip::before {
    content: "查看该指标详情:" !important;
}
</style>

