import { Component, FormEvent } from "react";
import { createPortal } from "react-dom";
import { BackdropContext } from "../contexts/BackdropContext";
import { TagIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import { BackdropContextType } from "../@types/backdrop";

interface ManualGroceryItemProps {
  addGroceryItem: (groceryItem: string) => void;
}
interface ManualGroceryItemState {
  productName: string;
}

class ManualGroceryItem extends Component<ManualGroceryItemProps, ManualGroceryItemState> {
  static contextType = BackdropContext;
  constructor(props: ManualGroceryItemProps) {
    super(props);

    this.state = {
      productName: "",
    }
  }
  componentDidMount(): void {
    const { setBackdrop } = this.context as BackdropContextType;
    setBackdrop(1);
  }

  handleChange = (e: FormEvent) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const { setBackdrop } = this.context as BackdropContextType;
    this.props.addGroceryItem(this.state.productName)
    setBackdrop(0);
  }

  render() {
    const { setBackdrop } = this.context as BackdropContextType;

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
          onSubmit={this.handleSubmit}
          className="flex flex-col bg-zinc-800 px-6 p-6 shadow-md rounded-xl z-50 top-1/2 left-1/2 fixed m-auto"
        >
            <button
              onClick={() => setBackdrop(0)}
              type="button"
              className="self-end max-w-full absolute right-2 top-2"
            >
              <XMarkIcon className="text-zinc-300 !w-5" />
            </button>
            <label className="flex pl-6 w-64 shadow-lg rounded-full bg-zinc-700 focus-within:bg-zinc-600">
              <TagIcon className="text-zinc-300 !w-8" />
  
              <input
                type="text"
                placeholder="Product name"
                name="productName"
                value={this.state.productName}
                onChange={this.handleChange}
                autoFocus={true}
                className="bg-transparent w-full h-14 p-2 text-white rounded-r-full outline-none"
              />
            </label>
            <button
              onClick={this.handleSubmit}
              type="submit"
              className="rounded-full bg-sky-500 text-white text-xl px-4 max-w-full mt-5 shadow-md"
            >
              Add
            </button> 
        </motion.form>,
        document.getElementById("root") as HTMLElement,
      )
    );
  }
  
}
export default ManualGroceryItem;
