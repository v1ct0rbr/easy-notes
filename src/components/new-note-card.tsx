import * as Dialog from "@radix-ui/react-dialog";

import { X, Save, StepBack, Mic } from "lucide-react";
import { FormEvent, useState } from "react";
import { toast } from "sonner"



interface NewNoteCardProps {
  onNoteCreated: (content: string) => void
}

let  speechRecognition: SpeechRecognition | null = null


export function NewNoteCard({ onNoteCreated }: NewNoteCardProps) {
  const [shouldShowOnboarding, setShouldShowOnboarding] = useState(true);
  const [content, setContent] = useState("");
  const [isRecording, setIsRecording] = useState(false);


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
    if (content.trim() === "") {
      return
    }

    onNoteCreated(content);
    setContent('');
    setShouldShowOnboarding(true);
    toast.success("Nota criada com sucesso");
  }

  function handleStartRecording() {
    setIsRecording(true);
    setShouldShowOnboarding(false);
    const isSpeechRecognitionAPIAvailable = 'SpeechRecognition' in window
      || 'webkitSpeechRecognition' in window
    if (!isSpeechRecognitionAPIAvailable) {
      alert('infelizmente o navegador não suporta a API  de gravação')
      setIsRecording(false);
      return
    }
    const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition
    speechRecognition = new SpeechRecognitionAPI();
    speechRecognition.lang = 'pt-BR'
    speechRecognition.continuous = true
    speechRecognition.maxAlternatives = 1
    speechRecognition.interimResults = true
    speechRecognition.onresult = (event) => {
      const transcription = Array.from(event.results).reduce((text, result) => {
        return text.concat(result[0].transcript);
      }, '')
      setContent(transcription);
    }
    speechRecognition.onerror = (event) => {
      alert("Erro detectado: " + event.error)
    }

    speechRecognition.start();

  }

  function handleStopRecording() {
    setIsRecording(false);
    if(speechRecognition != null)
      speechRecognition.stop();
  }

  function handleCancelNote() {
    handleStopRecording();
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
          <Dialog.Content className="overflow-hidden fixed inset-0 md:inset-auto md:-translate-x-1/2 md:-translate-y-1/2 outline-none md:left-1/2 md:top-1/2 md:max-w-[640px] w-full md:h-[60vh] bg-slate-700 md:rounded-md flex flex-col">
            <Dialog.Close className="absolute right-0 top-0 bg-slate-800 p-1.5 text-slate-400 hover:text-slate-100">
              <X className="size-5" />
            </Dialog.Close>
            <form className="flex-1 flex flex-col">
              <div className="flex flex-1 flex-col gap-3 p-5">
                <span>Adicionar nota</span>
                {shouldShowOnboarding ?
                  (
                    <p className="text-sm leading-6 text-slate-400">
                      Comece <button type="button" onClick={handleStartRecording} className="font-medium text-lime-400 hover:underline">gravando uma nota em áudio</button> ou se preferir <button onClick={handleStartEditor} className="font-medium text-lime-400 hover:underline">utilize apenas texto</button>
                    </p>
                  ) :
                  (<textarea value={content} autoFocus onChange={handleContentChange} className="text-sm leading-6 text-slate-400 bg-transparent resize-none flex-1 outline-none"></textarea>)
                }
              </div>

              {!shouldShowOnboarding &&
                (
                  <div className="flex flex-row items-center justify-between gap-0 w-full" >
                    {isRecording ?
                      <button type="button" onClick={(e) => { e.preventDefault; handleStopRecording() }} className="flex flex-row items-center justify-center gap-2 w-full bg-slate-900 py-4 text-center text-sm text-slate-300 outline-none font-medium hover:text-slate-100">

                        <Mic className="animate-bounce text-red-600" /><span>Gravando! (Clique para interromper)</span>
                      </button> :
                      <button type="button" onClick={handleSaveNote} className="flex flex-row items-center justify-center gap-2 w-full bg-lime-400 py-4 text-center text-sm text-lime-950 outline-none font-medium hover:bg-lime-500">

                        <Save /><span>Salvar nota</span>
                      </button>
                    }
                    <button type="button" onClick={handleCancelNote} className="flex flex-row items-center justify-center gap-2 w-full bg-slate-800 py-4 text-center text-sm text-lime-400 outline-none font-medium hover:bg-slate-600">
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