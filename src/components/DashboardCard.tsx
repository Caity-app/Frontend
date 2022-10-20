import {Link} from 'react-router-dom';

interface DashboardCardProps {
    href: string;
    className?: string;
    children?: React.ReactNode;
}

const DashboardCard = ({href, className, children} : DashboardCardProps) => {
    return (
        <Link className={'border-purple-500 border rounded-2xl' + (className === undefined ? '' : ' ' + className)} to={href}>
            {children}
        </Link>
    )
}

export default DashboardCard;