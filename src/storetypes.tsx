export interface DocInfo {
  name: string;
  uid: string;
}

export interface FaciInfo {
  id: number;
  name: string;
}
export interface FaciId {
  id: number;
}
export interface PatientInfo {
  name: string;
  mid: string;
}

export interface AlertInfo {
  message: string;
  isOpen: boolean;
}

export interface State {
  //ここにstoreが持つstateを書く
  isFirstLogin: boolean;
  isLoggedin: boolean;
  patient_mail: string;
  patient_password: string;
  Doctor_name: string;
  Doctor_id: string;
  Doctor_info: DocInfo[];
  Facility_info: FaciInfo[];
  Alert_info: AlertInfo;
  First_patient: string;
  Facility_id: number;
}

export const initialState: State = {
  //ここにstateの初期値を書く
  isFirstLogin: false,
  isLoggedin: false,
  patient_mail: '',
  patient_password: '',
  Doctor_name: '',
  Doctor_id: '',
  Doctor_info: [
    { uid: 'inada', name: '問診' },
    { uid: 'iwamaru', name: '〇〇' },
    { uid: 'take', name: '〇〇' },
    { uid: 'tomi', name: 'とみ' },
    { uid: 'iin', name: 'いいん' },
    { uid: 'tyou', name: 'ちょう' },
  ],
  Facility_info: [{ id: 0, name: 'aa' }],
  Alert_info: { message: '', isOpen: false },
  First_patient: '',
  Facility_id: -1,
};
