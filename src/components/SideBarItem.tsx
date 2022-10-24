import { ComponentType } from "react";
import { Link, useLocation } from "react-router-dom";

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
    const { pathname } = useLocation();

    return (
        <Link to={href} className={'flex items-center gap-6 hover:bg-zinc-700 h-14 px-4 mr-2 hover:mr-0 transition-[background,margin] hover:cursor-pointer rounded-r-full' + (className == null ? '' : ' ' + className) + (href === pathname ? ' mr-0 bg-sky-500 hover:!bg-sky-500 text-white' : '')}>
            <Icon />
            <span className="text-lg">{children}</span>
        </Link>
    )
}

export default SideBarItem;