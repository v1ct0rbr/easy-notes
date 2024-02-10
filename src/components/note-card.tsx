import { format, formatDistanceToNow } from "date-fns"
import { currentLocale, formatData1 } from "../utils/constantes"
import * as Dialog from "@radix-ui/react-dialog"
import {X} from "lucide-react"

interface NoteCardProps {
    note: {
        data: Date
        content: string
    }
}


export function NoteCard({ note }: NoteCardProps) {
    return (
        // classes teste inline-flex flex-initial flex-col
        <Dialog.Root>
            <Dialog.Trigger className="rounded-md text-left flex flex-col gap-3 bg-slate-800 p-5 overflow-hidden relative outline-none hover:ring-2 hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-lime-400">
                <span className='text-sm font-medium text-slate-300'> {format(note.data, formatData1, { locale: currentLocale })}</span>
                <p className='text-sm leading-6 text-slate-400'>
                    {note.content}</p>
                <div className='absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/60 to-black/0 pointer-events-none'></div>
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay className="inset-0 fixed bg-black/50">
                    <Dialog.Content className="overflow-hidden fixed -translate-x-1/2 -translate-y-1/2 outline-none left-1/2 top-1/2 max-w-[640px] w-full h-[60vh] bg-slate-700 rounded-md flex flex-col">
                        <Dialog.Close className="absolute right-0 top-0 bg-slate-800 p-1.5 text-slate-400 hover:text-slate-100">
                            <X className="size-5" />
                        </Dialog.Close>
                        <div className="flex flex-1 flex-col gap-3 p-5">
                            <span> {formatDistanceToNow(note.data, { locale: currentLocale, addSuffix: true })}</span>
                            <p className="text-sm leading-6 text-slate-400">{note.content}</p>
                        </div>   
                        <button className="w-full bg-slate-800 py-4 text-center text-sm text-slate-300 outline-none font-medium group">
                            Deseja <span className="text-red-400 group-hover:underline">apagar essa nota</span>?
                        </button>
                    </Dialog.Content>
                </Dialog.Overlay>
            </Dialog.Portal>
        </Dialog.Root>
    )
}