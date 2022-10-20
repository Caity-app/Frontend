import { ComponentType } from "react";
import { Link } from "react-router-dom";

interface IconProps {
    className?: string;
}

interface SideBarItemProps {
    Icon: ComponentType<IconProps>;
    href: string;
    children?: React.ReactNode;
    className?: string;
}

const SideBarItem = ({ Icon, href, children, className, } : SideBarItemProps) => {
    return (
        <Link to={href}>
            <li className={'flex gap-6 hover:bg-zinc-600 px-4 py-2 transition-color hover:cursor-pointer' + (className == null ? '' : ' ' + className)}>
                <Icon />
                <span className="text-lg">{children}</span>
            </li>
        </Link>
    )
}

export default SideBarItem;