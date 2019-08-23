export const gettotal = () => {
    return { type: 'GET_TOTAL_BY_USER' }
  };
  
export const getnewsonpage = (data) => {
    return {type:'GET_NEWS_ON_PAGE', data: data};
  }

export const page_action = (page) => {
    return { type: "PAGE", page: page }
}

export const authorize = (data) => {
  return { type: "AUTORIZE_PAGE", data: data }
}

export const logout = () => {
  return { type: "LOG_OUT", data: null }
}

export const sending_news = (data) => {
  return { type: "SENDING_NEW", data: data }
}

export const sendavatar = (data) => {
  return { type: "SENDING_AVATAR", data: data }
}