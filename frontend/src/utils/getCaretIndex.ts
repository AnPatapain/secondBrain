const getCaretIndex = (element: any) => {
    let position = 0;

    const selection = window.getSelection();
    if (selection && selection.rangeCount !== 0) {
        const range = selection.getRangeAt(0);
        const preCaretRange = range.cloneRange();
        preCaretRange.selectNodeContents(element);
        preCaretRange.setEnd(range.endContainer, range.endOffset);
        position = preCaretRange.toString().length;
    }

    return position;
}

export default getCaretIndex;