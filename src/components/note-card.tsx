export function NoteCard() {
    return (
        <button className="rounded-md text-left inline-flex flex-initial flex-col bg-slate-800 p-5 space-y-3 overflow-hidden relative outline-none hover:ring-2 hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-lime-400">
            <span className='text-sm font-medium text-slate-300'>Adicionar nota</span>
            <p className='text-sm leading-6 text-slate-400'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                Maecenas a hendrerit libero. Mauris vel pulvinar leo. 
                Cras laoreet nisl a lacus feugiat finibus. Morbi nisl purus, tempor a euismod non, faucibus nec sapien. 
                Nunc rhoncus urna et venenatis pellentesque. 
                Fusce a nisi et est imperdiet viverra eu in diam. 
                Aenean id est vitae justo convallis porta. Quisque volutpat sagittis ex nec mattis.</p>
            <div className='absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/60 to-black/0 pointer-events-none'></div>
        </button>
    )
}