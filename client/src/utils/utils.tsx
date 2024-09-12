export const getRemSize = () => {
    return parseFloat(getComputedStyle(document.documentElement).fontSize)
}