import { Textarea } from "../ui/textarea";
import { cx } from 'classix';
import { Button } from "../ui/button";
import { ArrowUpIcon } from "./icons"
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { useState } from 'react';

interface ChatInputProps {
    question: string;
    setQuestion: (question: string) => void;
    onSubmit: (text?: string) => void;
    isLoading: boolean;
}

const suggestedActions = [
  {
    title: 'Quiero entender mejor',
    label: 'cómo funciona el área de Contenidos',
    action: 'Quiero entender mejor cómo funciona el área de Contenidos',
  },
  {
    title: 'Quiero saber',
    label: 'quiénes hacen parte del equipo de Contenidos',
    action: 'Quiero saber quiénes hacen parte del equipo de Contenidos',
  }
];

export const ChatInput = ({ question, setQuestion, onSubmit, isLoading }: ChatInputProps) => {
    const [showSuggestions, setShowSuggestions] = useState(true);

    return (
        <div className="relative w-full flex flex-col gap-4">
            {showSuggestions && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full px-2 sm:px-0">
                    {suggestedActions.map((suggestedAction, index) => (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            transition={{ delay: 0.05 * index }}
                            key={index}
                            className="block"
                        >
                            <Button
                                variant="ghost"
                                onClick={() => {
                                    const text = suggestedAction.action;
                                    onSubmit(text);
                                    setShowSuggestions(false);
                                }}
                                className="text-left border rounded-xl px-3 py-3 sm:px-4 sm:py-3.5 text-xs sm:text-sm flex-1 gap-1 flex-col w-full h-auto justify-start items-start min-h-[60px] sm:min-h-[auto]"
                            >
                                <span className="font-medium text-left w-full leading-tight">
                                    {suggestedAction.title}
                                </span>
                                <span className="text-muted-foreground text-left w-full leading-tight">
                                    {suggestedAction.label}
                                </span>
                            </Button>
                        </motion.div>
                    ))}
                </div>
            )}
            <input
                type="file"
                className="fixed -top-4 -left-4 size-0.5 opacity-0 pointer-events-none"
                multiple
                tabIndex={-1}
            />

            <Textarea
                placeholder="Envía un mensaje..."
                className={cx(
                    'min-h-[24px] max-h-[calc(75dvh)] overflow-hidden resize-none rounded-xl text-base bg-muted',
                )}
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                onKeyDown={(event) => {
                    if (event.key === 'Enter' && !event.shiftKey) {
                        event.preventDefault();

                        if (isLoading) {
                            toast.error('Please wait for the model to finish its response!');
                        } else {
                            setShowSuggestions(false);
                            onSubmit();
                        }
                    }
                }}
                rows={3}
                autoFocus
            />

            <Button
                className="rounded-full p-2 h-fit absolute bottom-2 right-2 m-1 bg-indigo-700 text-white hover:bg-purple-800 transition shadow-md disabled:opacity-50"
                onClick={() => onSubmit(question)}
                disabled={question.length === 0}
            >
                <ArrowUpIcon size={16} />
            </Button>

        </div>
    );
}