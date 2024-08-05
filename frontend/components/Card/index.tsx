import { ReactNode } from "react";

interface CardProps {
    children: ReactNode;
    className?: string;
}

const Card = ({ children, className = '' }: CardProps) => {
    return (
        <div className={`rounded-card_md border border-solid border-line ${className}`}>
            {children}
        </div>
    )
}

export default Card;