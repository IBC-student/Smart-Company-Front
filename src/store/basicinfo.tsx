import { State, initialState, DocInfo, AlertInfo, FaciId } from '../storetypes';
//これがなくても動くけど, 形式的に置いておく.
export const setIsLoggedin = () => ({
  type: 'SET_ISLOGGED',
});
export const setIsFirstLogin = () => ({
  type: 'SET_ISFIRST',
});
export const setFaciid = (info: FaciId) => ({
  type: 'SET_FID',
  payload: {
    str: info,
  },
});

export const setPatientID = (text: string) => ({
  type: 'SET_PID',
  payload: {
    str: text,
  },
});
export const setPatientName = (text: string) => ({
  type: 'SET_PNAME',
  payload: {
    str: text,
  },
});
export const setDoctorID = (text: string) => ({
  type: 'SET_DRID',
  payload: {
    str: text,
  },
});
export const setDoctorName = (text: string) => ({
  type: 'SET_DRNAME',
  payload: {
    str: text,
  },
});
export const setDoctorInfo = (info: DocInfo) => ({
  type: 'SET_DRINFO',
  payload: {
    str: info,
  },
});
export const setAlertInfo = (info: AlertInfo) => ({
  type: 'SET_ALERTINFO',
  payload: {
    str: info,
  },
});
export const setFirstPatient = (info: string) => ({
  type: 'SET_FIRSTPATIENT',
  payload: {
    str: info,
  },
});
//ここから先がないとreduxが動かない.
/*type Actions = ReturnType<
  | typeof setIsLoggedin
  | typeof setIsFirstLogin
  | typeof setPatientID
  | typeof setPatientName
  | typeof setDoctorID
  | typeof setDoctorName
>; 
本来はReturnTypeを使ってActionsの型指定を行いたかったが,
ReturnTypeがno un-defにされてしまうため断念*/
type Actions = any;

export const BasicInforeducer = (
  state: State = initialState,
  action: Actions
): State => {
  switch (action.type) {
    case 'SET_ISLOGGED':
      return {
        ...state,
        isLoggedin: true,
      };
    case 'SET_ISNOTLOGGED':
      return {
        ...state,
        isLoggedin: false,
      };
    case 'SET_ISFIRST':
      return {
        ...state,
        isFirstLogin: true,
      };
    case 'SET_ISNOTFIRST':
      return {
        ...state,
        isFirstLogin: false,
      };
    case 'SET_PID':
      return {
        ...state,
        patient_mail: action.payload,
      };
    case 'SET_PNAME':
      return {
        ...state,
        patient_password: action.payload,
      };
    case 'SET_DRID':
      return {
        ...state,
        Doctor_id: action.payload,
      };
    case 'SET_DRNAME':
      return {
        ...state,
        Doctor_name: action.payload,
      };
    case 'SET_DRINFO':
      return {
        ...state,
        Doctor_info: action.payload,
      };
    case 'SET_ALERTINFO':
      return {
        ...state,
        Alert_info: action.payload,
      };
    case 'SET_FID':
      return {
        ...state,
        Facility_id: action.payload,
      };
    case 'SET_FIRSTPATIENT':
      return {
        ...state,
        First_patient: action.payload,
      };
    default:
      return state;
  }
};
