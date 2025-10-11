"use client";
import { useChat } from "@ai-sdk/react";
import { useState } from "react";

export default function EchoChat({ onQueryMade }: { onQueryMade?: () => void }) {
    const [input, setInput] = useState("");
    const { messages, sendMessage } = useChat();
    const [showMarkiplier, setShowMarkiplier] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    
    const handleSendMessage = (messageText: string) => {
        setInput(messageText);
        sendMessage({ text: messageText });
        
        // Show Markiplier's profile for gaming/creator queries
        if (messageText.toLowerCase().includes('gaming') || 
            messageText.toLowerCase().includes('creator') || 
            messageText.toLowerCase().includes('markiplier') ||
            messageText.toLowerCase().includes('30m') ||
            messageText.toLowerCase().includes('subscriber')) {
            
            // Start loading animation
            setIsLoading(true);
            
            // Show Markiplier's profile after a delay
            setTimeout(() => {
                setShowMarkiplier(true);
                setIsLoading(false);
                // Trigger the callback to show the Markiplier section
                if (onQueryMade) {
                    onQueryMade();
                }
            }, 2000); // 2 second loading animation
        }
    };
    
    return (
        <div className="p-6 space-y-4">
            <h2 className="text-2xl font-bold">Adspace Agent <span className="text-sm font-normal text-gray-400">(powered by Echo)</span></h2>
            
            <div className="space-y-2 max-h-96 overflow-y-auto">
                {messages.map((message, index) => (
                    <div key={index} className="p-3 bg-gray-100 rounded">
                        <strong>{message.role}:</strong> {message.content}
                    </div>
                ))}
            </div>
            
            {/* Loading Animation */}
            {isLoading && (
                <div className="mt-4 p-6 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-xl">
                    <div className="flex items-center justify-center space-x-4">
                        <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                            <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                        </div>
                        <div className="text-white font-medium">Finding perfect creators...</div>
                    </div>
                    <div className="mt-3 text-sm text-gray-300 text-center">
                        Analyzing gaming creators with 30M+ subscribers...
                    </div>
                </div>
            )}

            {/* Markiplier Profile - Hidden until query is made */}
            {showMarkiplier && !isLoading && (
                <div className="mt-4 p-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-xl animate-fadeIn">
                    <div className="flex items-center space-x-4">
                        <img 
                            src="https://i.imgur.com/syvnU0h.png" 
                            alt="Markiplier"
                            className="w-16 h-16 rounded-full object-cover"
                        />
                        <div>
                            <h3 className="text-xl font-bold text-white">Markiplier</h3>
                            <p className="text-gray-400">@markiplier • 37.8M subscribers • 5.7K videos</p>
                            <div className="flex items-center space-x-4 mt-2">
                                <span className="text-sm text-green-400">✓ Perfect Match</span>
                                <span className="text-sm text-blue-400">Gaming • Horror • High Energy</span>
                            </div>
                        </div>
                    </div>
                    <div className="mt-3 text-sm text-gray-300">
                        <p>🎮 Gaming content creator with massive following</p>
                        <p>👻 Horror game specialist with high engagement</p>
                        <p>⚡ High-energy personality perfect for brand partnerships</p>
                    </div>
                </div>
            )}
            
            <div className="space-y-3">
                <div className="flex flex-wrap gap-2">
                    <button 
                        onClick={() => handleSendMessage("Filter: Gaming creators")}
                        className="px-3 py-1 text-xs bg-purple-100 text-purple-700 rounded-full hover:bg-purple-200"
                    >
                        Gaming
                    </button>
                    <button 
                        onClick={() => handleSendMessage("Filter: 30M+ subscribers")}
                        className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200"
                    >
                        30M+ Subscribers
                    </button>
                    <button 
                        onClick={() => handleSendMessage("Filter: High engagement creators")}
                        className="px-3 py-1 text-xs bg-green-100 text-green-700 rounded-full hover:bg-green-200"
                    >
                        High Engagement
                    </button>
                    <button 
                        onClick={() => handleSendMessage("Filter: YouTube creators")}
                        className="px-3 py-1 text-xs bg-orange-100 text-orange-700 rounded-full hover:bg-orange-200"
                    >
                        YouTube
                    </button>
                    <button 
                        onClick={() => handleSendMessage("Filter: Available for auction")}
                        className="px-3 py-1 text-xs bg-pink-100 text-pink-700 rounded-full hover:bg-pink-200"
                    >
                        Available Now
                    </button>
                </div>
                
                <div className="flex space-x-2">
                    <input 
                        value={input} 
                        onChange={(e) => setInput(e.currentTarget.value)}
                        placeholder="Ask me to find creators, analyze audiences, or recommend ad strategies..."
                        className="flex-1 px-3 py-2 border border-gray-300 rounded"
                    />
                    <button 
                        type="submit" 
                        onClick={() => handleSendMessage(input)}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
}
