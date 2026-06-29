import React, { useEffect, useState, useMemo, useCallback } from "react"; // Добавили useCallback
import { JsonView, darkStyles, defaultStyles } from 'react-json-view-lite';
import Modal from "../templates/modal";
import i18n from "../i18n/main";
import { iModalFileViewer } from "../interfaces";
import StepsAnimation from "../atoms/stepsAnimation";

export function IsJsonString(str: string): boolean {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

export const ModalFileViewer = React.memo(function ModalFileViewer(props: iModalFileViewer) {
    const [fileContent, setFileContent] = useState<string>('');
    const [imgLoaded, setImgLoaded] = useState<boolean>(false);
    const theme = useMemo(() => {
        return window.document.documentElement.classList.contains('dark') ? darkStyles : defaultStyles;
    }, []);

    useEffect(() => {
        if (!props.selected.endsWith('png') && !props.selected.endsWith('jpg')) {
            fetch(`${props.path}${props.selected}?code=${localStorage.getItem('code') || '0'}`)
                .then(res => res.text())
                .then((result: string) => {
                    setFileContent(result);
                });
        }
    }, [props.path, props.selected]);

    const parsedJson = useMemo(() => {
        if (props.selected.endsWith('.json') && fileContent && IsJsonString(fileContent)) {
            return JSON.parse(fileContent);
        }
        return null;
    }, [fileContent, props.selected]);

    const handleShouldExpandNode = useCallback((level: number) => {
        return level === 0;
    }, []);

    return <Modal header={props.selected}
        confirmBtn={() => {}}
        modalClose={() => props.modalClose()}
        content={<>
            {(props.selected.endsWith('.png') || props.selected.endsWith('.jpg')) 
                ? <div className="w-full flex justify-center items-center">
                    {!imgLoaded && <div className="flex justify-center items-center h-24">
                        <StepsAnimation />
                    </div>}
                    <img src={props.path + props.selected} 
                        alt={props.selected} 
                        onLoad={() => setImgLoaded(true)} 
                    />
                </div>
                : (props.selected.endsWith('.json')) 
                    ? <div className="w-full">
                        {parsedJson 
                            ? <JsonView 
                                  data={parsedJson} 
                                  shouldExpandNode={handleShouldExpandNode} // <-- Используем стабильную функцию
                                  style={theme} 
                            /> 
                            : <div className="flex justify-center items-center h-24">
                                  <StepsAnimation />
                            </div>
                        }    
                    </div>
                    : (props.selected.endsWith('.html') || props.selected.endsWith('.html.gz')) 
                        ? <div className="w-full">
                            {fileContent 
                                ? <div>{fileContent}</div>
                                : <div className="flex justify-center items-center h-24">
                                      <StepsAnimation />
                                  </div>
                            }    
                        </div>
                        : <div>{i18n.t('unsupportedFormat')}</div>
            }
        </>}
        labelCancel={i18n.t('close')}
    />
});