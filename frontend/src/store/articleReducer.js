import articles from '../data/data.json';

const LOAD_ARTICLES = 'article/loadArticles';
const ADD_ARTICLE = 'article/addArticle';

// ACTION CREATORS
export const loadArticles = (articles) => {
  return {
    type: LOAD_ARTICLES,
    articles
  };
};

export const addArticle = (article) => {
  return {
    type: ADD_ARTICLE,
    article
  };
};

// THUNKS
export const fetchArticles = () => async (dispatch, getState) => {
  const response = await fetch('/api/articles', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json'}
  });

  if (response.ok) {
    const articles= await response.json();
    dispatch(loadArticles(articles))
  }
}

export const writeArticle = (payload) => async (dispatch, getState) => {
  const response = await fetch('/api/articles', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json'},
    body: JSON.stringify(payload)
  })

  if (response.ok) {
    const newArticle = await response.json();
    dispatch(addArticle(newArticle));
    return newArticle
  }
}

// REDUCER STUFF
const initialState = { entries: [], isLoading: true };

const articleReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_ARTICLES:
      return { ...state, entries: [...action.articles] };
    case ADD_ARTICLE:
      return { ...state, entries: [...state.entries, action.article] };
    default:
      return state;
  }
};

export default articleReducer;
