import { useContext, useEffect } from "react";
import { createPortal } from "react-dom";
import { BackdropContext } from "../index";
import { TagIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

const ManualGroceryItem = () => {
  const { setBackdrop } = useContext(BackdropContext) as {
    backdrop: number;
    setBackdrop: React.Dispatch<React.SetStateAction<number>>;
  };
  useEffect(() => {
    setBackdrop(1);
  }, []);

  return (
    createPortal(
      <motion.div
        initial={{
          opacity: 0,
          translateX: "-50%",
          translateY: "calc(- 50% + 100px)",
        }}
        animate={{ opacity: 1, translateY: "-50%" }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="flex flex-col bg-zinc-800 px-6 p-6 shadow-md rounded-xl z-50 top-1/2 left-1/2 fixed m-auto"
      >
        <button
          onClick={() => setBackdrop(0)}
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
            className="bg-transparent w-full h-14 p-2 text-white rounded-r-full outline-none"
          />
        </label>
        <button className="rounded-full bg-sky-500 text-white text-xl px-4 max-w-full shadow-md">
          Add
        </button>
      </motion.div>,
      document.getElementById("root") as HTMLElement,
    )
  );
};

export default ManualGroceryItem;
