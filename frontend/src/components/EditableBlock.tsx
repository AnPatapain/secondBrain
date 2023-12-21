import React, {useEffect, useRef, useState} from "react";
import getCaretIndex from "../utils/getCaretIndex";
import caretIsAtEnd from "../utils/CaretIsAtEnd";

interface EditableBlockProps {
    id: string;
    initial_html?: string;
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
    const [blockState, setBlockState] = useState<EditableBlockState>({
            id: props.id,
            html: props.initial_html || "",
            tag: props.tag
    });
    const contentRef = useRef<HTMLDivElement>(null);

    /**
     * useEffect that initializes the content in Block by the initial html passed from Page
     */
    useEffect(() => {
        // console.log("EditableBlock.useEffect: set contentRef by props.initial_html", props.initial_html);
        if(props.initial_html && contentRef.current) {
            contentRef.current.innerHTML = props.initial_html;
        }
    }, [props.initial_html])

    /**
     * useEffect that set the state of Block by the props.html of this block passed from blocks state of Page
     */
    useEffect(() => {
        // console.log("EditableBlock.useEffect: set block state by the props.html", props.html);
        setBlockState({id: props.id, html: props.html, tag: props.tag});
    }, [props.html]);

    /**
     * Set the state of Block, update the blocks state of Page for every user's input
     */
    const onInputHandler = () => {
        if(contentRef.current) {
            const newHtml = contentRef.current.innerHTML;
            setBlockState({...blockState, html: newHtml});
            props.updatePage({id: blockState.id, html: newHtml, tag: blockState.tag});
        }
    }

    /**
     * Handle key event for block
     */
    const onKeyDownHandler = (e: React.KeyboardEvent) => {
        if(e.key === 'Enter') {
            if (blockState.previousKey !== 'Shift') {
                e.preventDefault();
                props.addBlock({
                    id: blockState.id,
                    ref: contentRef.current
                })
            }
        }
        if(e.key === 'Backspace' && !blockState.html) {
            e.preventDefault();
            props.deleteBlock({
                id: blockState.id,
                ref: contentRef.current
            })
        }
        if (e.key === 'ArrowUp') {
            const caretIndex = getCaretIndex(contentRef.current);
            if(caretIndex === 0) {
                props.changeBlock({id: blockState.id, ref: contentRef.current}, "keyUp");
            }
        }
        if (e.key === 'ArrowDown') {
            const jumpDown = caretIsAtEnd(contentRef.current);
            if(jumpDown) {
                props.changeBlock({id: blockState.id, ref: contentRef.current}, "keyDown");
            }

        }
        setBlockState({...blockState, previousKey: e.key});
    }

    /**
     * Handle click event
     */
    const onClickHandler = (e: React.MouseEvent) => {
        props.changeBlock({id: blockState.id, ref: contentRef.current}, "mouseClick");
    }

    /**
     * Get the class name based on tag.
     */
    const getClassName = () => {
        if(blockState.tag === 'p') return ""
        if(blockState.tag === 'h1') return "text-2xl font-bold my-4"
    }

    return (
        <div
            className={`${getClassName()} px-0.5`}
            id={blockState.id}
            contentEditable={true}
            onInput = {onInputHandler}
            onKeyDown={onKeyDownHandler}
            onClick={onClickHandler}
            suppressContentEditableWarning={true}
            ref={contentRef}
        />
    )
}

export default EditableBlock;