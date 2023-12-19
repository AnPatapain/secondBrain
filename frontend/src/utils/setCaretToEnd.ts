const setCaretToEnd = (element: any) => {
    console.log("seCaretToEnd:", element);
    const target = document.createTextNode('');
    element.appendChild(target);
    // do not move caret if element was not focused
    const isTargetFocused = document.activeElement === element;
    if (target !== null && target.nodeValue !== null && isTargetFocused) {
        var sel = window.getSelection();
        if (sel !== null) {
            var range = document.createRange();
            range.setStart(target, target.nodeValue.length);
            range.collapse(true);
            sel.removeAllRanges();
            sel.addRange(range);
        }
        if (element instanceof HTMLElement) element.focus();
    }
};

export default setCaretToEnd;