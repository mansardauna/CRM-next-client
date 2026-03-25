"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageSquare, Send } from "lucide-react";

export default function EditorPage() {
  const [messages, setMessages] = useState([
    { id: 1, from: "Support", text: "Hello! How can I help you today?", time: "10:00 AM" },
    { id: 2, from: "You", text: "I have a question about the billing module.", time: "10:02 AM" },
    { id: 3, from: "Support", text: "Sure! The billing module handles subscriptions, plan upgrades, and invoice generation.", time: "10:03 AM" },
  ]);
  const [input, setInput] = useState("");

  function send() {
    if (!input.trim()) return;
    setMessages((p) => [...p, { id: Date.now(), from: "You", text: input, time: "Now" }]);
    setInput("");
  }

  return (
    <div className="space-y-6">
      <h1 className="crm-page-title">Messaging</h1>
      <div className="crm-card flex flex-col h-[60vh]">
        <div className="flex-1 overflow-y-auto space-y-3 pr-2 mb-4">
          {messages.map((m) => (
            <div key={m.id} className={`flex ${m.from === "You" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-sm px-4 py-2.5 rounded-2xl text-sm ${m.from === "You" ? "bg-primary text-primary-foreground rounded-br-sm" : "bg-muted text-foreground rounded-bl-sm"}`}>
                <p>{m.text}</p>
                <p className={`text-[10px] mt-1 ${m.from === "You" ? "text-primary-foreground/60" : "text-muted-foreground"}`}>{m.time}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex gap-2 border-t border-border pt-4">
          <input
            id="message-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            placeholder="Type a message…"
            className="flex-1 rounded-xl border border-input bg-background px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <Button id="send-message-btn" onClick={send} size="icon" className="h-10 w-10 rounded-xl">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
