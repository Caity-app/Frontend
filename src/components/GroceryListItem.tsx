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
        <div className='flex w-full my-auto justify-end mr-2'>
            <button onClick={() => handleQuantityChange(groceryItem, groceryItem.quantity - 1)}><MinusIcon strokeWidth={4}/></button>
            <input type='text' pattern='\d*' maxLength={2} defaultValue={groceryItem.quantity} className='w-6 rounded-xl bg-zinc-800 shadow-md text-center mx-2'/>
            <button onClick={() => handleQuantityChange(groceryItem, groceryItem.quantity + 1)}><PlusIcon strokeWidth={4}/></button>
        </div>
    </li>
  )
}

export default GroceryListItem