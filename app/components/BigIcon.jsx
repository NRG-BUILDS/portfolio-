import Image from "next/image";

const BigIcon = ({src, name}) => {
    return ( 
        <div className="text-center text-xs opacity-50 hover:opacity-100 hover:scale-110 transition">
            <Image 
                width={60} 
                height={60}
                src={src}
                alt={name}
                className=" mx-auto my-4"/>
            <div className="">
                <span>{name}</span>
            </div>
        </div>
            );
}
 
export default BigIcon;