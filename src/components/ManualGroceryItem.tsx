import { useContext } from "react";
import { BackdropContext } from "../index";

const ManualGroceryItem = () => {
    const { setBackdrop } = useContext(BackdropContext) as { backdrop: boolean; setBackdrop: React.Dispatch<React.SetStateAction<boolean>>; }
    setBackdrop(true);
    return <></>;
}

export default ManualGroceryItem;