export const gettotal = () => {
    return { type: 'GET_TOTAL_BY_USER' }
  };
  
 export const getnewsonpage = (page, news_on_page) => {
    return {type:'GET_NEWS_ON_PAGE', page: page.page, news_on_page: news_on_page};
  }

export const page_action = (page) => {
    return { type: "PAGE", page: page }
}

export const authorize = (data) => {
  return { type: "AUTORIZE_PAGE", data: data }
}