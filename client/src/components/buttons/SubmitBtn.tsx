import { FC } from "react"
import CircularLoading from "../loading/CircularLoading"
// FIX types 
const SubmitBtn: FC<{ tag: string, isLoading: boolean, disable?: boolean }> = ({ tag, isLoading, disable }) => {
  return (
    <button
    disabled={disable}
     type="submit"
     className={`actBtn ${disable ? "disable" : ""}`}>{ isLoading ? <CircularLoading size="small"/> : tag }</button>
  )
}

export default SubmitBtn;