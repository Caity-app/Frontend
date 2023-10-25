import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline'
import { GroceryItem } from '../@types/groceryItem'

interface GroceryListItemProps {
    groceryItem: GroceryItem;
    handleQuantityChange: (item: GroceryItem, quantity: number) => void;
    onClick?: () => void;
}

const GroceryListItem = ({groceryItem, handleQuantityChange, onClick} : GroceryListItemProps) => {

  return (
    <li onClick={onClick} className='flex w-full h-16 border-t first:!border-none border-zinc-900'>
        <div className='h-12 aspect-square my-auto mx-2 bg-zinc-100 shadow-md rounded-md'>
            {groceryItem.productPicture ?? <img className='w-6 aspect-square mx-auto translate-y-1/2' src={'/images/defaultProduct.svg'} alt='default product'></img>}
        </div>
        <h2 className='w-12 my-auto'>{groceryItem.itemName}</h2>
        <div className='flex text-white rounded-lg p-2 self-end my-auto ml-auto mr-2'>
            <button className='rounded-full bg-zinc-500 text-zinc-700 w-6 h-6' onClick={() => handleQuantityChange(groceryItem, groceryItem.quantity - 1)}><MinusIcon className='!w-4 mx-auto' strokeWidth={3}/></button>
            <input type='text' pattern='\d*' maxLength={2} defaultValue={groceryItem.quantity} className='w-6 h-6 text-sm bg-transparent text-center mx-1'/>
            <button className='rounded-full bg-sky-500 w-6 h-6' onClick={() => handleQuantityChange(groceryItem, groceryItem.quantity + 1)}><PlusIcon className='!w-4 mx-auto' strokeWidth={3}/></button>
        </div>
        
    </li>
  )
}

export default GroceryListItem