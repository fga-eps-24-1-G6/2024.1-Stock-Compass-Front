import { BriefcaseBusiness, Calendar, Check, DollarSign, Newspaper, CircleHelp } from "lucide-react";


export type badgeVariant = 'check' | 'note' | 'calendar' | 'money' | 'business' | 'question';

const variants = {
    'check': {
        bgColor: 'bg-teal-600',
        icon: <Check className="w-4 h-4 text-teal-400" />
    },
    'note': {
        bgColor: 'bg-rose-600',
        icon: <Newspaper className="w-4 h-4 text-rose-400" />
    },
    'calendar': {
        bgColor: 'bg-cyan-600',
        icon: <Calendar className="w-4 h-4 text-cyan-400" />
    },
    'money': {
        bgColor: 'bg-green-600',
        icon: <DollarSign className="w-4 h-4 text-green-500" />
    },
    'business': {
        bgColor: 'bg-fuchsia-600',
        icon: <BriefcaseBusiness className="w-4 h-4 text-fuchsia-400" />
    },
    'question': {
        bgColor: null,
        icon: <CircleHelp className="w-4 h-4 text-muted-foreground" />
    }
}

export function IconBadge({ variant }: { variant: badgeVariant }) {
    return (
        <div className={`flex justify-center items-center w-8 h-8 rounded-full ${variants[variant].bgColor} bg-opacity-30`}>
            {variants[variant].icon}
        </div>
    )
}