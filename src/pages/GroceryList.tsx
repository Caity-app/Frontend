import { useState, useEffect, useContext } from 'react'
import GroceryListItem from '../components/GroceryListItem'
import ManualGroceryItem from '../components/ManualGroceryItem'
import { GroceryItem } from '../@types/groceryItem'
import { BackdropContext } from '../contexts/BackdropContext'
import { BackdropContextType } from '../@types/backdrop'
import { v4 as uuidv4 } from 'uuid'

const mockGroceries: GroceryItem[] = [
    {
        id: uuidv4(),
        itemName: 'Apple',
        quantity: 2
    },
    {
        id: uuidv4(),
        itemName: 'Pear',
        quantity: 4
    },
    {
        id: uuidv4(),
        itemName: 'Banana',
        quantity: 5
    },
    {
        id: uuidv4(),
        itemName: 'Orange',
        quantity: 2
    },
    {
        id: uuidv4(),
        itemName: 'Strawberry',
        quantity: 37
    },
]

const GroceryList = () => {
    let [groceries, setGroceries] = useState(mockGroceries);
    let [addingGrocery, setAddingGrocery] = useState(false);
    let [showAddingGroceryManually, setShowAddingGroceryManually] = useState(false);

    const { backdrop, setBackdrop } = useContext(BackdropContext) as BackdropContextType;

    useEffect(() => {
        if (!backdrop)
        {
            setAddingGrocery(false);
            setShowAddingGroceryManually(false);
        }
    }, [backdrop]);

    const handleQuantityChange = (item: GroceryItem, quantity: number) => {
        let newGroceries = [...groceries];
        let index = newGroceries.findIndex(grocery => grocery.id === item.id);
        newGroceries[index].quantity = quantity;
        if (quantity === 0) {
            newGroceries.splice(index, 1);
        }
        setGroceries(newGroceries);
    }

    const addGroceryItem = (productName: string) => {
        if (productName === '') return;
        
        let groceryItem = groceries.find(item => item.itemName.toLowerCase() === productName.toLowerCase());
        if (groceryItem) {
            handleQuantityChange(groceryItem, groceryItem.quantity + 1);
            return;
        }

        setGroceries([...groceries, {
            id: uuidv4(),
            itemName: productName,
            quantity: 1
        } as GroceryItem]);
    }

    return (
        <div className='flex flex-col w-full h-full gap-2'>
            <h1 className='text-center'>Grocery list</h1>
            {showAddingGroceryManually && <ManualGroceryItem addGroceryItem={addGroceryItem} />}
            <div className='w-full overflow-y-auto rounded-md'>
                {groceries.map((item) => <GroceryListItem key={`${item.id}:${item.quantity}`} groceryItem={item} handleQuantityChange={handleQuantityChange}/>)}
            </div>
            <div className='flex w-full basis-12 mt-4 rounded-md justify-around'>
                <button onClick={() => setAddingGrocery(true)} className='bg-sky-500 text-white text-center px-4 rounded-full shadow-md'>
                    Scan Product
                </button>
                <button onClick={() => setShowAddingGroceryManually(true)} className='bg-sky-500 text-white text-center px-4 rounded-full shadow-md'>
                    Add manually
                </button>
            </div>            
        </div>
    )
}

export default GroceryList
