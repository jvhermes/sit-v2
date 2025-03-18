
type TitleProps = {
    name:string,
    text:string
}
export  function Title({name,text} : TitleProps) {
  return (
    <div className="w-full border bg-white p-6">
        <h1 className="font-extralight text-3xl mb-4 text-gray-600">{name}</h1>
        <p className="text-gray-600">{text}</p>
    </div>
  )
}
