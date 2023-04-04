import { FaSearch } from "react-icons/fa";
import Input from "./Input";

interface SearchProps {
    label: string;
    id?: string;
    onChange?: (e: any) => void;
    value?: string | number;
    className?: string;
    disabled?: boolean;
    classNameComponent?: string;
    onClick?: () => void;
}

const Search = ({ label, onChange, value, disabled, classNameComponent, onClick }: SearchProps) => {


    return <div className={classNameComponent}>
        <div className={"relative"}>
            <Input divclass={"w-full sm:w-40 lg:w-48 xl:w-72 my-10 sm:my-0"} label={label} onChange={onChange} value={value} disabled={disabled} />
            <FaSearch onClick={onClick} className={"absolute top-2 right-7  text-2xl text-blue-500 hover:text-blue-800"} />

        </div>
    </div>
}

export default Search