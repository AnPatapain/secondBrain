function caretIsAtEnd(element: any): boolean {
    const selection = window.getSelection();
    // Check if there is a selection and if the selected node is within the element
    if (selection && selection.rangeCount > 0 && element.contains(selection.focusNode)) {
        const range = selection.getRangeAt(0);
        // Create a range that selects all the content from the caret to the end of the element
        const contentRange = document.createRange();
        contentRange.selectNodeContents(element);
        contentRange.setStart(range.endContainer, range.endOffset);
        // If this range's content is empty, the caret is at the end
        return contentRange.toString() === '';
    }
    return false;
}


export default caretIsAtEnd;
