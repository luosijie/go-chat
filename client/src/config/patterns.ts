export default {
    username: {
        value: /^[a-zA-Z][a-zA-Z_-\d]{3,19}$/,
        desc: 'Start with character, only allowed a-z A-Z _ - 0-8',
    },
    email: {
        value: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
        desc: ''
    }
}