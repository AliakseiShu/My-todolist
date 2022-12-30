import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import { AppDispatch, AppRootState } from "../state/store"

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<AppRootState> = useSelector