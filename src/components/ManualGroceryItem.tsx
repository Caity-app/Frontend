import { Component, FormEvent, useContext, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { BackdropContext } from "../contexts/BackdropContext";
import { MinusIcon, PlusIcon, TagIcon, TrashIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import { BackdropContextType } from "../@types/backdrop";
import { GroceryItem } from "../@types/groceryItem";

interface ManualGroceryItemProps {
  groceryItemProp: GroceryItem;
  addGroceryItem: (groceryItem: GroceryItem) => void;
  edit?: boolean;
}

const ManualGroceryItem = ({groceryItemProp, addGroceryItem, edit} : ManualGroceryItemProps) => {
    const { setBackdrop } = useContext(BackdropContext) as BackdropContextType;
    
    const [groceryItem, setGroceryItem] = useState<GroceryItem>(groceryItemProp);
    
    useEffect(() => {
        setBackdrop(1);
        console.log(groceryItemProp);
    }, [])
    
    const handleQuantityChange = (quantity: number | string) => {
        quantity = parseInt(quantity as string);
        if (isNaN(quantity)) return;
        if (quantity < 0) return;
        setGroceryItem({
            ...groceryItem,
            quantity: quantity,
        });
    }
    
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        e.stopPropagation();
        addGroceryItem(groceryItem);
        setBackdrop(0);
    }

    return (
        createPortal(
            <motion.form
                initial={{
                opacity: 0,
                translateX: "-50%",
                translateY: "calc(- 50% + 100px)",
                }}
                animate={{ opacity: 1, translateY: "-50%" }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                onSubmit={handleSubmit}
                className="flex flex-col items-center bg-zinc-800 px-6 p-6 shadow-md rounded-xl z-50 top-1/2 left-1/2 fixed m-auto"
            >
                <button
                    onClick={() => setBackdrop(0)}
                    type="button"
                    className="max-w-full absolute right-2 top-2"
                >
                    <XMarkIcon className="text-zinc-300 !w-5" />
                </button>
                <label className="flex pl-6 w-64 shadow-lg rounded-full bg-zinc-700 focus-within:bg-zinc-600">
                    <TagIcon className="text-zinc-300 !w-8" />
                    <input
                        type="text"
                        placeholder="Product name"
                        name="itemName"
                        value={groceryItem.itemName}
                        onChange={(e) => {e.stopPropagation(); setGroceryItem({ ...groceryItem, itemName: e.target.value })}}
                        className="bg-transparent w-full h-14 p-2 text-white rounded-r-full outline-none"
                    />
                </label>
                <div className='flex text-white p-4 my-auto justify-center'>
                    <button
                        type="button"
                        className='rounded-full bg-zinc-500 text-zinc-700 w-6 h-6' 
                        onClick={(e) => {e.preventDefault();handleQuantityChange(groceryItem.quantity-1)}}
                    >
                        <MinusIcon className='!w-4 mx-auto' strokeWidth={3}/>
                    </button>
                    <input 
                        type='number'
                        min={0}
                        pattern='\d*'
                        maxLength={2} 
                        value={groceryItem.quantity}
                        onChange={(e) => handleQuantityChange(e.target.value)}
                        onFocus={(e) => e.target.select()}
                        className='w-6 h-6 text-sm bg-transparent text-center mx-1'/>
                    <button
                        type="button"
                        className='rounded-full bg-sky-500 w-6 h-6' 
                        onClick={(e) => {e.preventDefault();handleQuantityChange(groceryItem.quantity+1)}}
                    >
                        <PlusIcon className='!w-4 mx-auto' strokeWidth={3}/>
                    </button>
                </div>
                <button
                    onClick={handleSubmit}
                    type="submit"
                    className="rounded-full bg-sky-500 text-white text-xl px-4 w-1/2 shadow-md"
                >
                    Add
                </button>
                {edit && <button onClick={() => handleQuantityChange(0)} className="rounded-full absolute bottom-6 right-6 flex justify-center items-center text-sky-500 w-8 h-8">
                            <TrashIcon className="!w-6" strokeWidth={3}/>
                        </button>}
            
                 
            </motion.form>,
            document.getElementById("root") as HTMLElement,
        )
      );
}


// class ManualGroceryItem extends Component<ManualGroceryItemProps, ManualGroceryItemState> {
//   static contextType = BackdropContext;
//   constructor(props: ManualGroceryItemProps) {
//     super(props);

//     this.state = {
//       groceryItem: props.groceryItem,
//     }
//   }
//   componentDidMount(): void {
//     const { setBackdrop } = this.context as BackdropContextType;
//     setBackdrop(1);
//   }

//   handleChange = (groceryItem: GroceryItem) => {
//     this.setState({
//       groceryItem: groceryItem,
//     });
//   }

//   handleQuantityChange = (quantity: number) => {
//     if (quantity < 0) return;
//     this.setState({
//       groceryItem: {
//         ...this.state.groceryItem,
//         quantity: quantity,
//       }
//     });
//   }

//   handleSubmit = (e: FormEvent) => {
//     e.preventDefault();
//     const { setBackdrop } = this.context as BackdropContextType;
//     this.props.addGroceryItem(this.state.groceryItem.itemName)
//     setBackdrop(0);
//   }

//   render() {
//     const { setBackdrop } = this.context as BackdropContextType;

    
//   }
  
// }
export default ManualGroceryItem;
