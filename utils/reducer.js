export const reducer = (prevState, action) => {
    switch (action.type) {
      case 'TO_SIGNUP_PAGE':
        return {
          ...prevState,
          isLoading: false,
          isSignedUp: false,
          noAccount: true,
        };
      case 'TO_SIGNIN_PAGE':
        return {
          ...prevState,
          isLoading: false,
          isSignedIn: false,
          noAccount: false,
        };
      case 'RESTORE_TOKEN':
        return {
          ...prevState,
          userToken: action.token,
          teamToken: action.teamToken,
          isSignedIn: true,
          isSignedUp: true,
          isLoading: false,
        };
      case 'SIGNED_UP':
        return {
          ...prevState,
          isSignedIn: true,
          isSignedUp: true,
          isLoading: false,
          userToken: action.token,
          teamToken: action.teamToken,
        };
      case 'SIGN_IN':
        return {
          ...prevState,
          isSignedOut: false,
          isSignedIn: true,
          isSignedUp: true,
          userToken: action.token,
          teamToken: action.teamToken,
        };
      case 'SIGN_OUT':
        return {
          ...prevState,
          isSignedIn: false,
          isSignedUp: false,
          isSignedOut: true,
          userToken: null,
          teamToken: null
        };
    }
  };
  
  export const initialState = {
    isLoading: true,
    isSignedOut: false,
    isSignedUp: false,
    noAccount: false,
    isSignedIn: false,
    userToken: {name:'TEST1', uid:'', email:'', defaultTeam:''},
    teamToken: {teamName: '', team_uid: '', teamDescription: ''}
  };