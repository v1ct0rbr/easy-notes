import * as Dialog from "@radix-ui/react-dialog";

import { X } from "lucide-react";
import { FormEvent, useState } from "react";
import { toast } from "sonner" 
import {Save, StepBack} from "lucide-react"

export function NewNoteCard() {
  const [shouldShowOnboarding, setShouldShowOnboarding] = useState(true);
  const [content, setContent] = useState("");
  

  function handleStartEditor() {
   
    setShouldShowOnboarding(false);
  }

  function handleContentChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setContent(e.target.value);
    if (e.target.value.trim() === '')
      setShouldShowOnboarding(true);
  }
  function handleSaveNote(event: FormEvent) {
    event.preventDefault();
    console.log(content);
    toast.success("Nota criada com sucesso");
  }

  function handleCancelNote(){
    setContent("");
    setShouldShowOnboarding(true);
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger className="flex flex-col rounded-md bg-slate-700 p-5 gap-3 text-left overflow-hidden relative hover:ring-2 hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-lime-400 outline-none">
        <span className='text-sm font-medium text-slate-200 '>Adicionar nota</span>
        <p className='text-xs leading-6 text-slate-400  text-ellipsis'>Clique para adicionar uma nota</p>

      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="inset-0 fixed bg-black/50">
          <Dialog.Content className="overflow-hidden fixed -translate-x-1/2 -translate-y-1/2 outline-none left-1/2 top-1/2 max-w-[640px] w-full h-[60vh] bg-slate-700 rounded-md flex flex-col">
            <Dialog.Close className="absolute right-0 top-0 bg-slate-800 p-1.5 text-slate-400 hover:text-slate-100">
              <X className="size-5" />
            </Dialog.Close>
            <form className="flex-1 flex flex-col" onSubmit={handleSaveNote}>
              <div className="flex flex-1 flex-col gap-3 p-5">
                <span>Adicionar nota</span>
                {shouldShowOnboarding ?
                  (
                    <p className="text-sm leading-6 text-slate-400">
                      Comece <button className="font-medium text-lime-400 hover:underline">gravando uma nota em áudio</button> ou se preferir <button onClick={handleStartEditor} className="font-medium text-lime-400 hover:underline">utilize apenas texto</button>


                    </p>
                  ) :
                  (<textarea value={content} autoFocus  onChange={handleContentChange} className="text-sm leading-6 text-slate-400 bg-transparent resize-none flex-1 outline-none"></textarea>)
                }
              </div>

              {!shouldShowOnboarding &&
                (
                  <div className="flex flex-row items-center justify-between gap-0 w-full" >
                    <button type="submit" className="flex flex-row items-center justify-center gap-2 w-full bg-lime-400 py-4 text-center text-sm text-lime-950 outline-none font-medium hover:bg-lime-500">
                      
                      <Save /><span>Salvar nota</span>
                    </button>

                    <button onClick={handleCancelNote} className="flex flex-row items-center justify-center gap-2 w-full bg-slate-800 py-4 text-center text-sm text-lime-400 outline-none font-medium hover:bg-slate-600">
                      
                      <StepBack /><span>Cancelar</span>
                    </button>
                  </div>
                )
              }
            </form>

          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  )
}