import { lighten } from "@/helpers/lightenColor";

export default function Tag({ color, children, href }: { color: string, children: string, href: string }) {

    const lighterColor = lighten(color, 80);

    return (
        <a href={href}>
            <span
                className="tag"
                style={{
                    backgroundColor: lighterColor,
                    color: color,
                    minWidth: '15ch',
                    paddingInline: '0.5rem',
                    paddingBlock: '0.1rem',
                    borderRadius: '5px',
                    margin: '0.2rem',
                    display: 'inline-block',
                    fontSize: '0.8rem',
                    fontWeight: 'bold',
                    textAlign: 'center',
                }}
            >
                {children}
            </span>
        </a>
    );
};
