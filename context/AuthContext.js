import {AsyncStorage} from 'react-native';
import createDataContext from './createDataContext';
import avvnee from '../Api/avvnee';
const authReducer = (state, action) => {

    switch(action.type) {
        case 'add_error':
            return {...state, errorMessage: action.payload};
            case 'signup':
                return {errorMessage:'', token: action.payload};
            case 'autologin':
                return {errorMessage:'', token: action.payload};
                case 'signout':
                    return {errorMessage:'', token:null};


        default:
            return state;
    }
};


// const auth = React.useMemo( ()=>{
//     login:   await avvnee.post('/login',{email,password});
//     await AsyncStorage.setItem('token',login.data.token);
//         dispatch(createAction('SET_USER', user));
//       }}
// );
    const signup =  (dispatch) => async ({ name,email,password,passwordConfirm,role}) =>{

        try{

            const response = await avvnee.post('/signup',{name,email,password,passwordConfirm,role});
            await AsyncStorage.setItem('token',response.data.token);
            dispatch({type: 'signup',payload: response.data.token});
            console.log(response.data.token);
        } catch(err){
            dispatch({type:'add_error',payload:'something went wrong with the signup'})

        console.log(err.message);       
        }
    
      
    };


const signin = dispatch => async ({email,password}) =>{
        try{

            const response = await avvnee.post('/login',{email,password});
            await AsyncStorage.setItem('token',response.data.token);
            dispatch({type: 'signup',payload: response.data.token});
             console.log(response.data.token);
            
                 } catch(err){
        console.log(err.message);       
        }


    
};

const autologin = dispatch => async () => {
    const token =  await AsyncStorage.getItem('token');
    if (token) {
        dispatch ({type: 'signup',payload:token});
    }
}


const signout =(dispatch) =>async()=> {
   await AsyncStorage.removeItem('token');

   dispatch({ type:'signout' });
};


export const {Provider, Context} = createDataContext(
    authReducer,{ signup,signin,signout,autologin},
    {token:null, errorMessage:''}
);