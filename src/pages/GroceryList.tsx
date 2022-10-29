import GroceryListItem from '../components/GroceryListItem'

const mockGroceries = [
    {
        itemName: 'Apple',
        quantity: 2
    },
    {
        itemName: 'Pear',
        quantity: 4
    },
    {
        itemName: 'Banana',
        quantity: 5
    },
    {
        itemName: 'Orange',
        quantity: 2
    },
    {
        itemName: 'Strawberry',
        quantity: 37
    }
]

const GroceryList = () => {
    return (
        <div className='flex flex-col w-full h-full gap-2'>
            <h1 className='text-center'>Grocery List</h1>
            <div className='w-full overflow-y-scroll rounded-md'>
                {mockGroceries.map((groceryItem) => <GroceryListItem {...groceryItem}/>)}
            </div>
            <div className='flex w-full basis-12 mt-4 rounded-md justify-around'>
                <button className='bg-sky-500 text-white text-center px-4 rounded-full shadow-md'>
                    Scan Product
                </button>
                <button className='bg-sky-500 text-white text-center px-4 rounded-full shadow-md'>
                    Add manually
                </button>

            </div>
        </div>
    )
}

export default GroceryList