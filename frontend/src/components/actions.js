export const gettotal = () => ({ type: 'GET_TOTAL_BY_USER' });

export const getnewsonpage = param => ({ data: param, type: 'GET_NEWS_ON_PAGE' });

export const pageaction = param => ({ data: param, type: 'PAGE' });

export const authorize = param => ({ data: param, type: 'AUTORIZE_PAGE' });

export const logout = () => ({ data: null, type: 'LOG_OUT' });

export const sendingnews = param => ({ data: param, type: 'SENDING_NEW' });

export const sendavatar = param => ({ data: param, type: 'SENDING_AVATAR' });

export const registrateaction = param => ({ data: param, type: 'REGISTRATE_PAGE' });

export const author = param => ({ data: param, type: 'GET_AUTHOR_ON_PAGE' });

export const getAuthorInfo = param => ({ data: param, type: 'GET_AUTHOR_INFO_PAGE' });
