import { create } from 'zustand';

export enum DataType { email = "email", uid = "uid" };

interface UserInfo {
    userState: boolean,
    userData: Map<DataType, string>,
    setUserState: () => void,
    setUserData: (key: DataType, value: string) => void,
    clearData: () => void,
}

export const useDataStore = create<UserInfo>((set) => ({
    userState: false,
    userData: new Map<DataType, string>(),
    dataList: new Array(),
    setUserState: () => {
        set((state) => ({ userState: !state.userState }));
    },
    setUserData: (key, value) => {
        set((state) => ({ userData: state.userData.set(key, value) }));
    },
    clearData: () => {
        set(() => ({ userData: new Map<DataType, string>() }))
    },
}));