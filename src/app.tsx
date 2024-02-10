import { useState } from 'react'
import logo from './assets/logo-nlw.svg'
import { NewNoteCard } from './components/new-note-card'
import { NoteCard } from './components/note-card'


interface Note {
  id: string
  date: Date
  content: string
}

export function App() {
  const [search, setSearch] = useState("");
  // const [filterArray, setFilterArray] = useState<Note[]>([]);
  const [notes, setNotes] = useState<Note[]>(() => {
    const notesOnStorage = localStorage.getItem('notes')
    if (notesOnStorage) {
      return JSON.parse(notesOnStorage)
    }
    return []
  });

  function handleFilter(event: React.ChangeEvent<HTMLInputElement>) {

    setSearch(event.target.value);

  }
  function handleDeleteNote(id: string){
    let newArray = notes.filter((note) => note.id !== id);
    setNotes(newArray);
    localStorage.setItem('notes', JSON.stringify(newArray));
  }


  function onNoteCreate(content: string) {
    const newNote = {
      id: crypto.randomUUID(),
      date: new Date(),
      content
    }
    const notesArray = [newNote, ...notes];
    setNotes(notesArray);
    localStorage.setItem('notes', JSON.stringify(notesArray));
  }
  let filterArray = search.trim() !== "" ?
    (notes.filter((note) => { return note.content.toLocaleLowerCase().includes(search) }))
    : (notes);

  return (
    <div className="m-auto max-w-6xl my-10 space-y-6 px-5">
      <img src={logo} alt="nlw alternativo" />
      <form className='w-full'>
        <input
          type="text"
          placeholder='Busque em suas notas...'
          value={search} onChange={handleFilter}
          className='w-full bg-transparent text-3xl font-semibold tracking-tight outline-none placeholder:text-slate-500'
        />

      </form>
      <div className='h-px bg-slate-700' />
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-[250px] gap-6'>
        <NewNoteCard onNoteCreated={onNoteCreate} />
        {
          filterArray.length > 0 ?

            filterArray.map((note) => (
              <NoteCard key={note.id} note={note} handleDeleteNote={() => handleDeleteNote(note.id)} />
            ))
            :
            (search.length > 0 && (<h3>Sem resultados</h3>)
            )


        }
      </div>
    </div>
  )
}


