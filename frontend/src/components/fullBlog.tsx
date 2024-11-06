interface FullBlog {
    fullName: string,
    date: string,
    title: string,
    content: string
}

export function FullBlog ({fullName, date, title, content }: FullBlog) {
    return (
        <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg border border-gray-200">
            <header className="mb-4">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">{title}</h1>
                <div className="text-sm text-gray-500 flex items-center">
                    <span className="mr-2 font-medium text-gray-600">{fullName}</span>
                    <span>•</span>
                    <span className="ml-2">{new Date(date).toLocaleDateString()}</span>
                </div>
            </header>

            <div className="border-t border-gray-200 my-4"></div>

            <article className="text-gray-700 leading-relaxed text-lg">
                {content}
            </article>
        </div>
    )
}