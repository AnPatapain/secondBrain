import React, {useEffect, useRef} from "react";
import setCaretToEnd from "../utils/setCaretToEnd";


type IntrinsicDiv = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
export type ContentEditableEvent = React.SyntheticEvent<any, Event> & { target: { value: string } };
type Modify<T, R> = Pick<T, Exclude<keyof T, keyof R>> & R;

type DivProps = Modify<IntrinsicDiv, { onChange: ((event: ContentEditableEvent) => void) }>
export interface Props extends DivProps {
    html: string,
    id?:string,
    disabled?: boolean,
    tagName?: string,
    className?: string,
    style?: Object,
    innerRef: React.RefObject<HTMLElement>,
}

const ContentEditable: React.FC<Props> = (props) => {
    let lastHtml: string = props.html;
    const getElement = () => props.innerRef.current;

    const emitChange = (originalEvent: React.SyntheticEvent<any>) => {
        console.log("emit Change");
        const element = getElement();
        if (!element) return;

        const html = element.innerHTML;

        if (html !== lastHtml) {
            const event = Object.assign({}, originalEvent, {
                target: {
                    value: html
                }
            });
            props.onChange(event);
        }
        lastHtml = html;
    }

    useEffect(() => {
        console.log("ContentEditable.useEffect: ");
        const element = getElement();
        if(element && props.html !== element.innerHTML) {
            element.innerHTML = props.html;
        }
        setCaretToEnd(element);
    }, [props.html]);

    return React.createElement(
        props.tagName || 'div',
        {
            ...props,
            id: props.id,
            ref: props.innerRef,
            onInput: emitChange,
            onBlur: props.onBlur || emitChange,
            onKeyUp: props.onKeyUp || emitChange,
            onKeyDown: props.onKeyDown || emitChange,
            contentEditable: !props.disabled,
            dangerouslySetInnerHTML: {__html: props.html},
        },
        props.children
    );
}

export default ContentEditable;