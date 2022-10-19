import { ComponentType } from "react";

interface IconProps {
    className?: string;
}

interface SideBarItemProps {
    Icon: ComponentType<IconProps>;
    children?: React.ReactNode;
    className?: string;
}

const SideBarItem = ({ Icon, children, className } : SideBarItemProps) => {
    return (
        <li className={'flex gap-6 hover:bg-zinc-600 px-4 py-2 transition-color hover:cursor-pointer' + (className == null ? '' : ' ' + className)}>
            <Icon />
            <span className="text-lg">{children}</span>
        </li>
    )
}

export default SideBarItem;