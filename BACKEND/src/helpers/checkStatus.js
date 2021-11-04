const checkStatus = (status) => !status || !['pending', 'progress', 'ready'].includes(status);

module.exports = checkStatus;
