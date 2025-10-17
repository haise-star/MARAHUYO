import React, { useState, useRef, useEffect } from "react";
import { Send, MessageCircle, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

export default function MessagesPage() {
  const [chats] = useState([
    {
      id: 1,
      name: "Jane Doe",
      email: "jane@example.com",
      messages: [
        { from: "user", text: "Hi! I’d like to know more about your service packages." },
        { from: "admin", text: "Sure! Which package are you interested in?" },
      ],
    },
    {
      id: 2,
      name: "John Smith",
      email: "john@example.com",
      messages: [
        { from: "user", text: "Is there an available slot this weekend?" },
        { from: "admin", text: "Yes! Saturday 10 AM is available. Would that work for you?" },
      ],
    },
    {
      id: 3,
      name: "Maria Santos",
      email: "maria@example.com",
      messages: [
        { from: "user", text: "Do you offer group bookings?" },
        { from: "admin", text: "Yes, we can accommodate groups up to 10 people!" },
      ],
    },
  ]);

  const [selectedChat, setSelectedChat] = useState(chats[0]);
  const [newMsg, setNewMsg] = useState("");
  const [showChat, setShowChat] = useState(false); // controls mobile view
  const messagesEndRef = useRef(null);

  const handleSend = () => {
    if (!newMsg.trim()) return;
    const updatedChat = {
      ...selectedChat,
      messages: [...selectedChat.messages, { from: "admin", text: newMsg }],
    };
    setSelectedChat(updatedChat);
    setNewMsg("");
  };

  // Auto-scroll to bottom on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [selectedChat.messages]);

  return (
    <section className="p-4 md:p-8 min-h-screen bg-gradient-to-b from-[#f7f8fa] to-[#eaeef3] text-[#19183b] flex justify-center">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-6xl h-[80vh] bg-white rounded-2xl shadow-xl border border-gray-200 flex flex-col md:flex-row overflow-hidden"
      >
        {/* LEFT PANEL — Chat List */}
        <div
          className={`${
            showChat ? "hidden md:flex" : "flex"
          } flex-col w-full md:w-1/3 bg-[#19183b] text-white transition-all duration-300`}
        >
          <div className="p-5 flex items-center justify-between border-b border-white/10">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <MessageCircle className="text-[#ffb347]" size={22} />
              Messages
            </h2>
          </div>

          <div className="overflow-y-auto flex-1">
            {chats.map((chat) => (
              <div
                key={chat.id}
                onClick={() => {
                  setSelectedChat(chat);
                  setShowChat(true); // hide chat list, show conversation
                }}
                className={`p-4 border-b border-white/10 cursor-pointer transition-all ${
                  selectedChat?.id === chat.id
                    ? "bg-[#ffb347] text-[#19183b]"
                    : "hover:bg-[#22214a]"
                }`}
              >
                <div className="font-semibold">{chat.name}</div>
                <div className="text-sm text-gray-300 truncate">
                  {chat.messages[chat.messages.length - 1].text}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT PANEL — Chat Conversation */}
        <div
          className={`flex flex-col w-full md:w-2/3 transition-all duration-300 ${
            showChat ? "flex" : "hidden md:flex"
          }`}
        >
          {selectedChat ? (
            <>
              {/* Header (shows name in mobile when chat open) */}
              <div className="flex items-center justify-between border-b border-gray-200 p-4 bg-[#f8f9fb] sticky top-0 z-10">
                <div className="flex items-center gap-3">
                  {/* Back button appears on mobile */}
                  <button
                    onClick={() => setShowChat(false)}
                    className="md:hidden p-2 rounded-md hover:bg-gray-200 transition"
                  >
                    <ArrowLeft size={20} />
                  </button>
                  <div>
                    <h3 className="text-lg font-bold">{selectedChat.name}</h3>
                    <p className="text-xs text-gray-500">{selectedChat.email}</p>
                  </div>
                </div>
              </div>

              {/* Messages area */}
              <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 bg-[#fdfdfd]">
                {selectedChat.messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex ${
                      msg.from === "admin" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[75%] p-3 text-sm rounded-2xl shadow-sm ${
                        msg.from === "admin"
                          ? "bg-[#19183b] text-white rounded-br-none"
                          : "bg-gray-200 text-[#19183b] rounded-bl-none"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Input bar — fixed bottom on mobile */}
              <div className="p-3 md:p-4 border-t border-gray-200 bg-white flex items-center gap-3 sticky bottom-0 z-20">
                <input
                  type="text"
                  placeholder="Type a message..."
                  value={newMsg}
                  onChange={(e) => setNewMsg(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm focus:ring-2 focus:ring-[#ffb347] outline-none"
                />
                <button
                  onClick={handleSend}
                  className="bg-gradient-to-r from-[#19183b] to-[#ffb347] text-white p-3 rounded-full hover:scale-105 transition"
                >
                  <Send size={18} />
                </button>
              </div>
            </>
          ) : (
            <div className="flex flex-1 flex-col items-center justify-center text-gray-500">
              <MessageCircle size={50} className="text-[#ffb347] mb-3" />
              <p>Select a chat to start messaging</p>
            </div>
          )}
        </div>
      </motion.div>
    </section>
  );
}
  