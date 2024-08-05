import { useEffect, useState, useCallback } from "react";
import { useSelector } from 'react-redux';
import i18n from "../i18n/main";
import axios from "axios";
import hostUrl from "../atoms/hostUrl";
import OneColumn from "../templates/oneColumn";
import Card from "../atoms/card";
import Button from "../atoms/button";
import ModalFileViewer from "./modalFileViewer";
import { iData } from "../redux/dataTypes";
import { iFile, iFilelist } from "../interfaces";
import { CheckCircle, XCircle } from "@phosphor-icons/react";
import { ReactComponent as FolderSVG } from '../atoms/icons/folder.svg';
import { ReactComponent as HtmlSVG } from '../atoms/icons/html.svg';
import { ReactComponent as JsonSVG } from '../atoms/icons/json.svg';
import { ReactComponent as ImageSVG } from '../atoms/icons/image.svg';
import { ReactComponent as RubickSVG } from '../atoms/icons/rubick.svg';

export default function Filesystem(props: {stopDataFetching(val: boolean): void}) {
    const data = useSelector((state: iData) => state.data);
    const [filelist, setFilelist] = useState<iFilelist>([]);
    const [selected, setSelected] = useState<string>('.');
    const [path, setPath] = useState<string>('/');
    const [upFilename, setUpFilename] = useState<string>('');
    const [fileViewer, setFileViewer] = useState<boolean>(false);
    const [percentage, setPercentage] = useState<string>('');
    const [isDir, setIsDir] = useState<boolean>(true);
    const [renaming, setRenaming] = useState<string>('');
    const [newName, setNewName] = useState<string>('');

    const style1 = 'pt-1 px-1 flex items-center justify-between cursor-pointer ';
    const style2 = 'bg-blue-200 dark:bg-cyan-950';
    const style3 = 'odd:bg-page_light dark:odd:bg-page_dark hover:bg-blue-100 hover:odd:bg-blue-100 hover:dark:bg-gray-800 hover:dark:odd:bg-gray-800';

    const fileOpen = useCallback((file: iFile) => {
        if(file.type === 'dir') {
            setSelected('');
            if(file.name === '.') setPath('/');
            else if(file.name === '..') setPath(path.replace(/\w+\/$/g, ''));
            else setPath(path + file.name + '/');
        }
        if(file.type === 'file') {
            setFileViewer(true);
        }
    }, [path]);

    const openBtn = () => {
        if(selected === '.') fileOpen({name: '.', type: 'dir'});
        if(selected === '..') fileOpen({name: '..', type: 'dir'});
        filelist.forEach(file => {
            if(file.name === selected) {
                fileOpen(file);
            }
        });
    }

    const downloadBtn = () => {
        document.getElementById(path + selected)?.click();
    }

    const rename = useCallback(() => {
        if(renaming !== newName) {
            filelist.forEach(file => {
                if(file.name === newName) alert(i18n.t('FileAlreadyExists').replace('XXX', newName));
            });

            axios({ 
                method: 'post',
                url: `${hostUrl()}/esp/rename`,
                data: `old=${path + renaming}&new=${path + newName}&code=${localStorage.getItem('code') || '0'}`
            });
        }
        setRenaming('');
    }, [filelist, newName, renaming, path]);

    const renameBtn = useCallback(() => {
        filelist.forEach(file => {
            if(file.name === selected && file.type === 'file') {
                setRenaming(file.name);
                setNewName(file.name);
            }
        });
    }, [filelist, selected]);

    const deleteBtn = useCallback(() => {
        filelist.forEach(file => {
            if(file.name === selected && file.type === 'file') {
                if(window.confirm(i18n.t('confirmDeletionOfTheFile').replace('XXX', path + selected))) {
                    axios({
                        method: 'post',
                        url: `${hostUrl()}/esp/delete`,
                        data: `file=${path + selected}&code=${localStorage.getItem('code') || '0'}`
                    });
                }
            }
        });
    }, [filelist, path, selected]);

    const closeModal = () => {
        document.querySelector('body')?.classList.remove('modal-open');
        setFileViewer(false);
    }

    const handleUserKeyPress = useCallback((event: KeyboardEvent) => {
        if(event.key === 'ArrowUp' && !fileViewer) {
            if(selected === '..' || selected === '') setSelected('.');
            let prev = '';
            filelist.forEach(file => {
                if(file.name === selected) {
                    if(prev) setSelected(prev);
                    else setSelected('..');
                }
                else prev = file.name;
            });
        }

        if(event.key === 'ArrowDown' && !fileViewer) {
            if(selected === '.' || selected === '') setSelected('..');
            if(selected === '..') setSelected(filelist[0].name);
            let next = '';
            filelist.slice().reverse().forEach(file => {
                if(file.name === selected) {
                    if(next) setSelected(next);
                }
                else next = file.name;
            });
        }

        if(event.key === 'Enter' && !fileViewer) {
            if(renaming) rename();
            else {
                if(selected === '.') fileOpen({name: '.', type: 'dir'});
                if(selected === '..') fileOpen({name: '..', type: 'dir'})
                filelist.forEach(file => {
                    if(file.name === selected) fileOpen(file);
                });
            }
        }

        if(event.key === 'Backspace' || event.key === 'Escape') {
            if(renaming) {
                if(event.key === 'Escape') setRenaming('');
            }
            else {
                if(fileViewer) closeModal();
                else fileOpen({name: '..', type: 'dir'});
            }
        }

        if(event.key === 'F2' && !fileViewer) {
            renameBtn();
        }

        if(event.key === 'Delete' && !fileViewer) {
            deleteBtn();
        }
    }, [filelist, selected, fileViewer, renaming, fileOpen, rename, renameBtn, deleteBtn]);

    const upload = async() => {
        let formData = new FormData();
        const file = document.querySelector('#file') as HTMLInputElement;
        if(file.files && file.files[0]) {
            formData.append("file", file.files[0], path + upFilename);
            formData.append("path", path);
            formData.append("code", localStorage.getItem('code') || '0');
        }
    
        const onUploadProgress = (event: any) => {
            const percentage = Math.round((100 * event.loaded) / event.total);
            setPercentage(String(percentage) + '%');
        };

        try {
            await axios.post(`${hostUrl()}/esp/fileUpload`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                }, 
                onUploadProgress
            });
        } catch (err) { }
    }

    useEffect(() => {
        let list: iFilelist = [];
        let flist = data.fs.list.split(',').map(file => {
            return {
                name: file.split(':')[0],
                size: file.split(':')[1]
            }
        })

        flist.forEach(file => {
            let name = file.name.replace(new RegExp(`^${path}`), '');
            if(file.name.includes(path)) {
                if(name.includes('/') && !name.startsWith('/')) {
                    let found = false;
                    list.forEach(fl => {
                        if(fl.name === name.split('/')[0]) found ||= true; 
                    });
                    if(!found) list.push({
                        name: name.split('/')[0],
                        type: 'dir'
                    });
                }
                else list.push({
                    name: name,
                    size: Number(file.size),
                    type: 'file'
                });
            }
            return null;
        });

        setFilelist(list.sort((a, b) => a.type > b.type ? 1 : -1));
    }, [data, path]);

    useEffect(() => {
        window.addEventListener("keydown", handleUserKeyPress);
        return () => {
            window.removeEventListener("keydown", handleUserKeyPress);
        };
    }, [handleUserKeyPress]);

    useEffect(() => {
        filelist.forEach((file: iFile) => {
            if(file.name === selected) setIsDir(file.type === 'dir');
        });
    }, [selected, filelist]);

    useEffect(() => {
        setRenaming('');
    }, [selected]);

    useEffect(() => {
        props.stopDataFetching(fileViewer && selected.endsWith('.json'));
    }, [fileViewer, selected, props]);

    const content = <Card content={<>
        {fileViewer && <ModalFileViewer path={path}
            selected={selected}
            modalClose={() => closeModal()}
        />}

        {/* Upload section */}
        {upFilename}
        <div className="flex flex-col sm:flex-row w-full flex">
            <label htmlFor="file" className="flex flex-col items-center justify-center mt-4 w-full sm:w-1/2 h-16 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                <div className="flex items-center justify-center">
                    <svg className="mx-2 w-8 h-4 sm:h-8 text-gray-500 dark  :text-gray-400" fill="none" viewBox="0 0 20 16">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                    </svg>
                    <p className="mx-1 text-sm text-gray-500 dark:text-gray-400 text-center">
                        <span className="font-semibold">{i18n.t('clickToSelectFile')}</span> {i18n.t('orDragAndDrop')}
                    </p>
                </div>
                <input id="file" 
                    type="file" 
                    name="upload"
                    className="hidden"
                    onChange={e => {setUpFilename(e.currentTarget.files?.item(0)?.name ?? '')}}
                />
            </label>
            <div className="w-full sm:w-1/2 h-16 mt-4 flex justify-center">
                <Button className="w-full bg-cyan-600 hover:bg-cyan-700 text-text_dark"
                    label={i18n.t('upload') + ' ' + percentage}
                    onClick={() => upload()}
                />
            </div>
        </div>

        <hr className="my-8 border-menu_light dark:border-menu_dark" />

        {/* Buttons section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button className="w-full sm:mx-0 bg-blue-600 hover:bg-blue-700 text-text_dark"
                label={i18n.t('open')}
                onClick={() => openBtn()}
            />
            <Button className={"w-full sm:mx-0 text-text_dark " + (isDir ? "bg-gray-400 dark:bg-gray-600 cursor-not-allowed" : "bg-green-600 hover:bg-green-700")}
                label={i18n.t('download')}
                onClick={() => downloadBtn()}
                disabled={isDir}
            />
            <Button className={"w-full sm:mx-0 text-text_dark " + (isDir ? "bg-gray-400 dark:bg-gray-600 cursor-not-allowed" : "bg-yellow-700 hover:bg-yellow-900")}
                label={i18n.t('rename')}
                onClick={() => renameBtn()}
                disabled={isDir}
            />
            <Button className={"w-full sm:mx-0 text-text_dark " + (isDir ? "bg-gray-400 dark:bg-gray-600 cursor-not-allowed" : "bg-orange-600 hover:bg-orange-700")}
                label={i18n.t('delete')}
                onClick={() => deleteBtn()}
                disabled={isDir}
            />
        </div>

        <hr className="my-8 border-menu_light dark:border-menu_dark" />

        <div className="mt-4 border max-w-2xl mx-auto">
            {/* Filesystem info section */}
            <div className="text-end me-1 my-1">
                {i18n.numberToHumanSize(data.fs.free)} {i18n.t('freeOf')} {i18n.numberToHumanSize(data.fs.total)}
            </div>
            <div className="p-1 border border-gray-300 bg-gray-50 dark:bg-gray-700">
                {path}
            </div>

            {/* Files section */}
            <div className="p-1 flex justify-around font-bold bg-menu_light dark:bg-blue-900 text-text_dark">
                <div>{i18n.t('name')}</div>
                <div>{i18n.t('size')}</div>
            </div>

            <div className="select-none">
                <div onClick={() => setSelected('.')}
                    onDoubleClick={() => fileOpen({name: '.', type: 'dir'})}
                    className={style1 + (selected === "." ? style2 : style3)}
                >
                    <div className="mb-1 flex">
                        <div className="w-6 h-6 me-2"><FolderSVG /></div>.
                    </div>
                    <div></div>
                </div>
                <div onClick={() => setSelected('..')}
                    onDoubleClick={() => fileOpen({name: '..', type: 'dir'})}
                    className={style1 + (selected === ".." ? style2 : style3)}
                >
                    <div className="my-1 flex">
                        <div className="w-6 h-6 me-2"><FolderSVG /></div>..
                    </div>
                    <div></div>
                </div>
                {filelist.map(file => <div key={file.name} 
                    className={style1 + (selected === file.name ? style2 : style3)}
                    onClick={() => setSelected(file.name)}
                    onDoubleClick={() => fileOpen(file)}
                >
                    <a id={path + file.name} 
                        href={`${path}${file.name}?code=${localStorage.getItem('code') || '0'}`} 
                        download 
                        className="hidden"
                    >
                        {file.name}
                    </a>
                    
                    <div className="my-1 flex">
                        <div className="w-6 h-6 me-2">
                            {file.type === 'dir' 
                                ? <FolderSVG />
                                : file.name.split('.')[1] === 'html' 
                                ? <HtmlSVG />
                                : file.name.split('.')[1] === 'json' 
                                ? <JsonSVG />
                                : (file.name.split('.')[1] === 'png' || file.name.split('.')[1] === 'jpg') 
                                ? <ImageSVG />
                                : <RubickSVG />
                            }
                        </div>
                        {renaming === file.name 
                            ? <input className="w-full" 
                                value={newName} 
                                type="text" 
                                maxLength={30}
                                onChange={val => setNewName(val.target.value)} 
                                autoFocus 
                            />
                            : file.name
                        }
                    </div>
                    <div>{renaming !== file.name 
                        ? file.size ? i18n.numberToHumanSize(file.size) : ''
                        : <div className="flex">
                            <div className="w-6" onClick={() => rename()}>
                                <CheckCircle size={28} weight="fill" color="#0D0" />
                            </div>
                            <div className="w-6 ms-1" onClick={() => setRenaming('')}>
                                <XCircle size={28} weight="fill" color="#F00" />
                            </div>
                        </div>
                    }</div>
                </div>)}
            </div>
        </div>
    </>} />

    return <OneColumn header={[i18n.t('fileSystem')]} 
        content={[content]} 
        navbar={true} 
        full={true}
        buttons={['reset']} 
    />
}