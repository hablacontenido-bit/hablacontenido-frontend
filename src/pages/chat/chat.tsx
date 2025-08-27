import { ChatInput } from "@/components/custom/chatinput";
import { PreviewMessage, ThinkingMessage } from "../../components/custom/message";
import { useScrollToBottom } from '@/components/custom/use-scroll-to-bottom';
// import { useState, useRef, useEffect } from "react";
import { useState } from "react";
import { message } from "../../interfaces/interfaces";
import { Overview } from "@/components/custom/overview";
import { Header } from "@/components/custom/header";
import { v4 as uuidv4 } from 'uuid';

const getOrCreateUserId = () => {
  const storedId = localStorage.getItem("chat_user_id");
  if (storedId) return storedId;

  const newId = uuidv4();
  localStorage.setItem("chat_user_id", newId);
  return newId;
};

const userId = getOrCreateUserId();

export function Chat() {
  const [messagesContainerRef, messagesEndRef] = useScrollToBottom<HTMLDivElement>();
  const [messages, setMessages] = useState<message[]>([]);
  const [question, setQuestion] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function handleSubmit(text?: string) {
    if (isLoading) return;

    const messageText = text || question;
    setIsLoading(true);
    const traceId = uuidv4();

    setMessages(prev => [...prev, { content: messageText, role: "user", id: traceId }]);
    setQuestion("");
    const hostUrl = import.meta.env.VITE_BACKEND_URL;
    try {
      const response = await fetch(hostUrl + "/chat/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          user_id: userId,
          content: messageText
        })
      });

      if (!response.ok) {
        throw new Error("Error al comunicarse con el backend. Host: " +hostUrl);
      }

      const data = await response.json();

      setMessages(prev => [...prev, {
        content: data.response,
        role: "assistant",
        id: uuidv4()
      }]);
    } catch (error) {
      console.error("Error en fetch:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-col min-w-0 h-dvh bg-background">
      <Header />
      
      {/* Contenedor de mensajes con altura fija */}
      <div className="flex-1 overflow-hidden">
        <div 
          className="flex flex-col min-w-0 gap-6 h-full overflow-y-auto pt-4 pb-4" 
          ref={messagesContainerRef}
        >
          {messages.length === 0 && <Overview />}
          {messages.map((message, index) => (
            <PreviewMessage key={index} message={message} />
          ))}
          {isLoading && <ThinkingMessage />}
          <div ref={messagesEndRef} className="shrink-0 min-w-[24px] min-h-[24px]" />
        </div>
      </div>

      {/* ChatInput fijo en la parte inferior */}
      <div className="sticky bottom-0 flex mx-auto px-4 bg-background pb-4 md:pb-6 gap-2 w-full md:max-w-3xl border-t border-border/10">
        <ChatInput
          question={question}
          setQuestion={setQuestion}
          onSubmit={handleSubmit}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}