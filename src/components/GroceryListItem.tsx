import { MinusIcon, PlusIcon  } from '@heroicons/react/24/outline'
import { GroceryItem } from '../types/GroceryItem'

const quantityOptions: number[] = []

for (let i = 0; i < 100; i++) {
    quantityOptions[i] = i;
}

interface GroceryListItemProps {
    groceryItem: GroceryItem;
    handleQuantityChange: (item: GroceryItem, quantity: number) => void;
}

const GroceryListItem = ({groceryItem, handleQuantityChange} : GroceryListItemProps) => {

  return (
    <li className='flex w-full h-16 mt-4 bg-zinc-700 rounded-xl shadow-md'>
        <div className='h-12 aspect-square my-auto mx-2 shadow-md rounded-md'>{groceryItem.productPicture ?? <img className='w-6 aspect-square mx-auto translate-y-1/2' src={'/images/defaultProduct.svg'} alt='default product'></img>}</div>
        <h2 className='w-12 my-auto'>{groceryItem.itemName}</h2>
        <div className='flex text-white rounded-lg p-2 self-end my-auto ml-auto mr-2'>
            <button className='rounded-full bg-zinc-500 text-zinc-700 w-6 h-6' onClick={() => handleQuantityChange(groceryItem, groceryItem.quantity - 1)}><MinusIcon className='!w-4 mx-auto' strokeWidth={3}/></button>
            {/* <span className='w-[1px] rounded-full shadow-sm bg-zinc-300'></span> */}
            <input type='text' pattern='\d*' maxLength={2} defaultValue={groceryItem.quantity} className='w-6 h-6 text-sm bg-transparent text-center mx-1'/>
            {/* <span className='w-[4px] rounded-full shadow-white shadow-lg bg-zinc-300  '></span> */}
            <button className='rounded-full bg-sky-500 w-6 h-6' onClick={() => handleQuantityChange(groceryItem, groceryItem.quantity + 1)}><PlusIcon className='!w-4 mx-auto' strokeWidth={3}/></button>
        </div>
    </li>
  )
}

export default GroceryListItem