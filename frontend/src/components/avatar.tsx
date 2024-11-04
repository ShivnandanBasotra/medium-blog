export function Avatar ({name}: {name: string}) {
    return (
        <div className="h-10 w-10 rounded-full bg-green-200 flex items-center justify-center text-slate-500 text-xl font-semibold">
         {name[0].toUpperCase()}
        </div>
    )
}