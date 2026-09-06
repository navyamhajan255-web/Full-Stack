export const ACTIONS = {
  ADD_POST: 'ADD_POST',
  UPDATE_POST: 'UPDATE_POST',
  DELETE_POST: 'DELETE_POST',
  RESCHEDULE_POST: 'RESCHEDULE_POST',
};

export function postReducer(state, action) {
  switch (action.type) {
    case ACTIONS.ADD_POST:
      return [...state, action.payload];

    case ACTIONS.UPDATE_POST:
      return state.map((post) =>
        post.id === action.payload.id
          ? action.payload
          : post
      );

    case ACTIONS.DELETE_POST:
      return state.filter(
        (post) => post.id !== action.payload.id
      );

    case ACTIONS.RESCHEDULE_POST:
      return state.map((post) => {
        if (post.id !== action.payload.id) {
          return post;
        }

        return {
          ...post,
          start: action.payload.start,
          end: action.payload.end,
          preferredStart:
            action.payload.preferredStart ||
            post.preferredStart ||
            post.start,
        };
      });

    default:
      return state;
  }
}