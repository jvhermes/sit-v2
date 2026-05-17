
type TitleProps = {
    name:string,
    text:string
}
export  function Title({name,text} : TitleProps) {
  return (
    <div className="w-full border-b border-primary/20 bg-primary p-6 text-primary-foreground shadow-sm">
        <h1 className="font-light text-3xl mb-4">{name}</h1>
        <p className="text-primary-foreground/85">{text}</p>
    </div>
  )
}
