import { NEW_GAME, MAKE_GUESS, TOGGLE_INFO_MODAL } from '../actions';

const initialState = {
    showInfoModal: false,
    guesses: [],
    feedback: 'Make Your Guess',
    correctAnswer: Math.floor(Math.random() * 100) + 1
}

export default (state, action) => {
    state = state || initialState;
    if (action.type === NEW_GAME) {
        return Object.assign({}, initialState, {
            correctAnswer: action.correctAnswer
        });
    } else if (action.type === MAKE_GUESS) {
        const guess = parseInt(action.guess, 10);
        if (isNaN(guess)) {
            state = Object.assign({}, state, {
                feedback: 'Please enter valid number'
            });

            return state;
        }

        const difference = Math.abs(guess - state.correctAnswer);

        let feedback;
        if (difference >= 50) {
            feedback = 'You\'re Ice Cold...';
        }
        else if (difference >= 30) {
            feedback = 'You\'re Cold...';
        }
        else if (difference >= 10) {
            feedback = 'You\'re Warm';
        }
        else if (difference >= 1) {
            feedback = 'You\'re Hot!';
        }
        else {
            feedback = 'You got it!';
        }

        state = Object.assign({}, state, {
            feedback,
            guesses: state.guesses.concat(action.guess)
        });
    } else if (action.type === TOGGLE_INFO_MODAL) {
        state = Object.assign({}, state, {
            showInfoModal: !state.showInfoModal
        });
        return state;
    }
    return state;
}