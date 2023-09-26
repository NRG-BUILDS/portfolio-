const HeadTag = ({number, title}) => {
    return ( 
        <div className="w-fit px-4 py-2 my-6 backdrop-brightness-50 border flex items-end gap-2">
            <div>
                <span className="text-light text-sm">{number}.</span>
                
            </div>
            <div>
                <h2 className="text-heading font-bold text-faint leading-none">
                    {title}
                </h2>
            </div>
        </div>
     );
}
 
export default HeadTag;