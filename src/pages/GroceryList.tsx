import { Component, useContext, useEffect, useState } from 'react';
import GroceryListItem from '../components/GroceryListItem';
import ManualGroceryItem from '../components/ManualGroceryItem';
import { GroceryItem } from '../@types/groceryItem';
import { BackdropContext } from '../contexts/BackdropContext';
import { BackdropContextType } from '../@types/backdrop';
import { v4 as uuidv4 } from 'uuid';

const mockGroceries: GroceryItem[] = [
    {
        id: uuidv4(),
        itemName: 'Apple',
        quantity: 2,
        order: 0
    },
    {
        id: uuidv4(),
        itemName: 'Pear',
        quantity: 4,
        order: 1
    },
    {
        id: uuidv4(),
        itemName: 'Banana',
        quantity: 5,
        order: 2
    },
    {
        id: uuidv4(),
        itemName: 'Orange',
        quantity: 2,
        order: 3
    },
    {
        id: uuidv4(),
        itemName: 'Strawberry',
        quantity: 37,
        order: 4
    },
]

const GroceryList = () => {
    const [groceries, setGroceries] = useState<GroceryItem[]>(mockGroceries);
    const [showAddManualGroceryItem, setShowAddManualGroceryItem] = useState<boolean>(false);
    const [showEditManualGroceryItem, setShowEditManualGroceryItem] = useState<boolean>(false);
    const [editGroceryItem, setEditGroceryItem] = useState<GroceryItem | undefined>(undefined);

    const { backdrop } = useContext(BackdropContext) as BackdropContextType;

    useEffect(() => {
        if (!backdrop && showAddManualGroceryItem) {
            setShowAddManualGroceryItem(false);
        }
        if (!backdrop && showEditManualGroceryItem) {
            setShowEditManualGroceryItem(false);
            setEditGroceryItem(undefined);
        }
    }, [backdrop])

    const handleQuantityChange = (item: GroceryItem, quantity: number) => {
        let newGroceries = [...groceries];
        let index = newGroceries.findIndex(grocery => grocery.id === item.id);
        newGroceries[index].quantity = quantity;
        if (quantity < 1) {
            newGroceries.splice(index, 1);
        }
        setGroceries(newGroceries);
    }

    const updateGroceryItems = (groceryItem: GroceryItem) => {
        if (groceryItem.itemName == null || groceryItem.itemName == undefined || groceryItem.itemName.trim() === '') return;
        let existingGroceryItem = groceries.find(item => item.itemName.toLowerCase() === groceryItem.itemName.toLowerCase());
        if (existingGroceryItem) {
            handleQuantityChange(existingGroceryItem, groceryItem.quantity);
            return;
        }

        if (groceryItem.quantity === 0) return;

        setGroceries([...groceries, {
            ...groceryItem,
            id: uuidv4(),
            itemName: groceryItem.itemName,
        }]);
    }

    return (
        <div className='flex flex-col w-full h-full gap-2'>
            {showAddManualGroceryItem && <ManualGroceryItem groceryItemProp={{itemName: '', quantity: 1} as GroceryItem} addGroceryItem={updateGroceryItems} />}
            {showEditManualGroceryItem && <ManualGroceryItem groceryItemProp={editGroceryItem as GroceryItem} addGroceryItem={updateGroceryItems} edit={true} />}
            {groceries.length !== 0 && <ol className='grocerylist shadow-md'>
                {groceries.map((item) => <GroceryListItem key={`${item.id}:${item.quantity}`} onClick={() => {setEditGroceryItem(item); setShowEditManualGroceryItem(true)}} groceryItem={item} handleQuantityChange={handleQuantityChange}/>)}
            </ol>}
            {!groceries.length && <div className='flex flex-col items-center justify-center h-full'>
                <h2>This grocerylist is very empty...</h2>
            </div>}
            <div className='flex w-full basis-12 mt-4 rounded-md justify-around'>
                <button onClick={() => setShowAddManualGroceryItem(true)} className='bg-sky-500 text-white text-center px-4 rounded-full shadow-md'>
                    Scan Product
                </button>
                <button onClick={() => setShowAddManualGroceryItem(true)} className='bg-sky-500 text-white text-center px-4 rounded-full shadow-md'>
                    Add manually
                </button>
            </div>            
        </div>
    )
}

export default GroceryList;