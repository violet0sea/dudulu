import React from 'react';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';
import './index.css';

const styles = {
    toolbarStyle: {
        position: 'sticky', 
        top: 0, 
        zIndex: 999
    }
}

class EditorI18n extends React.Component {
    constructor(props) {
        super(props);
        let propsContent;
        try {
            // 有些时候保存的数据并不是Editor解析的数据，会导致出错
            let handledContent = this.addMediaTopBlackLine(JSON.parse(props.content));
            propsContent = EditorState.createWithContent(convertFromRaw(handledContent));
        } catch(err) {
            propsContent = EditorState.createEmpty();
        }
        this.state = {
            editorState: props.content ?propsContent : EditorState.createEmpty()
        }

    }

    onEditorStateChange = (editorState) => {
        const html = draftToHtml(convertToRaw(editorState.getCurrentContent()));
        this.props.onChange&&this.props.onChange(html);
        this.setState({ editorState });
    }

    uploadImageCallBack = file => {
        return new Promise(
            (resolve, reject) => {
                if(window.FileReader) {
                    const reader = new FileReader();
                    if (file && file.type.match('image.*')) {
                        reader.readAsDataURL(file);
                    }
                    reader.onload = () =>{
                        // 存储image的宽高信息
                        const promise = new Promise((resolve, reject) => {
                            const image = new Image();
                            image.src = reader.result;
                            image.onload = () => {
                                const width = image.naturalWidth;
                                const height = image.naturalHeight;
                                resolve({width, height});
                            }
                        });
                        promise.then(wh => {
                            const data = new FormData();
                            data.append('file', file);
                            // upload(data).then(res => {
                            //     const url = res.prefix + res.url + res.suffix;
                            //     this.imageSize[url] = {
                            //         width: wh.width,
                            //         height: wh.height
                            //     };
                            //     resolve({data: {link: url}});
                            // }, err => {
                            //     reject(err);
                            // });
                        });
                    }
                } 
            }
          );
    } 

    render() {
        const { editorState } = this.state;
        return (
            <Editor
                toolbar={{
                    inline: { inDropdown: true },
                    list: { inDropdown: true },
                    textAlign: { inDropdown: true },
                    history: { inDropdown: true },
                    image: { uploadCallback: this.uploadImageCallBack },
                    link: { inDropdown: true },
                }}
                editorClassName="editor-content"
                editorState={editorState}
                onEditorStateChange={this.onEditorStateChange}
                localization={{
                    locale: 'zh', 
                    translations: {
                        'components.controls.embedded.embeddedlink': '内嵌视频',
                        'components.controls.embedded.enterlink': '输入Youtube视频地址'
                    }
                }}
                toolbarStyle={styles.toolbarStyle}
            />

        )
    }
}

export default EditorI18n;
