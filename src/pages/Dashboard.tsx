import DashboardCard from '../components/DashboardCard';
import { BuildingStorefrontIcon, HomeModernIcon, LightBulbIcon, CalendarDaysIcon } from '@heroicons/react/24/outline';

const Dashboard = () => {
    return (
    <div className='flex-grow rounded-2xl grid grid-cols-[1fr_1fr] gap-4'>
        <DashboardCard className='flex flex-wrap gap-4 text-xl text-center items-center justify-center bg-gray-700 text-white p-4' href='/grocerylist'><BuildingStorefrontIcon className='!w-24'/>Grocery list</DashboardCard>
        <DashboardCard className='flex flex-wrap gap-4 text-xl text-center items-center justify-center bg-gray-700 text-white p-4' href='/calendar'><HomeModernIcon className='!w-24'/>Eating in</DashboardCard>
        <DashboardCard className='flex flex-wrap gap-4 text-xl text-center items-center justify-center bg-gray-700 text-white p-4' href='/calendar'><LightBulbIcon className='!w-24'/>Dinner suggestions</DashboardCard>
        <DashboardCard className='flex flex-wrap gap-4 text-xl text-center items-center justify-center bg-gray-700 text-white p-4' href='/calendar'><CalendarDaysIcon className='!w-24'/>Upcoming events</DashboardCard>
    </div>
    )
}

export default Dashboard;