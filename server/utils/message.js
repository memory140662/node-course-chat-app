let generateMessage = (from, text) => ({
    from,
    text,
    createAt: new Date().getTime()
});

module.exports = { generateMessage }