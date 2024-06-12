import { useEffect, useState } from "react"
import { JsonView, darkStyles, defaultStyles } from 'react-json-view-lite';
import Modal from "../templates/modal";
import i18n from "../i18n/main";
import { iModalFileViewer } from "../interfaces";
import relPath from "../atoms/relPath";

function IsJsonString(str: string) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

export default function ModalFileViewer(props: iModalFileViewer) {
    const [fileContent, setFileContent] = useState<string>('');
    const theme = window.document.documentElement.classList[0] === 'dark' ? darkStyles : defaultStyles;

    useEffect(() => {
        fetch(relPath() + props.path + props.selected)
        .then(res => res.text())
        .then((result: string) => {
            setFileContent(result)
        });
    }, [props.path, props.selected]);

    return <Modal header={props.selected}
        confirmBtn={() => {}}
        modalClose={() => props.modalClose()}
        content={<>
            {(props.selected.split('.')[1] === 'png' || props.selected.split('.')[1] === 'jpg') 
                ? <div className="w-full flex justify-center items-center">
                    <img src={relPath() + props.path + props.selected} alt={props.selected} />
                </div>
                : (props.selected.split('.')[1] === 'json') 
                ? <div className="w-full">
                    {fileContent && IsJsonString(fileContent) && 
                        <JsonView data={JSON.parse(fileContent)} shouldExpandNode={(level) => level === 0} style={theme} />
                    }    
                </div>
                : (props.selected.split('.')[1] === 'html') 
                ? <div className="w-full">
                    {fileContent && <div>{fileContent}</div>}    
                </div>
                : <div>{i18n.t('unsupportedFormat')}</div>
            }
        </>}
        labelCancel={i18n.t('close')}
    />
}