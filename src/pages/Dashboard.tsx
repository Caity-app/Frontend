import DashboardCard from "../components/DashboardCard";

const Dashboard = () => {
    return (
    <div className='border-red-500 border flex-grow rounded-2xl grid grid-cols-[1fr_1fr] gap-2'>
        <DashboardCard href='/grocerylist'>Grocery List <br/></DashboardCard>
        <DashboardCard href='/calendar'>Eating in</DashboardCard>
        <DashboardCard href='/calendar'>Dinner suggestions</DashboardCard>
        <DashboardCard href='/calendar'>Upcoming Events</DashboardCard>
    </div>
    )
}

export default Dashboard;