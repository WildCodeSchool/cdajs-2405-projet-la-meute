import H1 from "@/components/_atoms/H1/H1";
import "./DashHeader.scss";
import Button from "@/components/_atoms/Button/Button";

export default function DashHeader({ title }: { title: string }) {
    return (
        <>
            <header className="dashHeader">
                <H1 className="dashHeader__title">{title}</H1>
                <Button type="invite" href={""} />
            </header>
        </>
    );
}