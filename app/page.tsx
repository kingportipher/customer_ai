'use client';
import Image from "next/image";
import { Bot, Loader2, Send, User2 } from "lucide-react";
import { useChat } from "ai/react";

export default function Home() {
  const { messages, input, handleInputChange, handleSubmit, isLoading, stop, reset } = useChat({
    api: '/api/genai', // Ensure this is the correct API route
  });

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-12">
      {/* Header */}
      <h1 className="text-4xl font-bold text-blue-600 mb-8">NexaAi</h1>

      {/* Render the form */}
      <RenderForm input={input} handleInputChange={handleInputChange} handleSubmit={handleSubmit} isLoading={isLoading} stop={stop} />

      {/* Render Messages */}
      <RenderMessages messages={messages} isLoading={isLoading} />

      {/* Restart Button */}
      <button
        onClick={reset}
        className="mt-8 px-4 py-2 bg-red-500 text-white rounded-full shadow-md hover:bg-red-600 transition"
      >
        Restart
      </button>
    </main>
  );
}

// RenderForm component
function RenderForm({ input, handleInputChange, handleSubmit, isLoading, stop }) {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        handleSubmit(event, {
          data: { 
            prompt: input
          }
        });
      }}
      className="w-full flex flex-row gap-2 items-center h-full"
    >
      <input
        type="text"
        placeholder={isLoading ? "Generating ..." : "Ask something ..."}
        value={input}
        disabled={isLoading}
        onChange={handleInputChange}
        className="border-b border-dashed border-blue-500 outline-none w-full px-4 py-2 text-blue-700 text-right focus:placeholder-transparent disabled:bg-transparent"
      />
      <button
        type="submit"
        className="rounded-full shadow-md bg-blue-500 text-white p-2 flex items-center justify-center"
      >
        {isLoading ? (
          <Loader2 onClick={stop} className="p-3 h-10 w-10 stroke-stone-500 animate-spin" />
        ) : (
          <Send className="h-6 w-6" />
        )}
      </button>
    </form>
  );
}

// RenderMessages component
function RenderMessages({ messages, isLoading }) {
  return (
    <div className="w-full mt-4">
      {messages.slice().reverse().map((message, index) => (
        <div key={index} className="flex w-full text-left mt-4 gap-4 whitespace-pre-wrap">
          <div className={`p-4 shadow-md rounded-md ml-10 relative ${message.role === 'user' ? "bg-stone-300" : ""}`}> 
            {message.content} 
            {message.role === 'user' ? (
              <User2 className="absolute top-2 -left-10" />
            ) : (
              <Bot className={`absolute top-2 -right-10 rounded-full p-1 shadow-lg stroke-[#0842A0] ${
                isLoading && index === 0 ? "animate-bounce" : ""
              }`} />
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
