export default (state = {image: ''}, action) => {
    switch(action.type) {
        case 'setProfile':
            return {
                ...state,
                image: action.profile.image
            }   
        default:
            return state;
    }
}