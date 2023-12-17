import React, {useEffect, useRef, useState} from "react";
import ContentEditable, {ContentEditableEvent} from "./ContentEditable";
import getCaretIndex from "../utils/getCaretIndex";
import setCaretToEnd from "../utils/setCaretToEnd";

interface EditableBlockProps {
    id: string;
    html: string;
    tag: string;
    updatePage: (block: { id: string, html: string, tag: string }) => void;
    addBlock: (block: { id: string, ref: any }) => void;
    deleteBlock: (block: { id: string, ref: any }) => void;
    changeBlock: (block: {id: string, ref: any}, event: 'keyUp' | 'keyDown' | 'mouseClick') => void;
}

interface EditableBlockState {
    id: string,
    html: string,
    htmlBackup?: string,
    tag: string,
    previousKey?: string
}

const EditableBlock: React.FC<EditableBlockProps> = (props) => {
    const [blockState, setBlockState] = useState<EditableBlockState>({id: '', html: '', tag: 'p'});
    const blockRef = useRef<any>(null);

    // Initialize state of block.
    useEffect(() => {
        setBlockState({id: props.id, html: props.html, tag: props.tag});
    }, [props.html, props.id, props.tag]);


    const onChangeHandler = (e: ContentEditableEvent) => {
        setBlockState({id: blockState.id, html: e.target.value, tag: blockState.tag});
        props.updatePage({
            id: blockState.id,
            html: e.target.value,
            tag: blockState.tag
        })
    }

    const onKeyDownHandler = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            if (blockState.previousKey !== 'Shift') {
                e.preventDefault();
                props.addBlock({
                    id: blockState.id,
                    ref: blockRef.current
                })
            }
        }
        if (e.key === 'Backspace' && !blockState.html) {
            e.preventDefault();
            props.deleteBlock({
                id: blockState.id,
                ref: blockRef.current
            })
        }
        if (e.key === 'ArrowUp') {
            const blockDom = document.getElementById(blockState.id);
            const caretIndex = getCaretIndex(blockDom);
            if(caretIndex === 0) {
                props.changeBlock({id: blockState.id, ref: blockRef.current}, "keyUp");
            }
        }
        if (e.key === 'ArrowDown') {
            const blockDom = document.getElementById(blockState.id);
            let caretIndex = getCaretIndex(blockDom);
            let htmlPure = blockState.html.replace(/<br>/g, '');
            let elementLen = htmlPure.length;

            if(caretIndex === elementLen) {
                props.changeBlock({id: blockState.id, ref: blockRef.current}, "keyDown");
            }
        }
        setBlockState({...blockState, previousKey: e.key})
    }

    const onClickHandler = (e: React.MouseEvent) => {
        console.log(blockState)
        props.changeBlock({id: blockState.id, ref: blockRef.current}, "mouseClick");
    }

    const getClassName = () => {
        if(blockState.tag === 'p') return "block"
        if(blockState.tag === 'h1') return "text-2xl font-bold my-4"
    }

    return (
        <ContentEditable className={getClassName()}
                         id={props.id}
                         tagName={blockState.tag}
                         html={blockState.html}
                         innerRef={blockRef}

                         onChange={onChangeHandler}
                         onKeyDown={onKeyDownHandler}
                         onClick={onClickHandler}
                         disabled={false}
        />
    )
}

export default EditableBlock;