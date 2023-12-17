const normalizeHtml = (str: string) => {
    return str && str.replace(/&nbsp;|\u202F|\u00A0/g, ' ').replace(/<br \/>/g, '<br>');
}

export default normalizeHtml;