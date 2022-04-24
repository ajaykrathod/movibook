export const initialState = {
    user: null,
    userCreated: false,
    preferenceSelected: false,
    movie: {
        id: 58574
    },
    selfLink: null,
    authors: null
}

const reducer = (state,action) => {
    switch (action.type) {
        case 'user':
            return {
                ...state,
                user: action.user
            }
            break;
        case 'userCreated':
            return {
                 ...state,
                 userCreated: action.userCreated
            }
            break;
        case 'preference':
            return {
                 ...state,
                 preferenceSelected: action.preferenceSelected
            }
            break;
        case 'movie':
            return {
                    ...state,
                    movie: action.movie
            }
            break;
        case 'selfLink':
            return {
                    ...state,
                    selfLink: action.selfLink
            }
            break;
        default:
            break;
    }
}

export default reducer;